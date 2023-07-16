import { SortingFn, SortingFnOption } from '@tanstack/react-table';

import { VulnerabilityDetailsFragment } from 'graphql/vulnerabilities.graphql';

import { ScanFinding } from './scans';

function toString(a: any) {
	if (typeof a === 'number') {
		if (isNaN(a) || a === Infinity || a === -Infinity) {
			return '';
		}
		return String(a);
	}
	if (typeof a === 'string') {
		return a;
	}
	return '';
}

/**
 * The same as in the backend, do not change the values
 */
export enum ReportStatus {
	NotAttested = 'not_attested',
	InProgress = 'in_progress',
	Attested = 'attested',
	Rejected = 'rejected',
	Stale = 'stale',
}

export enum ReportGenerationStatus {
	InProgress = 'in_progress',
	Finished = 'finished',
	Error = 'error',
}

export enum FindingStatus {
	Open = 'Open',
	Pending = 'Pending',
	Accepted = 'Accepted',
	Rejected = 'Rejected',
}
export const FindingStatusOrder = Object.values(FindingStatus);
export const sortFindingsByStatusOrder: SortingFn<ScanFinding> = (
	a,
	b,
	columnId
) => {
	const AVal = toString(a.getValue(columnId));
	const BVal = toString(b.getValue(columnId));

	if (AVal && !BVal) return -1;
	if (!AVal && BVal) return 1;
	if (!AVal && !BVal) return 0;

	// Ignore ts error because we know the values are in the enum
	// @ts-ignore
	return FindingStatusOrder.indexOf(AVal) - FindingStatusOrder.indexOf(BVal);
};

export enum PciStatus {
	Passed = 'Passed',
	Failed = 'Failed',
}

export enum VulnerabilityStatus {
	Passed = 'Passed',
	Failed = 'Failed',
}

export enum FindingSeverity {
	Clear = 'Clear',
	Low = 'Low',
	Medium = 'Medium',
	High = 'High',
}
export const FindingSeverityOrder = Object.values(FindingSeverity);
export const sortFindingsBySeverity: SortingFn<VulnerabilityDetailsFragment> = (
	a,
	b,
	columnId
) => {
	const AVal = toString(a.getValue(columnId));
	const BVal = toString(b.getValue(columnId));

	if (AVal && !BVal) return -1;
	if (!AVal && BVal) return 1;
	if (!AVal && !BVal) return 0;

	// Ignore ts error because we know the values are in the enum
	return (
		// @ts-ignore
		FindingSeverityOrder.indexOf(AVal) - FindingSeverityOrder.indexOf(BVal)
	);
};

export enum FindingCompliance {
	Open = 'Open',
	Passed = 'Passed',
	Failed = 'Failed',
	SpecialNotes = 'SpecialNotes',
}
export const FindingComplianceOrder = Object.values(FindingCompliance);
export const sortFindingsByComplianceOrder: SortingFn<
	VulnerabilityDetailsFragment
> = (a, b, columnId) => {
	const AVal = toString(a.getValue(columnId));
	const BVal = toString(b.getValue(columnId));

	if (AVal && !BVal) return -1;
	if (!AVal && BVal) return 1;
	if (!AVal && !BVal) return 0;

	// Ignore ts error because we know the values are in the enum
	return (
		// @ts-ignore
		FindingComplianceOrder.indexOf(AVal) - FindingComplianceOrder.indexOf(BVal)
	);
};
