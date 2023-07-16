import * as IP from 'ipaddr.js';
import { default as isDomainValid } from 'is-valid-domain';

import { isIpRegex, validationDNS } from 'utils/formik';
import { getIpRangeSize } from 'utils/ip/getIpRangeSize';

export function isValidIpUsingRegex(target: string): boolean {
	return isIpRegex(target);
}

export function isValidIP(target: string): boolean {
	if (IP.isValid(target)) {
		const parsedAddress = IP.parse(target);

		if (parsedAddress.kind() === 'ipv4') {
			return true;
		}
	}

	return false;
}

export function isValidDomain(target: string): boolean {
	return isDomainValid(target);
}

/**
 * Returns 0 if the given target is not a valid range of IP addresses
 * @param target any target
 */
export function getRangeSize(target: string): number {
	return getIpRangeSize(target);
}

export function isRange(target: string): boolean {
	return getRangeSize(target) > 0;
}

export async function isValidDNS(target: string): Promise<boolean> {
	try {
		const response = await validationDNS(target);
		return response?.data?.isValid || false;
	} catch {
		return false;
	}
}

export function isValidExternalIP(target: string): boolean {
	const isValidIP = IP.isValid(target);

	if (!isValidIP) {
		return false;
	}

	const parsedAddress = IP.parse(target);

	if (parsedAddress.kind() !== 'ipv4') {
		return false;
	}

	if (
		parsedAddress.range() === 'loopback' ||
		parsedAddress.range() === 'private' ||
		parsedAddress.range() === 'linkLocal' ||
		parsedAddress.range() === 'carrierGradeNat'
		// parsedAddress.range() === 'unicast'
	) {
		return false;
	}

	return true;
}

export function isValidInternalIP(target: string): boolean {
	const isValidIP = IP.isValid(target);

	if (!isValidIP) {
		return false;
	}

	const parsedAddress = IP.parse(target);

	if (parsedAddress.kind() !== 'ipv4') {
		return false;
	}

	if (
		parsedAddress.range() !== 'private' &&
		parsedAddress.range() !== 'linkLocal'
	) {
		return false;
	}

	return true;
}
