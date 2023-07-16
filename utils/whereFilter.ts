import { useMemo } from 'react';

import { ColumnFilter, ColumnFiltersState } from '@tanstack/react-table';

// TODO: type query level
const queryBuilder = (filter: ColumnFilter, queryLevel: string) => {
	if (queryLevel === 'allUsers') {
		if (filter.id === 'lastName') {
			return {
				lastName: {
					_ilike: `%${filter.value}%`,
				},
			};
		}
		if (filter.id === 'email') {
			return {
				email: {
					_ilike: `%${filter.value}%`,
				},
			};
		}
		if (filter.id === 'org_member_0.organization.name') {
			return {
				org_member: {
					organization: {
						name: {
							_eq: filter.value,
						},
					},
				},
			};
		}
		if (filter.id === 'role_name') {
			return {
				role: {
					name: {
						_eq: filter.value,
					},
				},
			};
		}

		return null;
	}
	if (queryLevel === 'adminMembersInUsersOrg') {
		if (filter.id === 'lastName') {
			return {
				user: {
					lastName: {
						_ilike: `%${filter.value}%`,
					},
				},
			};
		}
		if (filter.id === 'email') {
			return {
				user: {
					email: {
						_ilike: `%${filter.value}%`,
					},
				},
			};
		}
		if (filter.id === 'org_member_0.organization.name') {
			return {
				org_member: {
					organization: {
						name: {
							_eq: filter.value,
						},
					},
				},
			};
		}
		if (filter.id === 'role_name') {
			return {
				role: {
					name: {
						_eq: filter.value,
					},
				},
			};
		}

		return null;
	}
	if (queryLevel === 'projectReports') {
		if (filter.id === 'name') {
			return {
				name: {
					_ilike: `%${filter.value}%`,
				},
			};
		}
		if (filter.id === 'created_date') {
			const initialDate = `${filter.value}T00:00:00.000Z`;
			const finalDate = `${filter.value}T23:59:59.999Z`;
			return {
				created_date: {
					_gte: initialDate,
					_lte: finalDate,
				},
			};
		}
		if (filter.id === 'pci_status') {
			return {
				pci_status: {
					_eq: filter.value,
				},
			};
		}
		if (filter.id === 'status') {
			return {
				status: {
					_eq: filter.value,
				},
			};
		}
	}
	if (queryLevel === 'projectSpecialNotes') {
		if (filter.id === 'pci_note') {
			return {
				pci_note: {
					_ilike: `%${filter.value}%`,
				},
			};
		}
		if (filter.id === 'status') {
			return {
				status: {
					_eq: filter.value,
				},
			};
		}
		if (filter.id === 'target_target') {
			return {
				target: {
					target: {
						_eq: filter.value,
					},
				},
			};
		}
	}
	if (queryLevel === 'projectFalsePositives') {
		if (filter.id === 'vulnerability_name') {
			return {
				vulnerability: {
					name: {
						_ilike: `%${filter.value}%`,
					},
				},
			};
		}
		if (filter.id === 'status') {
			return {
				status: {
					_eq: filter.value,
				},
			};
		}
		if (filter.id === 'vulnerability_target.target') {
			return {
				vulnerability: {
					target: {
						target: {
							_eq: filter.value,
						},
					},
				},
			};
		}
		if (filter.id === 'date_reported') {
			const initialDate = `${filter.value}T00:00:00.000Z`;
			const finalDate = `${filter.value}T23:59:59.999Z`;
			return {
				date_reported: {
					_gte: initialDate,
					_lte: finalDate,
				},
			};
		}
		if (filter.id === 'expiration_date') {
			const initialDate = `${filter.value}T00:00:00.000Z`;
			const finalDate = `${filter.value}T23:59:59.999Z`;
			return {
				expiration_date: {
					_gte: initialDate,
					_lte: finalDate,
				},
			};
		}
	}
	if (queryLevel === 'projectVulnerabilities') {
		if (filter.id === 'target_target') {
			return {
				target: {
					target: {
						_ilike: `%${filter.value}%`,
					},
				},
			};
		}
		if (filter.id === 'name') {
			return {
				name: {
					_ilike: `%${filter.value}%`,
				},
			};
		}
		if (filter.id === 'pci_status') {
			return {
				pci_status: {
					_eq: filter.value,
				},
			};
		}
		if (filter.id === 'severity') {
			return {
				severity: {
					_eq: filter.value,
				},
			};
		}
		if (filter.id === 'cvss_score') {
			return {
				cvss_score: {
					_eq: filter.value,
				},
			};
		}
		if (filter.id === 'discovered') {
			const initialDate = `${filter.value}T00:00:00.000Z`;
			const finalDate = `${filter.value}T23:59:59.999Z`;
			return {
				discovered: {
					_gte: initialDate,
					_lte: finalDate,
				},
			};
		}
	}
	if (queryLevel === 'projectTargets') {
		if (filter.id === 'label') {
			return {
				label: {
					_ilike: `%${filter.value}%`,
				},
			};
		}
		if (filter.id === 'target') {
			return {
				target: {
					_ilike: `%${filter.value}%`,
				},
			};
		}
		if (filter.id === 'created_date') {
			const initialDate = `${filter.value}T00:00:00.000Z`;
			const finalDate = `${filter.value}T23:59:59.999Z`;
			return {
				created_date: {
					_gte: initialDate,
					_lte: finalDate,
				},
			};
		}
		if (filter.id === 'pci_status') {
			return {
				pci_status: {
					_eq: filter.value,
				},
			};
		}
	}
	if (queryLevel === 'projectScans') {
		if (filter.id === 'saint_scanrun_id') {
			return {
				saint_scanrun_id: {
					_eq: filter.value,
				},
			};
		}
		if (filter.id === 'scanjob_name') {
			return {
				scanjob: {
					name: {
						_eq: filter.value,
					},
				},
			};
		}
		if (filter.id === 'progress') {
			return {
				progress: {
					_eq: filter.value,
				},
			};
		}
		if (filter.id === 'status') {
			return {
				status: {
					_eq: filter.value,
				},
			};
		}
		if (filter.id === 'pci_status') {
			return {
				pci_status: {
					_eq: filter.value,
				},
			};
		}
		if (filter.id === 'start_datetime') {
			const initialDate = `${filter.value}T00:00:00.000Z`;
			const finalDate = `${filter.value}T23:59:59.999Z`;
			return {
				start_datetime: {
					_gte: initialDate,
					_lte: finalDate,
				},
			};
		}
		if (filter.id === 'end_datetime') {
			const initialDate = `${filter.value}T00:00:00.000Z`;
			const finalDate = `${filter.value}T23:59:59.999Z`;
			return {
				end_datetime: {
					_gte: initialDate,
					_lte: finalDate,
				},
			};
		}
	}
	if (queryLevel === 'projectScansTree') {
		if (filter.id === 'name') {
			return {
				name: {
					_ilike: `%${filter.value}%`,
				},
			};
		}
		if (filter.id === 'status') {
			return {
				status: {
					_eq: filter.value,
				},
			};
		}
		if (filter.id === 'pci_status') {
			return {
				pci_status: {
					_eq: filter.value,
				},
			};
		}
		if (filter.id === 'created_date') {
			const initialDate = `${filter.value}T00:00:00.000Z`;
			const finalDate = `${filter.value}T23:59:59.999Z`;
			return {
				created_date: {
					_gte: initialDate,
					_lte: finalDate,
				},
			};
		}
		if (filter.id === 'schedule_date') {
			const initialDate = `${filter.value}T00:00:00.000Z`;
			const finalDate = `${filter.value}T23:59:59.999Z`;
			return {
				schedule_date: {
					_gte: initialDate,
					_lte: finalDate,
				},
			};
		}
	}
	if (queryLevel === 'allReports') {
		if (filter.id === 'name') {
			return {
				name: {
					_ilike: `%${filter.value}%`,
				},
			};
		}
		if (filter.id === 'created_date') {
			const initialDate = `${filter.value}T00:00:00.000Z`;
			const finalDate = `${filter.value}T23:59:59.999Z`;
			return {
				created_date: {
					_gte: initialDate,
					_lte: finalDate,
				},
			};
		}
		if (filter.id === 'pci_status') {
			return {
				pci_status: {
					_eq: filter.value,
				},
			};
		}
		if (filter.id === 'status') {
			return {
				status: {
					_eq: filter.value,
				},
			};
		}
		if (filter.id === 'project_org.name') {
			return {
				project: {
					org: {
						name: {
							_eq: filter.value,
						},
					},
				},
			};
		}
	}
	if (queryLevel === 'allSpecialNotes') {
		if (filter.id === 'pci_note') {
			return {
				pci_note: {
					_ilike: `%${filter.value}%`,
				},
			};
		}
		if (filter.id === 'status') {
			return {
				status: {
					_eq: filter.value,
				},
			};
		}
		if (filter.id === 'target_target') {
			return {
				target: {
					target: {
						_eq: filter.value,
					},
				},
			};
		}
		if (filter.id === 'target_project.org.name') {
			return {
				target: {
					project: {
						org: {
							name: {
								_eq: filter.value,
							},
						},
					},
				},
			};
		}
	}
	if (queryLevel === 'allFalsePositives') {
		if (filter.id === 'vulnerability_name') {
			return {
				vulnerability: {
					name: {
						_ilike: `%${filter.value}%`,
					},
				},
			};
		}
		if (filter.id === 'status') {
			return {
				status: {
					_eq: filter.value,
				},
			};
		}
		if (filter.id === 'vulnerability_target.target') {
			return {
				vulnerability: {
					target: {
						target: {
							_eq: filter.value,
						},
					},
				},
			};
		}
		if (filter.id === 'date_reported') {
			const initialDate = `${filter.value}T00:00:00.000Z`;
			const finalDate = `${filter.value}T23:59:59.999Z`;
			return {
				date_reported: {
					_gte: initialDate,
					_lte: finalDate,
				},
			};
		}
		if (filter.id === 'expiration_date') {
			const initialDate = `${filter.value}T00:00:00.000Z`;
			const finalDate = `${filter.value}T23:59:59.999Z`;
			return {
				expiration_date: {
					_gte: initialDate,
					_lte: finalDate,
				},
			};
		}
		if (filter.id === 'evidence_description') {
			return {
				evidence_description: {
					_ilike: `%${filter.value}%`,
				},
			};
		}
		if (filter.id === 'vulnerability_target.project.org.name') {
			return {
				vulnerability: {
					target: {
						project: {
							org: {
								name: {
									_eq: filter.value,
								},
							},
						},
					},
				},
			};
		}
	}
	if (queryLevel === 'projects') {
		if (filter.id === 'name') {
			return {
				name: {
					_ilike: `%${filter.value}%`,
				},
			};
		}
		if (filter.id === 'org_name') {
			return {
				org: {
					name: {
						_eq: filter.value,
					},
				},
			};
		}
	}
	if (queryLevel === 'organizations') {
		if (filter.id === 'name') {
			return {
				name: {
					_ilike: `%${filter.value}%`,
				},
			};
		}
		if (filter.id === 'description') {
			return {
				description: {
					_ilike: `%${filter.value}%`,
				},
			};
		}
	}
};

export const buildWhereFilter = (
	columnFilters: ColumnFiltersState,
	queryLevel: string
) =>
	useMemo(() => {
		const whereFilter = {};

		// match the column filter to the query filter
		const queryFiltersArray = columnFilters.map((filter) => {
			return queryBuilder(filter, queryLevel);
		});

		// merge the query filters into a single object
		queryFiltersArray.map((filter) => {
			if (filter) {
				Object.assign(whereFilter, filter);
			}
		});

		return whereFilter;
	}, [columnFilters, queryLevel]);

export const buildWhereFilterCustom = (
	columnFilters: ColumnFiltersState,
	queryLevel: string,
	customFilters: any
) =>
	useMemo(() => {
		const whereFilter = {};

		// match the column filter to the query filter
		const queryFiltersArray = columnFilters.map((filter) => {
			return queryBuilder(filter, queryLevel);
		});

		// merge the query filters into a single object
		queryFiltersArray.map((filter) => {
			if (filter) {
				Object.assign(whereFilter, filter);
			}
		});

		return { ...(whereFilter ?? {}), ...customFilters };
	}, [columnFilters, queryLevel, customFilters]);
