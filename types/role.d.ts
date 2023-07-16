import { ROLE_TYPE } from 'libs/constants';

export interface Role {
	id: string;
	role_id: string;
	name: string;
	level: number;
	permissions?: RolePermission[];
	type?: ROLE_TYPE;
}

export interface RolePermission {
	id: string;
	permission_id: string;
	role_id: string;
	permission: Permission;
}

export interface Permission {
	id: string;
	name: string;
	module_id: string;
	description?: string;
}

export interface GetRoles {
	level: number;
}
