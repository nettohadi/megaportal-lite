import { HasuraForm } from './form';
import { Date } from './isoString';
import { Requirements } from './requirements';

export interface DeleteTask {
	id: string;
}

export interface AddTask {
	id: string;
	title: string;
	description: string;
	status?: string;
	created_at?: Date;
	updated_at?: Date;
	requirement_id?: string;
	position?: number;
	requirementId: string;
}

export interface UpdateTask {
	description: string;
	id: string;
	title: string;
}

export interface GetTask {
	id: string;
}

export interface Task {
	created_at: Date;
	description: string | null;
	id: string;
	requirement_id: string | null;
	requirement: Requirements | null;
	status: string | null;
	title: string;
	updated_at: Date;
	position?: number;
	form?: HasuraForm;
	type?: string;
}

export interface TaskUser {
	id: string;
	user_id: string;
	user: {
		firstName: string;
	};
}
