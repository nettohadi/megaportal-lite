import useSWR from 'swr';


import { GET_LIST_TARGETS_QUERY } from 'graphql/targets.graphql';
import { fetchData } from 'libs';
import { Target } from 'types/scans';

export const useListTargetsQuery = () => {
	const { data, ...swr } = useSWR<{ targets: Target[] }>(
		[GET_LIST_TARGETS_QUERY],
		fetchData
	);
	return {
		...swr,
		targets: data?.targets,
		data,
	};
};
