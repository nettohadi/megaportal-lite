import { useMemo } from 'react';

import { useProjectContext } from 'context/project-context';
import { PROJECT_TYPE } from 'libs/constants';

export function useProjectContextHelpers() {
	const { projectData, ...restProjectContext } = useProjectContext();

	const isInternalScansProject = useMemo(() => {
		if (!projectData) {
			return undefined;
		}

		return projectData.type === PROJECT_TYPE.INTERNAL_SCAN;
	}, [projectData]);

	return {
		isInternalScansProject,
		projectData,
		...restProjectContext,
	};
}
