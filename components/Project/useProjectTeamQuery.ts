import useSWR from 'swr';

import { GET_PROJECT_MEMBERS } from 'graphql/teamMembers.graphql';
import { fetchData } from 'libs';
import { ProjectTeamQuery } from 'types/projects';

export const useProjectTeamQuery = (projectId?: string) => {
	const { data, ...rest } = useSWR<ProjectTeamQuery>(
		projectId
			? [
					GET_PROJECT_MEMBERS,
					{
						project_id: projectId,
					},
			  ]
			: null,
		fetchData
	);
	return { ...rest, teams: data?.teams };
};
