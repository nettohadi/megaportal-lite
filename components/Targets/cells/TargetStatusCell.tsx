import { CellContext } from '@tanstack/react-table';

import { DefaultCellBox } from 'components/DataTable/Table';
import { TargetCompactFragment } from 'graphql/targets.graphql';

import { TargetComplianceStatusTag } from '../TargetComplianceStatusTag';

export function TargetStatusCell(
	props: CellContext<TargetCompactFragment, TargetCompactFragment['pci_status']>
) {
	const status = props.getValue();
	const lastScan = props.row.original.scan_last;
	const lastScannedDate = lastScan?.last_scanned;

	return (
		<DefaultCellBox center>
			<TargetComplianceStatusTag
				status={status}
				lastScannedDate={lastScannedDate}
			/>
		</DefaultCellBox>
	);
}
