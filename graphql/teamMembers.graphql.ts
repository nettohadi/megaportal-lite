import { gql } from 'graphql-request';

export const GET_ALL_TEAM_MEMBERS_QUERY = gql`
	query GetAllTeamMembers($where: users_bool_exp) {
		users(where: $where) {
			id
			firstName
			lastName
			email
			role {
				name
			}
			org_member {
				organization {
					id
					name
				}
			}
		}
	}
`;

export const GET_TEAM_MEMBERS_EXCLUDE_SPECIFIC_ROLE_QUERY = gql`
	query GetAllTeamMembers(
		$limit: Int
		$offset: Int
		$where: users_bool_exp
		$orderBy: [users_order_by!]
		$orderByMember: [organization_member_order_by!]
	) {
		users_aggregate(where: $where) {
			aggregate {
				count
			}
		}
		users(limit: $limit, offset: $offset, where: $where, order_by: $orderBy) {
			id
			firstName
			lastName
			email
			avatar_url
			role {
				name
			}
			org_member(order_by: $orderByMember) {
				organization {
					id
					name
				}
			}
		}
	}
`;
export const GET_TEAM_MEMBER_BY_ORGANIZATION_ID = gql`
	query GetAllTeamMembers($organization_id: uuid!) {
		users(
			where: {
				org_member: { organization: { id: { _eq: $organization_id } } }
				role: { role_id: { _neq: "super_admin" } }
			}
		) {
			id
			firstName
			lastName
			email
			avatar_url
		}
	}
`;

export const GET_TEAM_MEMBER_QUERY = gql`
	query GetTeamMember($id: uuid!) {
		user(id: $id) {
			id
			firstName
			lastName
			email
			phone
			location
			timezone
			title
			overview
			avatar_url
			role_id
			role {
				id
				role_id
				name
				level
			}
		}
	}
`;

export const GET_TEAM_MEMBER_QUERY_BY_EMAIL = gql`
	query GetTeamMember($email: String!) {
		users(where: { email: { _ilike: $email } }) {
			id
			firstName
			lastName
			email
			phone
			location
			timezone
			title
			overview
			avatar_url
			role_id
			role {
				id
				role_id
				name
				level
				type
				permissions {
					id
					permission_id
					permission {
						id
						module_id
						name
					}
				}
			}
		}
	}
`;

export const GET_ORGANIZATION_ID_MEMBER_QUERY = gql`
	query getOrganizationIdFromUserId($userId: uuid!) {
		organization_member(where: { user_id: { _eq: $userId } }) {
			organization_id
		}
	}
`;

export const CREATE_TEAM_MEMBER_MUTATION = gql`
	mutation CreateTeamMember(
		$firstName: String!
		$lastName: String!
		$email: String!
		$phone: String
		$location: String
		$timezone: String
		$title: String
		$overview: String
		$roleId: String
	) {
		createUser(
			object: {
				firstName: $firstName
				lastName: $lastName
				email: $email
				phone: $phone
				location: $location
				timezone: $timezone
				title: $title
				overview: $overview
				role_id: $roleId
			}
		) {
			id
		}
	}
`;

export const INSERT_USER_TO_ORG_MUTATION = gql`
	mutation InsertOrganizationUser($userId: uuid!, $organizationId: uuid!) {
		insert_organization_member_one(
			object: { user_id: $userId, organization_id: $organizationId }
		) {
			id
		}
	}
`;

export const UPDATE_TEAM_MEMBER_MUTATION = gql`
	mutation UpdateTeamMember(
		$id: uuid!
		$firstName: String!
		$lastName: String!
		$email: String!
		$phone: String
		$location: String
		$timezone: String
		$title: String
		$overview: String
		$roleId: String
		$pendingInvite: Boolean
		$avatar: String
	) {
		updateUser(
			pk_columns: { id: $id }
			_set: {
				firstName: $firstName
				lastName: $lastName
				email: $email
				phone: $phone
				location: $location
				timezone: $timezone
				title: $title
				overview: $overview
				role_id: $roleId
				pendingInvite: $pendingInvite
				avatar_url: $avatar
			}
		) {
			id
			firstName
			lastName
			email
			phone
			location
			timezone
			title
			overview
			avatar_url
		}
	}
`;

export const DELETE_TEAM_MEMBER_MUTATION = gql`
	mutation DeleteTeamMember($id: uuid!) {
		deleteUser(id: $id) {
			id
		}
	}
`;

export const GET_PROJECT_MEMBERS = gql`
	query GetProjectMembers($project_id: uuid!) {
		teams(
			where: {
				project_id: { _eq: $project_id }
				user: { role_id: { _neq: "super_admin" } }
			}
		) {
			updated_at
			id
			user {
				avatar_url
				email
				firstName
				id
				title
				role_id
			}
		}
	}
`;

export const ADD_PROJECT_MEMBERS_MUTATION = gql`
	mutation AddProjectMembers($id: [teams_insert_input!]!) {
		insert_teams(objects: $id) {
			returning {
				id
			}
		}
	}
`;

export const REMOVE_PROJECT_MEMBERS_MUTATION = gql`
	mutation RemoveProjectMember($id: uuid!) {
		delete_teams_by_pk(id: $id) {
			id
		}
	}
`;

export const UPDATE_ROLE_TEAM_MEMBER_MUTATION = gql`
	mutation UpdateRoleTeamMember($id: uuid!, $role_id: String) {
		updateUser(pk_columns: { id: $id }, _set: { role_id: $role_id }) {
			id
			firstName
			lastName
			email
			phone
			location
			timezone
			title
			overview
		}
	}
`;
