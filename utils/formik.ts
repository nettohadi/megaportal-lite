import axios from 'axios';
import { getIPRange } from 'get-ip-range';
import * as IP from 'ipaddr.js';
import isValidDomain from 'is-valid-domain';

import { isValidExternalIP, isValidInternalIP } from 'libs/targets/validation';

interface ResponseValidationDNS {
	data: {
		isValid: boolean;
	};
}

export function isTargetValidExternalTarget(target: string) {
	if (IP.isValid(target)) {
		const parsedAddress = IP.parse(target);
		console.log('parsedTarget', parsedAddress);
		if (parsedAddress.kind() === 'ipv4') {
			console.log({ target }, { range: parsedAddress.range() });

			if (isValidExternalIP(target)) {
				return undefined;
			}

			return {
				// what's the unicast and what we need to add here?
				target:
					'Given IP address is a loopback or private network address address which is not allowed.',
				// 'Given IP address is a loopback or private network address or unicast address which is not allowed.',
			};
		} else {
			return {
				target:
					'Given IP Address is IPV4 address which is not supported. Please add IPV4 address.',
			};
		}
	} else {
		try {
			const range = getIPRange(target);

			if (
				range?.length &&
				!range.find((address) => !isValidExternalIP(address))
			) {
				return undefined;
			} else {
				return {
					target: 'Given range contains not valid external IP address.',
				};
			}
		} catch {
			// TODO handle error if needed
			console.log('Range is not valid');
		}
	}
	if (isValidDomain(target)) {
		return undefined;
	}

	return { target: 'Given value is not a valid IP address or domain.' };
}

export function isTargetValidInternalTarget(target: string) {
	if (IP.isValid(target)) {
		const parsedAddress = IP.parse(target);
		if (parsedAddress.kind() === 'ipv4') {
			if (isValidInternalIP(target)) {
				return undefined;
			} else {
				return {
					target: 'Only allowed internal IP address.',
				};
			}
		}
	} else {
		try {
			const range = getIPRange(target);

			if (
				range?.length &&
				!range.find((address) => !isValidInternalIP(address))
			) {
				return undefined;
			} else {
				return {
					target: 'Given range contains not valid internal IP address.',
				};
			}
		} catch {
			// TODO handle error if needed
			console.log('Range is not valid');
		}
	}

	return { target: 'Given value is not a valid internal IP address.' };
}

export const isIpRegex = (target: string) => {
	const ipRegex =
		/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
	const ipRangeCase1 = target.split('/');
	const ipRangeCase2 = target.split('-');

	if (ipRangeCase1?.length === 2) {
		const firstRange = ipRangeCase1[0];
		const secondRange = ipRangeCase1[1];
		return (
			ipRegex.test(firstRange) &&
			Number(secondRange) > 0 &&
			Number(secondRange) <= 255
		);
	} else if (ipRangeCase2?.length === 2) {
		const firstRange = ipRangeCase2[0];
		const secondRange = ipRangeCase2[1];
		return ipRegex.test(firstRange) && !ipRegex.test(secondRange);
	} else {
		return ipRegex.test(target);
	}
};

export const validationDNS = async (targetIp: string) => {
	console.log('target = ', targetIp);
	return await axios({
		method: 'POST',
		url: '/api/validate-domain',
		data: {
			domain: targetIp,
		},
	})
		.then((response: ResponseValidationDNS) => {
			return response;
		})
		.catch((err) => err);
};
