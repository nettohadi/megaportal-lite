import { createContext, useContext } from 'react';

import { ProjectSmall } from 'graphql/projects.graphql';

export interface IProjectContext {
	/**
	 * Is Fetching project's data
	 */
	isFetching?: boolean;

	projectData?: ProjectSmall | null;

	projectExist?: boolean;
}

export const ProjectContext = createContext<IProjectContext>({} as any);

export function useProjectContext() {
	return useContext(ProjectContext);
}
