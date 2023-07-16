import { Target } from 'types/scans';

export interface SyncTargetStatusInput {
	targetId: Target['id'];
}

export interface SyncTargetStatusResponse {
	pciStatus: Target['pci_status'];
	vulnerabilitiesCount: number;
}

/**
 * Syncs Saint's Scan
 */
export function syncTargetStatus(input: SyncTargetStatusInput) {
	const pciStatus = Math.random() < 0.5 ? 'Passed' : 'Failure';
	return Promise.resolve({ vulnerabilitiesCount: 0, pciStatus });
}
