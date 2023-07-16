import { Date } from './isoString';
import { Project } from './projects';
import { VulnerabilityStatus } from './scan-reports';
import { User } from './user';

export interface CreateScan {
	name: string;
	targets: string[];
	scheduleDate: [string, string];
	nextScanDate: Date;
}

export interface UpdateScan {
	id: string;
	name?: string;
	targets?: string[];
	scheduleDate?: [string, string];
	nextScanDate?: Date;
}
export interface GetScan {
	id: string;
}

export type DeleteScan = GetScan;

export interface ScanTarget {
	id: string;
	scan_id: Scan['id'];
	scan: Scan;
	target_id: Target['id'];
	target: Target;
}

// Status of the scan run. Possible values are 'running',
// 'paused', 'stopped', 'want now', 'queued', 'complete',
// 'processing', 'ready', 'error', or 'finished'
enum SAINT_SCAN_RUN_STATUS {
	RUNNING = 'running',
	PAUSED = 'paused',
	STOPPED = 'stopped',
	WANT_NOW = 'want now',
	QUEUED = 'queued',
	COMPLETE = 'complete',
	PROCESSING = 'processing',
	READY = 'ready',
	ERROR = 'error',
	FINISHED = 'finished',
}

export interface ScanRun {
	id: string;
	scan_id: Scan['id'];
	saint_scanrun_id: number;
	saint_schedule_id?: number | null;
	progress: number | null;
	status: SAINT_SCAN_RUN_STATUS;
	start_datetime: Date;
	end_datetime?: Date;
	completed: boolaen;
	pci_status?: string | null;
	saint_findings_count?: number | null;
}

export interface Scan {
	id: string;
	name: string;
	description: string;
	qualys_scan_ref?: string;
	rapid_id?: number;
	status: SCAN_STATUS;
	pci_status?: SCAN_PCI_STATUS;
	schedule_date?: Date;
	/**
	 * Repeats every N hours
	 */
	repeat_in?: number;
	created_date: Date;

	project_id: string;
	project: Project;
	targets: Target[];
	// scan_targets: ScanTarget[];
	vulnerabilities?: Vulnerability[];
	reports: ScanReport[];
	last_scanned: Date;
	saintJobId: number;
	saint_scanrun_id: number;
	vulnerabilities_count: number;
	last_sync_date?: Date;
	last_scanrun_id?: ScanRun['id'] | null;
	last_finished_scanrun_id?: ScanRun['id'] | null;
	pulled_results_scanrun_id?: ScanRun['id'] | null;
	last_scanrun?: ScanRun | null;
	last_finished_scanrun?: ScanRun | null;
	pulled_results_scanrun?: ScanRun | null;
}

export interface ScanQuery {
	organization: Scan;
}

export type WithProjectAndOrg<T> = T & {
	project: Pick<Project, 'id' | 'name'>;
	org: Pick<Organization, 'id' | 'name'>;
};

export type WithFalsePositive<T> = T & {
	false_positive: FalsePositive;
};
export type WithApprovedFalsePositive<T> = T & {
	approved_false_positive: FalsePositive;
};

export interface Vulnerability {
	id: string;
	name: string;
	description: string;
	severity: string;
	os: string;
	scan_id: Scan['id'];
	target_id: Target['id'];
	cvss_score: string;
	cvssv3_score: string;
	provider: string;
	pci_status: VulnerabilityStatus;
	ip: string;
	port: string;
	discovered: string;
	created_at: Date;
	// do not use
	// TODO remove later
	// false_positives_count: number;
	service_description?: string;
	status?: string;
	false_positive_request_id?: FalsePositive['id'];
	approved_false_positive_request_id?: FalsePositive['id'];
	approved_compliance_status?: VulnerabilityStatus;
	pci_comment?: string;
	hostname?: string;
	solution?: string;
	saint_vuln_id?: string;
	cve_info?: string;
	techdetails?: string;
	refs?: string;
	cve_id?: string;
	vuln_hash?: string;
}

export type TargetCompliance = 'not_scanned' | 'successful' | 'failing';

export type TargetValue = {
	id?: string;
	target: string;
	label: string;
};

export interface Target {
	id: string;
	target: string;
	pci_status?: PciStatus;
	label: string;
	created_date?: Date;
	project_id: Project['id'];
	last_scanned?: Date;
	/**
	 * Hasura computed field
	 * TODO: use last_scan instead
	 */
	last_scan_date?: Date;
	compliance?: TargetCompliance;
	last_scan_id?: Scan['id'];
	// might be removed in future
	consolidated_solution?: string;
	// target_scans: ScanTarget[];
	// scans: Scan[];
}

// Utility types

export type WithProject<T> = T & { project: Project };
export type WithScans<T> = T & { scans: Scan[] };
export type WithFindings<T> = T & { findings: Vulnerability[] };
export type WithTargets<T> = T & { targets: Target[] };
export type WithFalsePositives<T> = T & { false_positives: FalsePositive[] };

enum ReportStatus {
	NotAttested = 'not_attested',
	InProgress = 'in_progress',
	Attested = 'attested',
	Rejected = 'rejected',
	Stale = 'stale',
}

// enum ReportGenerationStatus {
// 	InProgress = 'in_progress',
// 	Finished = 'finished',
// 	Error = 'error',
// }

export interface ScanReport {
	id: string;
	name: string;
	type: string;
	pci_status: VulnerabilityStatus;
	status: ReportStatus;
	findings_count: number;
	created_date: Date;
	project_id: string;
	pdf_summary_url?: string;
	docx_summary_url?: string;
	csv_summary_url?: string;
	pdf_detailed_url?: string;
	docx_detailed_url?: string;
	csv_detailed_url?: string;
	pdf_attestation_summary_url?: string;
	docx_attestation_summary_url?: string;
	report_generation_status?: ReportGenerationStatus | null;
}

export interface FalsePositive {
	id: string;
	status: FALSE_POSITIVES_STATUS;
	evidence_description: string;
	date_reported: Date;
	expiration_date: Date;
	reported_by_user_id: User['id'];
	rewieved_by_user_id?: User['id'];
	vulnerability_id: string;
	review_comment?: string;
}

// TODO remove this and use ScanVulnerability instead.
export type ScanFinding = Vulnerability;

export interface ScanFindingSmall {
	id: string;
	name: string;
}

export type ScansTableState = {
	/**
	 * Scan ids that are deleting
	 */
	deleting: string[];
	/**
	 * Scan ids that are syncing
	 */
	syncing: string[];
	/**
	 * Scan ids that are pausing
	 */
	pausing: string[];
	/**
	 * Scan ids that are resuming
	 */
	resuming: string[];
	/**
	 * Scan ids that are stopping
	 */
	stopping: string[];
};

type ScansTableCallbacks = {
	onSync: (payload: { data: Scan }) => any | Promise<any>;
	onDelete: (payload: { data: Scan }) => any | Promise<any>;
	onPause: (payload: { data: Scan }) => any | Promise<any>;
	onResume: (payload: { data: Scan }) => any | Promise<any>;
	onStop: (payload: { data: Scan }) => any | Promise<any>;
	onGetResults: (payload: { data: Scan }) => any | Promise<any>;
};
