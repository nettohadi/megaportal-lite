import type { JSONSchema7 } from 'json-schema';
import _ from 'lodash';

import type { Input } from 'types/template_input';

const makeGoodString = (string: string) => string.replace(/[^A-Z0-9]/gi, '_');

export const convertJSONInput = (formData: any, id?: string): Input => {
	const { type, title, placeholder, required } = formData;
	const input: Input = {
		id: formData.id,
		isEmail: false,
		options: null,
		placeholder: placeholder || '',
		required: required || false,
		title,
		type,
	};

	switch (type) {
		case 'Text':
			const { email } = formData;

			input.type = 0;

			if (email) {
				input.isEmail = true;
			}

			break;
		case 'TextArea':
			input.type = 1;

			break;
		case 'Date':
			input.type = 2;

			break;
		case 'Checkbox':
			input.type = 3;

			break;
		case 'Select':
			const { options } = formData;

			input.type = 4;
			input.options = `[${options
				.map((opt: { title: string }) => `"${opt.title}"`)
				.join(', ')}]`;

			break;
	}

	if (id) {
		input.id = id;
	}

	return input;
};

export const generateEditSchemas = (input: Input): JSONSchema7 => {
	let properties = {};
	let required: string[] = [];

	const { type } = input;

	switch (type) {
		case 0:
			properties = {
				title: {
					title: 'Title',
					type: 'string',
				},
				placeholder: {
					title: 'Placeholder',
					type: 'string',
				},
				required: {
					title: 'Required',
					type: 'boolean',
					enum: [true, false],
				},
				email: {
					title: 'Email',
					type: 'boolean',
					enum: [true, false],
				},
			};
			required = ['title'];
			break;
		case 1:
			properties = {
				title: {
					title: 'Title',
					type: 'string',
				},
				placeholder: {
					title: 'Placeholder',
					type: 'string',
				},
				required: {
					title: 'Required',
					type: 'boolean',
					enum: [true, false],
				},
			};
			required = ['title'];
			break;
		case 2:
			properties = {
				title: {
					title: 'Title',
					type: 'string',
				},
				required: {
					title: 'Required',
					type: 'boolean',
					enum: [true, false],
				},
			};
			required = ['title'];
			break;
		case 3:
			properties = {
				title: {
					title: 'Title',
					type: 'string',
				},
			};
			required = ['title'];
			break;
		case 4:
			properties = {
				title: {
					title: 'Title',
					type: 'string',
				},
				placeholder: {
					title: 'Placeholder',
					type: 'string',
				},
				required: {
					title: 'Required',
					type: 'boolean',
					enum: [true, false],
				},
				options: {
					type: 'array',
					title: 'Options',
					items: {
						type: 'object',
						required: ['title'],
						properties: {
							title: {
								type: 'string',
								title: 'Title',
							},
						},
					},
				},
			};
			required = ['title'];
			break;
	}

	return {
		type: 'object',
		properties,
		required,
	};
};

export const generateEditForm = (input: Input) => {
	const { id, type, required, placeholder, title, isEmail } = input;
	let { options } = input;

	const generatedSchema = generateEditSchemas(input);

	let stringType = 'Text';

	switch (type) {
		case 1:
			stringType = 'TextArea';

			break;
		case 2:
			stringType = 'Date';

			break;
		case 3:
			stringType = 'Checkbox';

			break;
		case 4:
			stringType = 'Select';

			if (options) {
				options = JSON.parse(options).map((opt: string) => ({
					name: makeGoodString(opt),
					title: opt,
				}));
			}

			break;
	}

	return {
		schema: generatedSchema,
		id,
		formData: {
			email: isEmail,
			options,
			placeholder,
			required,
			title,
			type: stringType,
		},
	};
};
