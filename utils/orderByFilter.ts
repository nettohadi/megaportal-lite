import { useMemo } from 'react';

import { SortingState } from '@tanstack/react-table';

export const buildOrderByFilter = (sorting: SortingState) => {
	const filterQuery = useMemo(() => {
		const orderByFilter = {};

		// match the sorting filter to the query filter
		const queryFiltersArray = sorting.map((filter) => {
			if (filter.id === 'lastName') {
				return {
					// TODO: figure out how to pass asc and desc to the query as non string values
					firstName: filter.desc ? 'desc' : 'asc',
				};
			}
			if (filter.id === 'email') {
				return {
					email: filter.desc ? 'desc' : 'asc',
				};
			}
			if (filter.id === 'org_member_0.organization.name') {
				return {
					organization: {
						name: filter.desc ? 'desc' : 'asc',
					},
				};
			}
			if (filter.id === 'role_name') {
				return {
					role: {
						name: filter.desc ? 'desc' : 'asc',
					},
				};
			}

			return null;
		});

		queryFiltersArray.forEach((filter) => {
			if (filter) {
				Object.assign(orderByFilter, filter);
			}
		});

		// check to see if orderByFilter is empty
		if (Object.keys(orderByFilter).length === 0) {
			return undefined;
		}

		return orderByFilter;
	}, [sorting]);

	return filterQuery;
};
