import { JSONSchema7 } from 'json-schema';

const schema: JSONSchema7 = {
	type: 'object',
	properties: {
		name: {
			title: 'Project Name',
			type: 'string',
			minLength: 3,
		},
		description: {
			title: 'Project Description',
			type: ['string', 'null'],
		},
		phase: {
			title: 'Project Current Phase (start from 1)',
			type: ['number', 'null'],
		},
		phases: {
			title: 'Project Phase Number (start from 1)',
			type: ['number', 'null'],
		},
		dueDate: {
			title: 'Project Due Date',
			type: ['string', 'null'],
		},
		firstName: {
			title: 'First Name',
			type: 'string',
			minLength: 3,
		},
		lastName: {
			title: 'Last Name',
			type: 'string',
			minLength: 3,
		},
		phoneNumber: {
			title: 'Phone Number',
			type: 'string',
		},
		email: {
			title: 'Email',
			type: 'string',
		},
		companyName: {
			title: 'Company Name',
			type: 'string',
		},
		address: {
			title: 'Business Address',
			type: ['string', 'null'],
		},
		country: {
			title: 'Country',
			type: ['string', 'null'],
		},
		city: {
			title: 'City',
			type: ['string', 'null'],
		},
		state: {
			title: 'State/Province',
			type: ['string', 'null'],
		},
		zip: {
			title: 'Zip',
			type: ['string', 'null'],
		},
		websiteUrl: {
			title: 'Website URL',
			type: ['string', 'null'],
		},
	},
	required: [
		'name',
		'firstName',
		'lastName',
		'phoneNumber',
		'email',
		'companyName',
		'organization',
	],
};

export default schema;
