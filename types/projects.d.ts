import { PROJECT_TYPE } from 'libs/constants';
import { Requirements } from 'types/requirements';

import { IAggregate } from './common';
import { Date } from './isoString';
import { Scan, Target, ScanReport, Vulnerability } from './scans';

export interface CreateProject {
	active: boolean;
	description: string;
	id: string;
	name: string;
}

export interface UpdateProject {
	description: string;
	id: string;
	name: string;
}

export interface DeleteProject {
	id: string;
}

export type GetProject = DeleteProject;

export interface Project {
	active: boolean;
	createdAt: Date;
	description: string;
	dueAt: Date | null;
	id: string;
	name: string;
	requirements: Requirements[];
	updatedAt: Date;
	organization_id: string;
	phase: number;
	phases: number;
	org: {
		imageUrl: string;
		name: string;
		id: string;
	};
	type?: PROJECT_TYPE;
	/**
	 * In scan project only
	 */
	scans?: Scan[];
	scans_aggregate?: IAggregate;
	// scheduled_scans?: Scan[];
	/**
	 * In scan project only
	 */
	targets?: Target[];
	// /**
	//  * In scan project only
	//  */
	scan_reports?: ScanReport[];
	ipLimits: number;
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
	email?: string;
	companyName?: string;
	websiteUrl?: string;
	scannerNode: string;
	scannerNodeName?: string;
	address: string;
	country: string;
	city: string;
	state: string;
	zip: string;
}

export interface ProjectQuery {
	project: Project;
}

export interface ProjectTeamMember {
	avatar_url?: string;
	email: string;
	firstName: string;
	id: string;
	title?: any;
	role_id?: string;
}

export interface ProjectTeam {
	updated_at: Date;
	id: string;
	user: ProjectTeamMember;
}

export interface ProjectTeamQuery {
	teams: ProjectTeam[];
}

export interface ProjectItems {
	name: string;
	org: {
		imageUrl: string;
		name: string;
		id: string;
	};
	type: string;
	numbersOfVulnerabilities?: number;
	scan_reports: any;
	failing_vulnerabilities_count: number;
	special_notes_count: number;
	last_attested_report: any;
}
