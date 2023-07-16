import { v4 } from 'uuid';

export class Member {
	public email: string;
	public blocked: boolean;
	public email_verified: boolean;
	public name: string;
	public verify_email: boolean;
	public connection: string;
	public password: string;
	public role: string;
	public app_metadata: object;
	public given_name?: string;
	public family_name?: string;

	constructor(input: {
		email: string;
		role: string;
		organizationId?: string;
		name?: string;
		firstName?: string;
		lastName?: string;
	}) {
		this.email = input.email;
		this.role = input.role;
		this.name = input.name && input.name !== ' ' ? input.name : input.email;
		this.email_verified = false;
		this.blocked = false;
		this.verify_email = true;
		this.password = v4();
		this.app_metadata = {
			invited_user: true,
			user_verified: false,
			role: input.role,
		};
		this.given_name = input?.firstName;
		this.family_name = input?.lastName;

		if (input.organizationId) {
			this.app_metadata = {
				...this.app_metadata,
				organizationId: input.organizationId,
			};
		}
	}
}
