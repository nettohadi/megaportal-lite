import useSWR from 'swr';

import { GET_PROJECT_QUERY } from 'graphql/projects.graphql';
import { fetchData } from 'libs';
import { ProjectQuery } from 'types/projects';

export const useProjectQuery = (projectId?: string | string[]) => {
	const { data, ...rest } = useSWR<ProjectQuery>(
		projectId
			? [
					GET_PROJECT_QUERY,
					{
						id: projectId,
					},
			  ]
			: null,
		fetchData
	);

	return { ...rest, project: data?.project, data };
};
