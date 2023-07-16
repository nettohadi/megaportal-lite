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
	},
	required: ['type'],
	dependencies: {
		type: {
			oneOf: [
				{
					properties: {
						type: {
							enum: ['Text'],
						},
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
					},
					required: ['title'],
				},
				{
					properties: {
						type: {
							enum: ['Date'],
						},
						title: {
							title: 'Title',
							type: 'string',
						},
						required: {
							title: 'Required',
							type: 'boolean',
							enum: [true, false],
						},
					},
					required: ['title'],
				},
				{
					properties: {
						type: {
							enum: ['TextArea'],
						},
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
					},
					required: ['title'],
				},
				{
					properties: {
						type: {
							enum: ['Checkbox'],
						},
						title: {
							title: 'Title',
							type: 'string',
						},
					},
					required: ['title'],
				},
				{
					properties: {
						type: {
							enum: ['Select'],
						},
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
					},
					required: ['title', 'options'],
				},
				/*
				{
					properties: {
						type: {
							enum: ['Multi-Select'],
						},
						title: {
							title: 'Title',
							type: 'string',
						},
						placeholder: {
							title: 'Placeholder',
							type: 'string',
						},
						description: {
							type: 'string',
							title: 'Description',
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
									description: {
										type: 'string',
										title: 'Description',
									},
									default: {
										type: 'boolean',
										title: 'Is default',
										default: false,
										enum: [true, false],
									},
								},
							},
						},
					},
					required: ['title'],
				},
				*/
			],
		},
	},
};

export default schema;
