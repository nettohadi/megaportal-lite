import { JSONSchema7 } from 'json-schema';

const schema: JSONSchema7 = {
	type: 'object',
	properties: {
		title: {
			title: 'Template Name',
			type: 'string',
			minLength: 3,
		},
		description: {
			title: 'Template Description',
			type: ['string', 'null'],
		},
	},
	required: ['title'],
};

export default schema;
