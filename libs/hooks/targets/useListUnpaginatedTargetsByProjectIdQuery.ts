import useSWR from 'swr';

import {
	GET_TARGETS_WITHIN_PROJECT,
	TargetCompactFragment,
} from 'graphql/targets.graphql';
import { fetchData } from 'libs';
import { Project } from 'types/projects';

export function useListUnpaginatedTargetsByProjectIdQuery(
	projectId?: Project['id'],
	loadFilters?: boolean,
	targetsWhereFilter?: any
) {
	const { data, ...swr } = useSWR<{
		targets: TargetCompactFragment[];
	}>(
		projectId && loadFilters
			? [
					GET_TARGETS_WITHIN_PROJECT,
					{
						where: {
							project_id: { _eq: projectId },
							...targetsWhereFilter,
						},
					},
			  ]
			: undefined,
		fetchData
	);

	return {
		...swr,
		unpaginatedTargets: data?.targets,
		data,
	};
}
