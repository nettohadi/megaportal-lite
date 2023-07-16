import { useEffect, useContext, useCallback, useMemo, useState } from 'react';

import { Flex, Button, Icon, useDisclosure, useToast } from '@chakra-ui/react';
import { ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { BsTrash, BsPlus } from 'react-icons/bs';

import { Table } from 'components/DataTable/Table';
import LoadingPage from 'components/Loading/LoadingPage';
import { useLoadingProgress } from 'components/Loading/LoadingProgress';
import { PageHeading } from 'components/PageHeading';
import { AddTargetsModal } from 'components/Targets/AddTargetsModal';
import {
	TargetsTableCallbacks,
	useIndexTargetsTable,
} from 'components/Targets/IndexTargetsTable';
import { TargetCompactFragment } from 'graphql/targets.graphql';
import { useProjectContextHelpers } from 'hooks/useProjectContextHelpers';
import Admin, { AdminContext } from 'layouts/Admin';
import { PROJECT_TYPE } from 'libs/constants';
import { useProjectSmallById } from 'libs/hooks/project/useProjectSmallById';
import { useListTargetsByProjectIdQuery } from 'libs/hooks/targets/useListTargetsByProjectIdQuery';
import { useListUnpaginatedTargetsByProjectIdQuery } from 'libs/hooks/targets/useListUnpaginatedTargetsByProjectIdQuery';
import useDataLoading from 'libs/hooks/useDataLoading';
import { buildWhereFilter } from 'utils/whereFilter';

interface IProps {
	apiToken: string;
}

export const ScansTargetsPage: NextPage<IProps> = ({ apiToken }) => {
	// hooks
	const { contextValue, setContextValue } = useContext(AdminContext);
	const router = useRouter();
	const toast = useToast();
	const { start, done } = useLoadingProgress();

	const {
		isOpen: isAddTargetsModalOpen,
		onOpen: onAddTargetsModalOpen,
		onClose: onAddTargetsModalClose,
	} = useDisclosure();

	const projectId = router.query.projectId as string;

	// state
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [loadFilters, setLoadFilters] = useState(false);
	const [targets, setTargets] = useState<TargetCompactFragment[]>([]);

	const pagination = useMemo(
		() => ({
			pageIndex,
			pageSize,
		}),
		[pageIndex, pageSize]
	);

	// start loading filter data on filter focus
	const filterOnFocus = () => {
		setLoadFilters(true);
	};

	// filters
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

	const { project } = useProjectSmallById(projectId);
	const {
		targets: fetchedTargets,
		targetsAggregate,
		error,
		mutate,
	} = useListTargetsByProjectIdQuery(projectId, targetsFilters);

	const { unpaginatedTargets } = useListUnpaginatedTargetsByProjectIdQuery(
		projectId,
		loadFilters,
		targetsWhereFilter
	);

	// map over scans, trim all data after the character "T" in created_date
	// this is to remove the time from the date to make date filtering easier
	const setAndTrimTargets = (targets: any[] | undefined) => {
		const trimmedTargets = targets?.map((target) => ({
			...target,
			created_date: dayjs(target.created_date).format('YYYY-MM-DD'),
		}));

		if (trimmedTargets) {
			setTargets((prevTargets) => [...prevTargets, ...trimmedTargets]);
		}
	};

	useEffect(() => {
		setAndTrimTargets(fetchedTargets);
	}, [fetchedTargets]);

	// pagination counts
	const reportsCount = targetsAggregate?.count || 0;
	const totalPages = Math.ceil(reportsCount / pageSize);

	const pageLoading = useDataLoading(
		'TARGETS_LOADING',
		[
			{ data: targets, error },
			{ data: project, error: '' },
		],
		true
	);

	useEffect(() => {
		setContextValue({
			...contextValue,
			secondChild: {
				title: 'Targets',
				description: 'Targets',
			},
			thirdChild: undefined,
		});

		return () => {
			setContextValue({
				...contextValue,
				firstChild: undefined,
				secondChild: undefined,
				thirdChild: undefined,
			});
		};
	}, []);

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

	const { isInternalScansProject } = useProjectContextHelpers();
	const targetsTable = useIndexTargetsTable(
		targets,
		tableCallbacks,
		isInternalScansProject
	);

	const removeSelectedTargets = async () => {
    // @TODO not done
	};

	const handleCloseModal = (
		targets?: any[] | React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		onAddTargetsModalClose();
	};

	if (pageLoading) {
		return <LoadingPage />;
	}

	if (error) {
		return (
			<Flex direction='column' mt={{ sm: '150px', md: '100px' }}>
				<p>{`Error loading targets data! ${error?.message}`}</p>
			</Flex>
		);
	}

	return (
		<>
			<Head>
				<title>Targets - Mega Portal</title>
			</Head>
			<Flex direction='column'>
				<Flex justifyContent='space-between' mb='44px' mt='16px'>
					<PageHeading title='Targets' />
					<Flex columnGap='10px'>
						<Button
							variant='solid'
							data-testid='create-organization-button'
							leftIcon={
								<Icon as={BsPlus} w='24px' h='24px' fontWeight='bold' />
							}
							onClick={onAddTargetsModalOpen}
						>
							Add Target
						</Button>
						<Button
							variant='solid'
							isDisabled={!targetsTable.selectedRowsData.length}
							disabled={!targetsTable.selectedRowsData.length}
							leftIcon={
								<Icon as={BsTrash} w='18px' h='18px' fontWeight='bold' />
							}
							onClick={removeSelectedTargets}
						>
							{`Remove Targets (${targetsTable.selectedRowsData.length})`}
						</Button>
					</Flex>
				</Flex>
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
				</Flex>
			</Flex>
			<AddTargetsModal
				id='add-targets-modal'
				isOpen={isAddTargetsModalOpen}
				onClose={handleCloseModal}
				isInternal={project?.type === PROJECT_TYPE.INTERNAL_SCAN}
			/>
		</>
	);
};

export default ScansTargetsPage;

(ScansTargetsPage as any).layout = Admin;

