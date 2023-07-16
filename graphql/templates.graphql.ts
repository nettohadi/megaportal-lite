import { gql } from 'graphql-request';

export const GET_ALL_TEMPLATES_QUERY = gql`
	query GetTemplates {
		templates {
			id
			title
			description
			requirements {
				id
				description
				title
				created_at
			}
			createdAt
		}
	}
`;

// todo: hacky way to avoid infinite level recursion add more if needed
export const GET_TEMPLATE_QUERY = gql`
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
							children(order_by: { position: asc }) {
								...RequirementsFields
								children(order_by: { position: asc }) {
									...RequirementsFields
									children(order_by: { position: asc }) {
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
		tasks {
			title
			id
			description
		}
	}

	query GetTemplate($id: uuid!) {
		template: templates_by_pk(id: $id) {
			id
			title
			description
			requirements(order_by: { position: asc }) {
				...RequirementsRecursive
			}
		}
	}
`;

export const CREATE_TEMPLATE_MUTATION = gql`
	mutation CreateTemplate($title: String!, $description: String!) {
		insert_templates_one(object: { title: $title, description: $description }) {
			id
			title
			description
		}
	}
`;

export const UPDATE_TEMPLATE_MUTATION = gql`
	mutation UpdateTemplate($id: uuid!, $title: String, $description: String) {
		update_templates_by_pk(
			pk_columns: { id: $id }
			_set: { title: $title, description: $description }
		) {
			id
			title
			description
		}
	}
`;

export const DELETE_TEMPLATE_MUTATION = gql`
	mutation DeleteTemplate($id: uuid!) {
		deleteTemplate(id: $id) {
			id
		}
	}
`;
