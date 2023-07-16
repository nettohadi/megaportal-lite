import { Date } from './isoString';
import { Task } from './task';

export interface CreateRequirements {
	description: string;
	id?: string;
	parent_id?: string | null;
	parent_path?: string | null;
	project_id?: string;
	template_id?: string;
	title: string;
}

export interface CreateManyRequirements {
	description: string;
	id?: string;
	parent_id?: string | null;
	parent_path?: string | null;
	project_id?: string;
	template_id?: string;
	title: string;
	position?: number;
}

export interface GetRequirement {
	id: string;
}

// TODO: Replace with either or not never.
export interface UpdateRequirement {
	id: string;
	title?: string;
	description?: string;
}

export interface DeleteRequirement {
	id: string;
}

export interface RequirementsQuery {
	requirements: Requirements[];
}
// INFO: All commented lines are due to being implemented on Hasura, but not yet in our graphql.ts files.
export interface Requirements {
	children?: Requirements[];
	created_at: Date;
	description: string;
	id: string;
	parent_id: string | null;
	parent_path?: string; // TODO: Make mandatory (condition makes this easier for mocks)
	// ParentRequirement: Requirements[];
	position: number;
	// project_id: string | null;
	status: string | null;
	tasks?: Task[];
	// template_id: string | null;
	template?: {
		id: string;
		title: string;
		description: string;
	};
	title: string;
	description: string;
	status?: string;
	created_at?: Date;
	updated_at?: Date;
	parent_path?: string;
	parent_id?: string;
	template_id?: string;
	project_id?: string;
	children?: Requirements[];
	tasks?: Task[];
	position?: number;
}

export interface IReposition {
	id: string;
	position: number;
	title: string;
	description: string;
	parent_id?: string | null;
	parent_path?: string;
}
