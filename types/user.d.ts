import { Date } from './isoString';
import { Role } from './role';

export interface Users {
	users: User[];
}

export interface GetUser {
	id: string;
}

export interface UpdateUser {
	avatar_url?: string;
	id: string;
}

export interface User {
	avatar_url?: string;
	created_at: Date | null;
	email: string;
	id: string;
	// TODO: Does not exist in Hasura
	firstName: string | null;
	lastName: string | null;
	// TODO: Bad name
	update_at: Date | null;
	username: string | null;
	role_id: string;
	role?: Role;
	location?: string;
	phone?: string;
	overview?: string;
	org_member?: [
		{
			organization: {
				id: string;
				name: string;
			};
		}
	];
}
