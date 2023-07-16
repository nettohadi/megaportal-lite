export enum StandardFormats {
	DATE = 'dd MMM yyyy',
}

export const LIMIT_PER_PAGE_PROJECT = 9;
export const LIMIT_PER_PAGE_ORG = 20;
export const LIMIT_PER_PAGE_SCAN = 20;
export const LIMIT_PER_PAGE_VULNERABILITY = 20;
export const LIMIT_PER_ACTIVE_PAGE = 8;
export const LIMIT_NOTIFICATION_ITEM = 5;
export const LIMIT_PER_PAGE_HISTORY = 9;
export const LIMIT_PER_PAGE_NOTIFICATION = 15;
export const LIMIT_PER_TEMPLATE_PROJECT = 20;

export enum SCOPE {
	READ_USERS = 'read:users',
	CREATE_USERS = 'create:users',
	UPDATE_USERS = 'update:users',
	READ_ROLES = 'read:roles',
}

export enum ROLE_TYPE {
	ADMIN = 'admin',
	STAFF = 'staff',
	AUDITOR = 'auditor',
	QA = 'qa',
	SUPER_ADMIN = 'super_admin',
	ORG_ADMIN = 'org_admin',
}

export interface JwtUserPayload {
	scope: string[];
}

export enum ROLES_TEXT {
	ADMIN = 'Admin',
	STAFF = 'Staff',
}

export enum STATUS {
	NEW = 'new',
	IN_PROGRESS = 'in_progress',
	REVIEW = 'review',
	COMPLETE = 'complete',
	REJECT = 'reject',
}

export const STATUS_MAP: { [key in STATUS]: string } = {
	[STATUS.NEW]: 'New',
	[STATUS.IN_PROGRESS]: 'In Progress',
	[STATUS.REVIEW]: 'Review',
	[STATUS.COMPLETE]: 'Complete',
	[STATUS.REJECT]: 'Reject',
};

export enum PAGES_NAME {
	PROJECT = 'Project',
	REQUIREMENT = 'Requirement',
	TASK = 'Task',
	TASK_REVIEW = 'Task_review',
	FALSE_POSITIVES = 'false_positives',
}

export enum HISTORY_ACTION {
	CREATE_SUB = 'Create sub-requirement',
	CREATE = 'Create',
	UPDATE = 'Update',
	ARCHIVE = 'Archive',
	DUPLICATE = 'Duplicate',
	COMMENT = 'Comment',
	CHANGE_STATUS = 'Change status',
	ASSIGN_MEMBER = 'Assign member',
	// CREATE_FIELD_DESIGNER = 'Create field designer',
	// UPDATE_FIELD_DESIGNER = 'Update field designer',
	ARCHIVE_FIELD_DESIGNER = 'Archive filed designer',
	CREATE_FORM = 'Create form',
	UPDATE_FORM = 'Update form',
	UPLOAD_FILE = 'Upload file',
	DELETE_FILE = 'Delete file',
	DOWNLOAD_FILE = 'Download file',
	ARCHIVE_FILE = 'Archive file',
	ADD_PROJECT_MEMBER = 'Add member to project',
	REMOVE_MEMBER_FROM_PROJECT = 'Remove member from project',
	UPDATE_PROJECT_INFORMATION = 'Update project information',
	SHARE_FILE = 'Share file to another task',
	UPDATE_TEAM_MEMBER_INFORMATION = 'Update information of team member',
	ARCHIVE_TEAM_MEMBER = 'Archived team member',
}

export enum ROLE_ID {
	QA = 'qa',
	SA = 'super_admin',
	ORG_READ_ONLY = 'org_read_only',
	ORG_ADMIN = 'org_admin',
	ORG_STAFF = 'org_staff',
	AUDITOR = 'auditor',
}

export enum PROJECT_TYPE {
	COMPLIANCE = 'compliance',
	SCAN = 'scan',
	INTERNAL_SCAN = 'internal scan',
}

export const TEXT_PROJECT_TYPE: { [key in PROJECT_TYPE]: string } = {
	[PROJECT_TYPE.COMPLIANCE]: 'ROC Project',
	[PROJECT_TYPE.SCAN]: 'Scan Project',
	[PROJECT_TYPE.INTERNAL_SCAN]: 'Internal Scan Project',
};

export enum SCAN_STATUS {
	SUCCESSFUL = 'Successful',
	FAILED = 'Failed',
	SCHEDULED = 'Scheduled',
	IN_PROGRESS = 'In Progress',
	PAUSED = 'Paused',
	STOPPED = 'Stopped',
	ERROR = 'Error',
}

// Status of the scan run. Possible values are 'running',
// 'paused', 'stopped', 'want now', 'queued', 'complete',
// 'processing', 'ready', 'error', or 'finished'
export enum SAINT_SCAN_RUN_STATUS {
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
export enum SCAN_PCI_STATUS {
	Failed = 'Failed',
	Passed = 'Passed',
}
export enum REPORTS_STATUS {
	IN_REVIEW = 'In-Review',
	Attested = 'Attested',
	INVALID = 'Invalid',
	DRAFT = 'Draft',
}
export enum SPECIAL_NOTES_STATUS {
	OPEN = 'Open',
	IN_REVIEW = 'In Review',
	APPROVED = 'Approved',
	REJECTED = 'Rejected',
}
export enum VULNERABILITIES_SEVERITY {
	HIGH = 'High',
	MEDIUM = 'Medium',
	LOW = 'Low',
}
export enum FALSE_POSITIVES_STATUS {
	OPEN = 'Open',
	OPENED = 'Opened',
	APPROVED = 'Approved',
	REJECTED = 'Rejected',
	EXPIRED = 'Expired',
}
