import { gql } from 'graphql-request';

export const GET_USERS = `
  query getUsers {
    users {
      id
      email
      created_at
      name
      updated_at
      username
      avatar_url
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
	mutation UpdateUser($id: uuid!, $avatar_url: String) {
		updateUser(pk_columns: { id: $id }, _set: { avatar_url: $avatar_url }) {
			id
			avatar_url
		}
	}
`;
