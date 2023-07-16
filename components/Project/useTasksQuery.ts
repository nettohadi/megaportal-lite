import useSWR from 'swr';

import { GET_ALL_TASKS_QUERY } from 'graphql/requirements.graphql';
import { fetchData } from 'libs';
import { RequirementsQuery } from 'types/requirements';

export const useTaskQuery = (projectId?: string | string[]) => {
	const { data, ...rest } = useSWR<RequirementsQuery>(
		projectId
			? [
					GET_ALL_TASKS_QUERY,
					{
						id: projectId,
					},
			  ]
			: null,
		fetchData
	);

	return { ...rest, requirements: data?.requirements };
};
