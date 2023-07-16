import { useState, useMemo, useCallback } from 'react';

import {
	Button,
	Flex,
	Icon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	useColorModeValue,
	useColorMode,
} from '@chakra-ui/react';
import {
	ColumnFiltersState,
	PaginationState,
	createColumnHelper,
	RowSelectionState,
} from '@tanstack/react-table';
import { AsyncCreatableSelect } from 'chakra-react-select';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { BsPlus } from 'react-icons/bs';


import { IndeterminateCheckbox } from 'components/DataTable/IndeterminateCheckbox';
import { Table, TableProps } from 'components/DataTable/Table';
import {
	TargetsTableCallbacks,
	useIndexTargetsTable,
} from 'components/Targets/IndexTargetsTable';
import { useRowSelectionData } from 'hooks/table/useRowSelectionData';
import { useAsyncSearch } from 'hooks/useAsyncSearch';
import { useProjectContextHelpers } from 'hooks/useProjectContextHelpers';
import { useListTargetsByProjectIdQuery } from 'libs/hooks/targets/useListTargetsByProjectIdQuery';
import { useListUnpaginatedTargetsByProjectIdQuery } from 'libs/hooks/targets/useListUnpaginatedTargetsByProjectIdQuery';
import { Target } from 'types/scans';
import { buildWhereFilter } from 'utils/whereFilter';

export interface SelectTargetsModalProps {
	id: string;
	isLoading?: boolean;
	isOpen: boolean;
	onClose: () => void;
	projTargets: Target[];
	selProjTargets: (data: Target[]) => void;
}

export function SelectTargetsModal({
	id,
	isOpen,
	onClose,
	projTargets,
	selProjTargets,
}: SelectTargetsModalProps) {
	const modalBodyColor = useColorModeValue('white', 'navy.800');

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [loadFilters, setLoadFilters] = useState(false);
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const pagination = useMemo(
		() => ({
			pageIndex,
			pageSize,
		}),
		[pageIndex, pageSize]
	);

	const router = useRouter();
	const projectId = router.query.projectId as string;

	// filters
	const filterOnFocus = () => {
		setLoadFilters(true);
	};

	const targetsWhereFilter = buildWhereFilter(columnFilters, 'projectTargets');

	const targetsFilters = {
		limit: pageSize,
		offset: pageIndex * pageSize,
		// order_by: orderByFilter,
		where: {
			project_id: { _eq: projectId },
			...targetsWhereFilter,
		},
	};

	const { targets, targetsAggregate, error, mutate } =
		useListTargetsByProjectIdQuery(projectId, targetsFilters);

	const { unpaginatedTargets } = useListUnpaginatedTargetsByProjectIdQuery(
		projectId,
		loadFilters
	);

	// map over scans, trim all data after the character "T" in created_date
	// this is to remove the time from the date to make date filtering easier
	const trimmedTargets = targets?.map((target) => ({
		...target,
		created_date: dayjs(target.created_date).format('YYYY-MM-DD'),
	}));

	// pagination counts
	const reportsCount = targetsAggregate?.count || 0;
	const totalPages = Math.ceil(reportsCount / pageSize);

	const { isInternalScansProject } = useProjectContextHelpers();
	const onSyncStatus = useCallback<
		Required<TargetsTableCallbacks>['onSyncStatus']
	>(
		(target, newStatus) => {
			mutate((prevState) => ({
				targets:
					prevState?.targets?.map((existingTarget) => {
						if (existingTarget.id === target.id) {
							return {
								...existingTarget,
								pci_status: newStatus,
							};
						}

						return existingTarget;
					}) ?? [],
			}));
		},
		[mutate]
	);

	const tableCallbacks = useMemo<TargetsTableCallbacks>(() => {
		return {
			onSyncStatus,
		};
	}, []);

	const targetsTable = useIndexTargetsTable(
		trimmedTargets,
		tableCallbacks,
		isInternalScansProject
	);

	const { colorMode } = useColorMode();
	const colorModeTheme =
		colorMode === 'light'
			? {
					background: 'white',
			  }
			: {};

	const handleOnClick = () => {
		selProjTargets(targetsTable.selectedRowsData);
		onClose();
	};

	return (
		<Modal
			id={id}
			isOpen={isOpen}
			onClose={onClose}
			size='5xl'
			closeOnOverlayClick={false}
		>
			<ModalOverlay />
			<ModalContent backgroundColor={modalBodyColor}>
				<ModalCloseButton />
				<ModalBody mt={5} pt={5}>
					<Flex direction='column'>
						<Flex flex='1' flexDirection={'column'} justify='flex-start'>
							<Table
								columnFilters={columnFilters}
								filterOnFocus={filterOnFocus}
								filterData={unpaginatedTargets}
								pageCount={totalPages}
								pagination={pagination}
								setColumnFilters={setColumnFilters}
								setPagination={setPagination}
								{...targetsTable}
							/>
							<Button
								leftIcon={
									<Icon as={BsPlus} w='24px' h='24px' fontWeight='bold' />
								}
								marginLeft={'auto'}
								onClick={handleOnClick}
							>
								Add Selected Targets
							</Button>
						</Flex>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
