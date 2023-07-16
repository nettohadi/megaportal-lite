import { Date } from './isoString';

export interface Input {
	id: string;
	options: string | null;
	placeholder: string | null;
	title: string;
	type: number;
	required: boolean;
	isEmail: boolean;
	sortType?: number;
}

export interface HasuraInput {
	id: string;
	created_at: Date;
	updated_at: Date;
	options: string | null;
	placeholder: string | null;
	title: string;
	type: number;
}

export interface Inputs {
	[key: string]: Input;
}
export interface HasuraInputs {
	[key: string]: HasuraInput;
}
