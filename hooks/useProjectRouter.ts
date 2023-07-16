import { ParsedUrlQuery } from 'querystring';

import { NextRouter, useRouter } from 'next/router';

export type ProjectNextRouter = Omit<NextRouter, 'query'> & {
	query: {
		/**
		 * Project ID
		 */
		projectId?: string | undefined;
		reportId?: string | undefined;
	} & ParsedUrlQuery;
};

/**
 * The same useRouter hook but typed to help get a projectId
 * Can be used only for routes that are childs of projects/[projectId] route
 * @returns useRouter's return value
 */
export function useProjectRouter(): ProjectNextRouter {
	const router = useRouter();
	const { query, ...restRouter } = router;
	return {
		query: query as ProjectNextRouter['query'],
		...restRouter,
	};
}
