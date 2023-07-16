import type { UiSchema } from '@rjsf/core';
import type { GroupBase, AsyncProps } from 'chakra-react-select';
import { JSONSchema7 } from 'json-schema';


import { Date } from './isoString';

export interface SearchOption {
	label: string;
	value: string;
}

export type AsyncSelectLoadOptions<
	TOption = SearchOption,
	TMulti extends boolean = false,
	TGroup = GroupBase<TOption>
> = Required<AsyncProps<TOption, TMulti, TGroup>>['loadOptions'];

export type AsyncSelectFetchSearchInputs<TData> = (
	inputValue: string
) => Promise<TData[]>;

export type AsyncSelectFetchSearchOptions<TOption = SearchOption> = (
	inputValue: string
) => Promise<TOption[]>;

export type AsyncSelectSearchData<TData> = (
	inputValue: string
) => Promise<TData[]>;

export type AsyncSelectOnChange<
	TOption = SearchOption,
	TMulti extends boolean = false,
	TGroup = GroupBase<TOption>
> = Required<AsyncProps<TOption, TMulti, TGroup>>['onChange'];

export interface FormData {
	[key: string]: string | boolean;
}

export interface HasuraForm {
	id: string;
	schema: string;
	uiSchema: string;
	createdAt: Date;
	updatedAt: Date;
	task_id: string;
	data: string;
}

export interface Form {
	id: string;
	created_at: Date;
	updated_at: Date;
	task_id: string;
	schema: JSONSchema7;
	uiSchema: UiSchema;
	data: FormData;
}

export interface CreateForm {
	task_id: string;
	data?: string;
	schema?: string;
	uiSchema?: string;
}

export interface UpdateForm {
	id: string;
	data?: string;
	schema?: string;
	uiSchema?: string;
}

export interface DeleteProject {
	id: string;
}
