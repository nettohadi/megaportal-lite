import { gql } from 'graphql-request';

export const CREATE_HISTORY_MUTATION = gql`
	mutation CreateHistory(
		$action: String!
		$user_id: uuid!
		$module_id: uuid!
		$page_id: uuid!
		$page: String!
		$old_data: jsonb
		$new_data: jsonb
	) {
		insert_histories_one(
			object: {
				action: $action
				user_id: $user_id
				module_id: $module_id
				page_id: $page_id
				page: $page
				old_data: $old_data
				new_data: $new_data
			}
		) {
			id
			action
			user_id
			module_id
			page_id
			page
		}
	}
`;

export const GET_HISTORIES_BY_MODULE_ID = gql`
	query GetHistoriesByModuleId($moduleId: uuid!, $limit: Int, $offset: Int) {
		histories_aggregate(where: { module_id: { _eq: $moduleId } }) {
			aggregate {
				count
			}
		}
		histories(
			limit: $limit
			offset: $offset
			where: { module_id: { _eq: $moduleId } }
			order_by: { created_at: desc }
		) {
			id
			action
			module_id
			page_id
			page
			created_at
			old_data
			new_data
			read
			author {
				id
				firstName
				lastName
				avatar_url
			}
		}
	}
`;

export const GET_LIST_HISTORIES_BY_USER = gql`
	query GetListHistoriesByUser($userId: uuid!, $limit: Int, $offset: Int) {
		histories_aggregate(
			where: { project: { teams: { user_id: { _eq: $userId } } } }
		) {
			aggregate {
				count
			}
		}
		histories(
			limit: $limit
			offset: $offset
			order_by: { created_at: desc }
			where: { project: { teams: { user_id: { _eq: $userId } } } }
		) {
			id
			action
			module_id
			page_id
			page
			created_at
			old_data
			new_data
			read
			author {
				id
				firstName
				lastName
				avatar_url
			}
		}
	}
`;

export const MARK_READING_NOTIFICATIONS = gql`
	mutation MarkReadingNotification($historyIds: [uuid!], $userId: jsonb!) {
		update_histories(
			where: { id: { _in: $historyIds } }
			_append: { read: $userId }
		) {
			affected_rows
		}
	}
`;

export const CHECK_UNREAD_NOTIFICATIONS = gql`
	query CheckUnreadNotifications($userId: jsonb!, $ownerId: uuid!) {
		histories_aggregate(
			where: {
				project: { teams: { user_id: { _eq: $ownerId } } }
				_not: { read: { _contains: $userId } }
			}
		) {
			aggregate {
				count
			}
		}
	}
`;
