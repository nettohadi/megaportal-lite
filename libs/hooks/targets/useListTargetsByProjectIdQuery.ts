import { useMemo } from 'react';

import dayjs from 'dayjs';
import useSWR from 'swr';

import {
	GET_TARGETS_WITHIN_PROJECT,
	TargetCompactFragment,
} from 'graphql/targets.graphql';
import { fetchData } from 'libs';
import { Project } from 'types/projects';

export type TargetsFilters = {
	limit?: number;
	offset?: number;
	where: any;
};

export function useListTargetsByProjectIdQuery(
	projectId?: Project['id'],
	targetsFilters?: TargetsFilters
) {
	const { data, ...swr } = useSWR<{
		targets: TargetCompactFragment[];
		targets_aggregate?: {
			aggregate?: {
				count?: number;
			};
		};
	}>(
		projectId
			? [
					GET_TARGETS_WITHIN_PROJECT,
					{
						...(targetsFilters ?? {
							where: { project_id: { _eq: projectId } },
						}),
					},
			  ]
			: undefined,
		fetchData
	);
	return {
		...swr,
		targets: data?.targets,
		targetsAggregate: data?.targets_aggregate?.aggregate,
		data,
	};
}
