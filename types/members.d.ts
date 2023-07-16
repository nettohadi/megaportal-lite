import { Role } from './role';

export interface GetMembers {
	users: {
		avatar_url: string | null;
		email: string;
		firstName: string | null;
		id: string;
		lastName: string | null;
	};
}

export interface GetMemberById {
	id: string;
}
export interface GetMemberByEmail {
	email: string;
}

export interface CreateMember {
	email: string;
	firstName: string;
	id: string;
	lastName: string;
	location?: string;
	overview?: string;
	phone?: string;
	timezone?: string;
	title?: string;
}

export interface UpdateTeamMember extends CreateMember {
	id: string;
}

export interface DeleteMember {
	id: string;
}

export interface Member {
	avatar_url: string | null;
	email: string;
	firstName: string | null;
	id: string;
	lastName: string | null;
	location: string | null;
	overview: string | null;
	phone: string | null;
	timezone: string | null;
	title: string | null;
	role_id: string;
	role: Role;
	pendingInvite: boolean;
}
