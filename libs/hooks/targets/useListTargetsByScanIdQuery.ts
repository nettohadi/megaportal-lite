import useSWR from 'swr';

import {
	GET_TARGETS_BY_SCAN_ID_QUERY,
	TargetCompactFragment,
} from 'graphql/targets.graphql';
import { fetchData } from 'libs';

export function useListTargetsByScanId(scanId?: string) {
	const { data, ...swr } = useSWR<{ targets: TargetCompactFragment[] }>(
		scanId ? [GET_TARGETS_BY_SCAN_ID_QUERY, { scanId }] : undefined,
		fetchData
	);
	return {
		...swr,
		targets: data?.targets,
		data,
	};
}
