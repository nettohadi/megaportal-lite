import { parseCIDR } from './parseCIDR';

export function getIpRangeSize(input: string): number {
	try {
		const result = parseCIDR(input);
		return result?.length;
	} catch {
		return 0;
	}
}
