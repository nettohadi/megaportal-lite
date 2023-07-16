import { JSONSchema7 } from 'json-schema';

const schema: JSONSchema7 = {
	type: 'object',
	properties: {
		type: {
			title: 'Type',
			type: 'string',
			enum: [
				'Text',
				'TextArea',
				'Select',
				'Date',
				'Checkbox',
				/* 'Multi-Select' */
			],
			default: '',
		},
		name: {
			title: 'Name',
			type: 'string',
			default: '',
		},
	},
	required: ['type', 'name'],
};

export default schema;
