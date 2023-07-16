import useSWR from 'swr';


import { GET_LIST_TARGETS_TAGS_QUERY } from 'graphql/targets.graphql';
import { fetchData } from 'libs';
import { Project } from 'types/projects';
import { Target } from 'types/scans';

export const useListTargetsTagsQuery = (projectId: Project['id']) => {
	const { data, ...swr } = useSWR<{ targets: Target[] }>(
		projectId ? [GET_LIST_TARGETS_TAGS_QUERY, { projectId }] : undefined,
		fetchData
	);
	return {
		...swr,
		targets: data?.targets,
		data,
	};
};
