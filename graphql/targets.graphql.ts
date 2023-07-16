import { gql } from 'graphql-request';

import { Project } from 'types/projects';
import { Scan, Target } from 'types/scans';

export type TargetCompactFragment = Target & {
	scan_last: Pick<Scan, 'id' | 'name' | 'project_id' | 'last_scanned'>;
	project: Pick<Project, 'name' | 'type'>;
};
/**
 * @type {TargetCompactFragment}
 */
export const FRAGMENT_TARGET_COMPACT = `#graphql
fragment TargetCompact on targets {
			id
			label
			target
			pci_status
			created_date
			last_scan_date
			last_scan_id
			project {
				name
				type
			}
			scan_last {
				id
				name
				project_id
				last_scanned
			}
	}
`;

export const GET_LIST_TARGETS_QUERY = gql`
	${FRAGMENT_TARGET_COMPACT}
	query GetListTargets {
		targets {
			...TargetCompact
		}
	}
`;

export const GET_LIST_TARGETS_TAGS_QUERY = gql`
	query GetListTargetsTags($projectId: uuid!) {
		targets(distinct_on: label, where: { project_id: { _eq: $projectId } }) {
			id
			label
		}
	}
`;

/**
 * List targets by given project id
 * @var id: uuid!
 * @returns project: { targets: Target[] }
 */
export const GET_LIST_TARGETS_BY_PROJECT_ID = gql`
	${FRAGMENT_TARGET_COMPACT}
	query GetTargetsByProjectId($projectId: uuid!) {
		project(id: $projectId) {
			targets {
				...TargetCompact
			}
		}
	}
`;

export const GET_TARGETS_BY_SCAN_ID_QUERY = gql`
	${FRAGMENT_TARGET_COMPACT}
	query GetTargetsByScanId($scanId: uuid!) {
		targets(where: { scans: { id: { _eq: $scanId } } }) {
			...TargetCompact
		}
	}
`;

export type SearchTargetsWithinProjectVariables = {
	input: string;
	projectId: Project['id'];
};

export type SearchTargetsWithinProjectResponse = {
	targets?: Target[];
};

/**
 * Gets targets within a project
 * @var projectId: uuid!
 */
export const GET_TARGETS_WITHIN_PROJECT = gql`
	${FRAGMENT_TARGET_COMPACT}
	query GetTargetsWithinProject(
		$limit: Int
		$offset: Int
		$where: targets_bool_exp
	) {
		targets_aggregate(where: $where) {
			aggregate {
				count
			}
		}

		targets(limit: $limit, offset: $offset, where: $where) {
			...TargetCompact
		}
	}
`;

/**
 * Searches for targets
 * @var input: String!
 * @var projectId: uuid!
 * @returns targets: Target[]
 */
export const SEARCH_TARGETS_WITHIN_PROJECT = gql`
	${FRAGMENT_TARGET_COMPACT}
	query SearchTargetsWithinProject($input: String!, $projectId: uuid!) {
		targets(
			where: {
				_and: [
					{ project_id: { _eq: $projectId } }
					{
						_or: [{ label: { _ilike: $input } }, { target: { _ilike: $input } }]
					}
				]
			}
		) {
			...TargetCompact
		}
	}
`;

export type CreateTargetInput = Pick<Target, 'project_id' | 'label' | 'target'>;
export type CreateTargetsVariables = {
	input: CreateTargetInput[];
};

export type CreateTargetsResponse = {
	insert_targets: {
		affected_rows: number;
		returning: Pick<Target, 'id' | 'label' | 'target' | 'created_date'>[];
	};
};

export const CREATE_TARGETS_MUTATION = gql`
	${FRAGMENT_TARGET_COMPACT}
	mutation InsertTargets($input: [targets_insert_input!]!) {
		insert_targets(objects: $input) {
			affected_rows
			returning {
				...TargetCompact
			}
		}
	}
`;

export const DELETE_TARGETS_MUTATION = gql`
	${FRAGMENT_TARGET_COMPACT}
	mutation DeleteTargets($ids: [uuid!]!) {
		delete_targets(where: { id: { _in: $ids } }) {
			affected_rows
			returning {
				...TargetCompact
			}
		}
	}
`;

export const DELETE_TARGET_MUTATION = gql`
	mutation DeleteTarget($id: uuid!) {
		delete_targets_by_pk(id: $id) {
			id
		}
	}
`;
