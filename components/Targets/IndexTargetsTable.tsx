import { useState, useMemo, useCallback } from 'react';

import { RepeatIcon } from '@chakra-ui/icons';
import { Box, Button, Spinner, Text, useToast } from '@chakra-ui/react';
import {
	CellContext,
	createColumnHelper,
	RowSelectionState,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import Link from 'next/link';
import { KeyedMutator } from 'swr';

import { IndeterminateCheckbox } from 'components/DataTable/IndeterminateCheckbox';
import { DefaultCellBox, TableProps } from 'components/DataTable/Table';
import { NoData } from 'components/NoData';
import { TargetCompactFragment } from 'graphql/targets.graphql';
import { useRowSelectionData } from 'hooks/table/useRowSelectionData';
import { syncTargetStatus } from 'libs/api/targets';
import { PciStatus } from 'types/scan-reports';

import { TargetStatusCell } from './cells/TargetStatusCell';
import { TargetComplianceStatusTag } from './TargetComplianceStatusTag';

export interface TargetsTableCallbacks {
	onSyncStatus?: (target: TargetCompactFragment, newStatus: PciStatus) => any;
}

interface ColumnMeta extends TargetsTableCallbacks {
	apiToken?: string;
}

function PciStatusCell(
	props: CellContext<TargetCompactFragment, TargetCompactFragment['pci_status']>
) {
	const status = props.getValue();
	const target = props.row.original;
	const targetId = target.id;
	const lastScan = props.row.original.scan_last;
	const lastScannedDate = lastScan?.last_scanned;
	const [isLoading, setIsLoading] = useState(false);

	const meta = props.column.columnDef.meta as ColumnMeta;
	const onSyncStatus = meta.onSyncStatus;

	const toast = useToast();

	const sync = useCallback(() => {
		setIsLoading(true);
		return syncTargetStatus({ targetId })
			.then((result) => {
				onSyncStatus?.(target, result.pciStatus);
			})
			.catch((error) => {
				toast({
					status: 'error',
					title: 'Error',
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [targetId, toast, onSyncStatus, target]);

	return (
		<DefaultCellBox alignItems={'center'} gap='1rem'>
			<Box
				flex={1}
				justifyContent={'stretch'}
				justifyItems={'center'}
				// backgroundColor={'red'}
				alignItems={'center'}
			>
				<TargetComplianceStatusTag
					status={status}
					lastScannedDate={lastScannedDate}
					width={'100%'}
					alignItems={'center'}
					justifyContent={'center'}
					textAlign={'center'}
				/>
			</Box>
			<Button
				ml='auto'
				p='0.5rem'
				disabled={isLoading}
				isDisabled={isLoading}
				onClick={sync}
			>
				{isLoading ? <Spinner size='sm' /> : <RepeatIcon onClick={sync} />}
			</Button>
		</DefaultCellBox>
	);
}

export function useIndexTargetsTable(
	data: TargetCompactFragment[] | undefined,
	callbacks: TargetsTableCallbacks,
	isInternalScansProject?: boolean
): TableProps<TargetCompactFragment> & {
	selectedRowsData: TargetCompactFragment[];
} {
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	// columnHelper returns a utility for creating different column definition types
	const columnHelper = createColumnHelper<TargetCompactFragment>();

	// define the columns
	const columns = useMemo(
		() =>
			[
				columnHelper.display({
					id: 'select',
					size: 64,
					header: ({ table }) => (
						<IndeterminateCheckbox
							{...{
								isChecked: table.getIsAllRowsSelected(),
								indeterminate: table.getIsSomeRowsSelected(),
								onChange: table.getToggleAllRowsSelectedHandler(),
							}}
						/>
					),
					enableColumnFilter: false,
					cell: ({ row }) => (
						<IndeterminateCheckbox
							button
							onToggle={row.toggleSelected}
							isChecked={row.getIsSelected()}
						/>
					),
				}),
				columnHelper.accessor('label', {
					header: 'Tag',
					cell: (cell) => {
						const label = cell.getValue();
						return (
							<DefaultCellBox fontWeight={'bold'}>
								{label ? label : <NoData />}
							</DefaultCellBox>
						);
					},
				}),
				columnHelper.accessor('target', {
					header: 'Target',
					cell: (cell) => {
						return (
							<DefaultCellBox fontWeight={'normal'}>
								{cell.getValue()}
							</DefaultCellBox>
						);
					},
				}),
				columnHelper.accessor('created_date', {
					header: 'Date Created',
					size: 160,
					meta: {
						center: true,
					},
					cell: (cell) => {
						const createdDate = cell.getValue();
						return (
							<DefaultCellBox center display={'flex'} justifyContent='center'>
								{createdDate ? dayjs(createdDate).format('M/DD/YYYY') : null}
							</DefaultCellBox>
						);
					},
				}),
				// columnHelper.accessor('last_scan_date', {
				// 	header: 'Last Scan Date',
				// 	size: 160,
				// 	cell: (cell) => {
				// 		const lastScanDate = cell.getValue();
				// 		return (
				// 			<DefaultCellBox display={'flex'} justifyContent='center'>
				// 				{lastScanDate ? (
				// 					dayjs(lastScanDate).format('M/DD/YYYY')
				// 				) : (
				// 					<NoData />
				// 				)}
				// 			</DefaultCellBox>
				// 		);
				// 	},
				// }),
				isInternalScansProject
					? (undefined as any)
					: columnHelper.accessor('pci_status', {
							header: 'Compliance',
							size: 200,
							meta: {
								...callbacks,
								alignCenter: true,
							},
							cell: PciStatusCell,
					  }),
				columnHelper.display({
					header: 'Last Scan',
					size: 160,
					cell: (cell) => {
						const lastScan = cell.row.original.scan_last;
						const lastScanDate = lastScan?.last_scanned;
						const lastScanDateString = lastScanDate
							? dayjs(lastScanDate).format('M/DD/YYYY')
							: '';
						return (
							<DefaultCellBox display={'flex'} justifyContent='flex-start'>
								{lastScan ? (
									<Text as='p' fontWeight={'medium'} fontSize='14px'>
										<Link
											href={`/admin/projects/${lastScan.project_id}/scans/${lastScan.id}`}
											passHref
										>
											<Text
												as='a'
												color='blue.500'
												fontWeight={'bold'}
												display={'inline-block'}
											>
												{lastScan.name}
											</Text>
										</Link>
										<Text as='span'>{` `}</Text>
										{lastScanDateString ? (
											<Text
												as='span'
												fontSize={'small'}
												fontWeight={'medium'}
												opacity={1}
											>{`(${lastScanDateString})`}</Text>
										) : (
											<></>
										)}
									</Text>
								) : (
									<NoData />
								)}
							</DefaultCellBox>
						);
					},
				}),
			].filter((v) => !!v),
		[columnHelper, isInternalScansProject, callbacks]
	);

	const selectedRowsData = useRowSelectionData(data, rowSelection, 'id');

	return {
		columns,
		data,
		rowSelection,
		onChangeRowSelection: setRowSelection,
		selectedRowsData,
		useFilters: true,
	};
}
