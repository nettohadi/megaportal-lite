import { gql } from 'graphql-request';

import { Project } from 'types/projects';

export const GET_ALL_PROJECTS_QUERY = gql`
	query GetAllProjects($limit: Int, $offset: Int, $where: projects_bool_exp) {
		projects_aggregate {
			aggregate {
				count
			}
		}
		projects(limit: $limit, offset: $offset, where: $where) {
			id
			name
			description
			createdAt
			dueAt
			active
			requirements {
				id
				description
				title
				created_at
			}
			phase
			phases
			org {
				id
				imageUrl
				name
			}
			type
			ipLimits: ip_limits
			firstName: first_name
			lastName: last_name
			phoneNumber: phone_number
			companyName: company_name
			email
			failing_vulnerabilities_count
			special_notes_count
			last_attested_report {
				name
				created_date
				attested_date
			}
		}
	}
`;

export const FILTER_PROJECTS_QUERY = gql`
	query GetAllProjects($limit: Int, $offset: Int, $where: projects_bool_exp) {
		projects_aggregate(where: $where) {
			aggregate {
				count
			}
		}
		projects(limit: $limit, offset: $offset, where: $where) {
			id
			name
			description
			createdAt
			dueAt
			active
			requirements {
				id
				description
				title
				created_at
			}
			phase
			phases
			org {
				imageUrl
			}
			type
			ipLimits: ip_limits
			firstName: first_name
			lastName: last_name
			phoneNumber: phone_number
			companyName: company_name
			email
		}
	}
`;

export const GET_ALL_PROJECTS_BY_USER_ID_QUERY = gql`
	query GetAllProjects($limit: Int, $offset: Int, $user_id: uuid) {
		projects_aggregate(
			where: { user_id: { _eq: $user_id }, active: { _eq: true } }
		) {
			aggregate {
				count
			}
		}
		projects(
			limit: $limit
			offset: $offset
			where: { user_id: { _eq: $user_id }, active: { _eq: true } }
		) {
			id
			name
			description
			createdAt
			dueAt
			active
			requirements {
				id
				description
				title
				created_at
			}
			# members {
			#   id
			# }
		}
	}
`;

export const GET_PROJECT_QUERY = gql`
	fragment RequirementsRecursive on requirements {
		...RequirementsFields
		children(order_by: { position: asc }) {
			...RequirementsFields
			children(order_by: { position: asc }) {
				...RequirementsFields
				children(order_by: { position: asc }) {
					...RequirementsFields
					children(order_by: { position: asc }) {
						...RequirementsFields
						children(order_by: { position: asc }) {
							...RequirementsFields
							children {
								...RequirementsFields
								children {
									...RequirementsFields
									children {
										...RequirementsFields
									}
								}
							}
						}
					}
				}
			}
		}
	}

	fragment RequirementsFields on requirements {
		id
		description
		title
		parent_path
		parent_id
		position
		status
		project_id
	}

	query GetProject($id: uuid!) {
		project(id: $id) {
			id
			name
			description
			createdAt
			updatedAt
			dueAt
			active
			organization_id
			phase
			phases
			requirements(
				#where: {parent_path: {_eq: "root"}},
				order_by: { position: asc }
			) {
				...RequirementsRecursive
			}
			org {
				name
			}
			type
			# tasks {
			#   id
			#   name
			#   description
			#   createdAt
			#   completed
			#   completedAt
			# }
			# members {
			#   id
			#   firstName
			#   lastName
			#   email
			# }
			ipLimits: ip_limits
			firstName: first_name
			lastName: last_name
			phoneNumber: phone_number
			companyName: company_name
			websiteUrl: website_url
			email
			scannerNode: scanner_node
			scannerNodeName: scanner_node_name
			address
			country
			city
			state
			zip
		}
	}
`;

