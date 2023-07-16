import { Member } from 'types/members';

import { Date } from './isoString';

export interface CreateOrganization {
	name: string;
	description: string;
	phone?: string;
	email?: string;
	location?: string;
	primaryContact?: string;
	primaryContactEmail?: string;
	ipLimits: number;
}

export interface UpdateOrganization {
	id: string;
	name: string;
	description: string;
	phone?: string;
	email?: string;
	location?: string;
	primaryContact?: string;
	primaryContactEmail?: string;
	ipLimits: number;
}
export interface GetOrganization {
	id: string;
}

export type DeleteOrganization = GetOrganization;

export interface Organization {
	id: string;
	name: string;
	description: string | null;
	email: string | null;
	phone: string | null;
	location: string | null;
	primaryContact: string | null;
	primaryContactEmail: string | null;
	createdAt: Date;
	updatedAt: Date | null;
	members?: OrganizationMember[];
	imageUrl?: string;
	membersCount?: number;
	ipLimits: number;
	job_title?: string;
	country?: string;
	state?: string;
	city?: string;
	address?: string;
	zip?: string;
	website_url?: string;
}

export interface OrganizationQuery {
	organization: Organization;
}

export interface OrganizationMember {
	id: string;
	user: Member;
}
