import { getIPRange } from 'get-ip-range';

export function parseCIDR(cidrString: string): string[] {
	try {
		const result = getIPRange(cidrString);
		return result;
	} catch {
		console.log('Invalid CIDR string');
		return [];
	}
}
