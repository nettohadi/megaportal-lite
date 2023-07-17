import { PciStatus } from 'types/scan-reports';
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
	const randomValue = Math.random() < 0.5 ? 'Passed' : 'Failure';
	return Promise.resolve({
		vulnerabilitiesCount: 0,
		pciStatus: PciStatus[randomValue as keyof typeof PciStatus],
	});
}
