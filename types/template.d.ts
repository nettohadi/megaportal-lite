import { Date } from './isoString';
import { Requirements } from './requirements';

export interface GetTemplate {
	id: string;
}

export interface CreateTemplate {
	id: string;
	title: string;
	description: string;
}

export interface UpdateTemplate {
	id: string;
	title?: string;
	description?: string;
}

export interface DeleteTemplate {
	id: string;
}

export interface Template {
	id: string;
	title: string;
	description: string;
	requirements: Requirements[];
	createdAt: Date;
}
