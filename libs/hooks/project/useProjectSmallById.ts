import useSWR from 'swr';

import {
	GET_PROJECT_SMALL_BY_ID_QUERY,
	ProjectSmall,
} from 'graphql/projects.graphql';
import { fetchData } from 'libs';
import { Project } from 'types/projects';

export function useProjectSmallById(id?: Project['id'] | null) {
	const { data, ...swr } = useSWR<{ project: ProjectSmall | null }>(
		id ? [GET_PROJECT_SMALL_BY_ID_QUERY, { id }] : undefined,
		fetchData
	);

	return {
		...swr,
		project: data?.project,
		data,
	};
}