export const CREATE_PROJECT_MUTATION = gql`
	mutation CreateProject(
		$name: String!
		$description: String!
		$active: Boolean!
		$userId: uuid!
		$organizationId: uuid
		$type: String
		$ipLimits: numeric
		$firstName: String
		$lastName: String
		$phoneNumber: String
		$email: String
		$companyName: String
		$websiteUrl: String
		$scannerNode: String
		$address: String
		$country: String
		$city: String
		$state: String
		$zip: String
	) {
		createProject(
			object: {
				name: $name
				description: $description
				active: $active
				user_id: $userId
				organization_id: $organizationId
				type: $type
				ip_limits: $ipLimits
				first_name: $firstName
				last_name: $lastName
				phone_number: $phoneNumber
				email: $email
				company_name: $companyName
				website_url: $websiteUrl
				scanner_node: $scannerNode
				address: $address
				country: $country
				city: $city
				state: $state
				zip: $zip
			}
		) {
			id
		}
	}
`;

export const UPDATE_PROJECT_MUTATION = gql`
	mutation UpdateProject(
		$id: uuid!
		$name: String!
		$description: String!
		$phase: Int!
		$phases: Int!
		$dueAt: timestamptz!
		$firstName: String
		$lastName: String
		$phoneNumber: String
		$email: String
		$companyName: String
		$ipLimits: numeric
		$websiteUrl: String
		$scannerNode: String
		$address: String
		$country: String
		$city: String
		$state: String
		$zip: String
	) {
		updateProject(
			pk_columns: { id: $id }
			_set: {
				name: $name
				description: $description
				phase: $phase
				phases: $phases
				dueAt: $dueAt
				first_name: $firstName
				last_name: $lastName
				phone_number: $phoneNumber
				email: $email
				company_name: $companyName
				ip_limits: $ipLimits
				website_url: $websiteUrl
				scanner_node: $scannerNode
				address: $address
				country: $country
				city: $city
				state: $state
				zip: $zip
			}
		) {
			id
		}
	}
`;

export const DELETE_PROJECT_MUTATION = gql`
	mutation DeleteProject($id: uuid!) {
		deleteProject(id: $id) {
			id
		}
	}
`;

export const DELETE_ORGANIZATION_PROJECTS_MUTATION = gql`
	mutation DeleteOrganizationProjects($id: uuid!) {
		deleteProjects(where: { organization_id: { _eq: $id } }) {
			affected_rows
		}
	}
`;

export const GET_ALL_PROJECTS_ACTIVE_QUERY = gql`
	query GetAllActiveProjects(
		$limit: Int
		$offset: Int
		$where: projects_bool_exp
	) {
		projects_aggregate(where: $where) {
			aggregate {
				count
			}
		}

		projects(limit: $limit, offset: $offset, where: $where) {
			id
			name
			description
			createdAt
			dueAt
			active
			requirements {
				id
				description
				title
				created_at
			}
			address
			country
			city
			state
			zip
		}
	}
`;

export const GET_ALL_PROJECTS_ARCHIVED_QUERY = gql`
	query GetAllArchivedProjects(
		$limit: Int
		$offset: Int
		$where: projects_bool_exp
	) {
		projects_aggregate(where: $where) {
			aggregate {
				count
			}
		}

		projects(limit: $limit, offset: $offset, where: $where) {
			id
			name
			description
			createdAt
			dueAt
			active
			requirements {
				id
				description
				title
				created_at
			}
			# members {
			#   id
			# }
		}
	}
`;

export const ARCHIVE_PROJECT_MUTATION = gql`
	mutation ArchiveProject($id: uuid!) {
		updateProject(pk_columns: { id: $id }, _set: { active: false }) {
			id
		}
	}
`;

// TODO ProjectSmall fragment type
export type ProjectSmall = Project;

export const PROJECT_SMALL_FRAGMENT = `#graphql
	fragment ProjectSmall on projects {
		id
		name
		description
		createdAt
		dueAt
		active
		requirements {
			id
			description
			title
			created_at
		}
		phase
		phases
		org {
			id
			imageUrl
		}
		type
		ipLimits: ip_limits
		firstName: first_name
		lastName: last_name
		phoneNumber: phone_number
		companyName: company_name
		email
		scannerNode: scanner_node
	}

`;

export const GET_PROJECT_SMALL_BY_ID_QUERY = `#graphql
	${PROJECT_SMALL_FRAGMENT}

	query GetProjectSmallById($id: uuid!) {
		project(id: $id) {
			...ProjectSmall

		}
	}
`;
