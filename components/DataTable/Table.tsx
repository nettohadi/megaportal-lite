import {
	Fragment,
	FunctionComponent,
	PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';

import {
	Box,
	BoxProps,
	Button,
	Flex,
	Icon,
	Select,
	useColorModeValue,
} from '@chakra-ui/react';
import {
	CellContext,
	ColumnFiltersState,
	OnChangeFn,
	PaginationState,
	RowData,
	RowSelectionState,
	SortingState,
	TableOptions,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import {
	HiChevronDoubleLeft,
	HiChevronDoubleRight,
	HiChevronLeft,
	HiChevronRight,
} from 'react-icons/hi';

import { DefaultNoDataComponent } from './DefaultNoDataComponent';
import { Filter } from './Filter';
import styles from './Table.module.css';

export type AdditionalRowDataProps<TData> = {
	data: TData;
};

export function DefaultCellBox({
	children,
	center,
	...props
}: PropsWithChildren<BoxProps & { center?: boolean }>) {
	return (
		<Box
			alignItems={center ? 'center' : undefined}
			display={'flex'}
			justifyContent={center ? 'center' : 'stretch'}
			overflowX={'hidden'}
			px='0.75rem'
			py={'0.5rem'}
			{...props}
		>
			{children}
		</Box>
	);
}

export function DefaultCell<TData extends RowData, TValue = unknown>({
	...props
}: CellContext<TData, TValue>) {
	return <DefaultCellBox>{props.renderValue() as any}</DefaultCellBox>;
}

export interface TableProps<TData = unknown, TMeta = any> {
	NoDataComponent?: FunctionComponent | JSX.Element;
	AdditionalRowData?: (props: AdditionalRowDataProps<TData>) => JSX.Element;
	columns: TableOptions<TData>['columns'];
	columnFilters?: ColumnFiltersState;
	data: TData[] | undefined;
	filterData?: TData[] | undefined;
	filterOnFocus?: () => void;
	initialSortingState?: SortingState;
	onChangeRowSelection?: OnChangeFn<RowSelectionState>;
	pagination?: PaginationState;
	rowSelection?: RowSelectionState;
	setColumnFilters?: OnChangeFn<ColumnFiltersState>;
	setPagination?: OnChangeFn<PaginationState>;
	sorting?: SortingState;
	setSorting?: OnChangeFn<SortingState>;
	useFilters?: boolean;
	viewDetails?: boolean;
	enablePagination?: boolean;
	enableShowPerPage?: boolean;
	pageItemsCount?: number;
	pageCount?: number;
	meta?: TMeta;
}

export function Table<TData extends RowData = unknown>({
	NoDataComponent = DefaultNoDataComponent,
	AdditionalRowData,
	columns,
	columnFilters,
	data,
	filterData,
	filterOnFocus,
	initialSortingState,
	onChangeRowSelection,
	pagination,
	pageCount,
	setColumnFilters,
	setPagination,
	sorting,
	setSorting,
	useFilters,
	viewDetails = false,
	enablePagination = true,
	enableShowPerPage = true,
	pageItemsCount,
	meta,
	...props
}: TableProps<TData>) {
	// state
	const [uncontrolledRowSelection, setUncontrolledRowSelection] = useState({});
	const [uncontrolledSorting, setUncontrolledSorting] = useState<SortingState>(
		[]
	);
	const [rowAdditionalData, setRowAdditionalData] = useState<string | null>(
		null
	);
	const [uncontrolledColumnFilters, setUncontrolledColumnFilters] =
		useState<ColumnFiltersState>([]);

	// colors
	const evenRowColor = useColorModeValue('#f8f8f8', '#172031');
	const rowHoverColor = useColorModeValue('#f0f0f0', '#1c2a5e');
	const oddRowColor = useColorModeValue('#ffffff', '#262e39');
	const textColor = useColorModeValue('text.200', 'gray.400');
	const tableHeaderBgColor = useColorModeValue('#e6e6e6', '#1c2a5e');

	// if there is an initial sorting state, use that
	useEffect(() => {
		if (initialSortingState) {
			setUncontrolledSorting(initialSortingState);
		}
		if (initialSortingState && setSorting) {
			setSorting(initialSortingState);
		}
	}, [initialSortingState, setSorting]);

	// use controlled row selection if it is provided
	const rowSelection = props.rowSelection ?? uncontrolledRowSelection;

	const onRowSelectionChange = useCallback<OnChangeFn<RowSelectionState>>(
		(newRowSelectionState) => {
			setUncontrolledRowSelection(newRowSelectionState);
			onChangeRowSelection?.(newRowSelectionState);
		},
		[onChangeRowSelection]
	);

	const uncontrolledPaginatedTable = useReactTable({
		data: data || [],
		columns,
		state: {
			columnFilters: uncontrolledColumnFilters,
			rowSelection: rowSelection,
			sorting: uncontrolledSorting,
		},
		getRowId: (row: TData, index) => {
			// @ts-expect-error TData type is unknown
			if (!row.id) {
				console.warn('Row id is not defined', row);
			}

			// @ts-expect-error TData type is unknown
			return row?.id || index;
		},
		enableRowSelection: true,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setUncontrolledColumnFilters,
		onRowSelectionChange: onRowSelectionChange,
		onSortingChange: setUncontrolledSorting,
		defaultColumn: {
			cell: DefaultCell,
			size: 0,
			minSize: 0,
		},
		meta: meta,
	});

	const controlledPaginatedTable = useReactTable({
		data: data || [],
		columns,
		pageCount: pageCount,
		state: {
			columnFilters: columnFilters,
			rowSelection: rowSelection,
			sorting,
			pagination,
		},
		getRowId: (row: TData, index) => {
			// @ts-expect-error TData type is unknown
			if (!row.id) {
				console.warn('Row id is not defined', row);
			}

			// @ts-expect-error TData type is unknown
			return row?.id || index;
		},
		enableRowSelection: true,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		onColumnFiltersChange: setColumnFilters,
		manualSorting: true,
		onRowSelectionChange: onRowSelectionChange,
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		defaultColumn: {
			cell: DefaultCell,
			size: 0,
			minSize: 0,
		},
		meta: meta,
		manualPagination: true,
	});

	const table = pagination
		? controlledPaginatedTable
		: uncontrolledPaginatedTable;

	const selectRowToView = useCallback(
		(id: string) => {
			if (rowAdditionalData === id) {
				setRowAdditionalData(null);
			} else {
				setRowAdditionalData(id);
			}
		},
		[rowAdditionalData]
	);

	useEffect(() => {
		if (pageItemsCount) {
			table.setPageSize(pageItemsCount);
		}
	}, [pageItemsCount, table]);

	const additionalRowDataMemorized = useMemo(() => {
		return data?.find((item) => (item as any).id === rowAdditionalData);
	}, [data, rowAdditionalData]);

	const columnsCount = table.getAllColumns().length;

	const AdditionalRowDataNode = useMemo(() => {
		const row = additionalRowDataMemorized as any;
		if (!row || !AdditionalRowData || !viewDetails) {
			return null;
		}
		return (
			<tr key={`${row.id}_additional_data`} className={styles.tableRowDetails}>
				<td key={`${row.id}_additional_data_cell`} colSpan={columnsCount}>
					<AdditionalRowData data={row} />
				</td>
			</tr>
		);
	}, [
		additionalRowDataMemorized,
		AdditionalRowData,
		columnsCount,
		viewDetails,
	]);

	const noDataNode =
		typeof NoDataComponent === 'function' ? (
			<NoDataComponent />
		) : (
			NoDataComponent
		);

	// if (!data || data.length === 0) {
	// 	if (typeof NoDataComponent === 'function') {
	// 		// this is function component
	// 		return <NoDataComponent />;
	// 	}

	// 	// this is "rendered" element (react node)
	// 	return NoDataComponent;
	// }

	const noData = !data || data.length === 0;

	// reset all applied column filters
	const clearAllFilters = () => {
		table.resetColumnFilters();
	};

	// particular filter by date
	const filterByDate = (columnName: string, value: string) => {
		const columnFilters = table.getState().columnFilters;
		table.setColumnFilters([...columnFilters, { id: columnName, value }]);
	};

	return (
		<Box>
			{useFilters && (
				<Flex
					mb='10px'
					gap='10px'
					flexDirection={['column', 'row']}
					justifyContent='flex-end'
				>
					{table.getHeaderGroups().map((headerGroup) => (
						<Fragment key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<Fragment key={header.id}>
									{header.column.getCanFilter() ? (
										<Filter
											column={header.column}
											filterData={filterData}
											filterOnFocus={filterOnFocus}
											filterByDate={filterByDate}
										/>
									) : null}
								</Fragment>
							))}
						</Fragment>
					))}
					<Button onClick={() => clearAllFilters()}>Clear</Button>
				</Flex>
			)}
			{noData ? (
				noDataNode
			) : (
				<>
					<Flex
						flex='1'
						justify='flex-start'
						maxWidth={'100%'}
						overflowX='scroll'
						ml='20px'
					>
						<table className={styles.container}>
							<thead style={{ backgroundColor: tableHeaderBgColor }}>
								{table.getHeaderGroups().map((headerGroup) => (
									<tr key={headerGroup.id}>
										{headerGroup.headers.map((header) => (
											<th
												key={header.id}
												colSpan={header.colSpan}
												style={{
													padding: '0.8rem',
													fontSize: '14px',
												}}
											>
												{header.isPlaceholder ? null : (
													<Box
														{...{
															className: header.column.getCanSort()
																? styles.selectable
																: '',
															onClick: header.column.getToggleSortingHandler(),
														}}
														display='flex'
														textAlign={
															(header.column.columnDef?.meta as any)?.center
																? 'center'
																: 'left'
														}
														alignItems='center'
														justifyContent={
															(header.column.columnDef?.meta as any)?.center
																? 'center'
																: 'flex-start'
														}
													>
														{flexRender(
															header.column.columnDef.header,
															header.getContext()
														)}
														{{
															asc: ' ▲',
															desc: ' ▼',
														}[header.column.getIsSorted() as string] ?? null}
													</Box>
												)}
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody className={styles.tableBody}>
								{table.getRowModel().rows.map((row, index) => {
									const isRowSelected = row.getIsSelected();

									return (
										<Fragment key={row.id}>
											<Box
												as='tr'
												_hover={{
													backgroundColor: rowHoverColor,
													cursor: AdditionalRowData ? 'pointer' : 'default',
												}}
												onClick={() => selectRowToView(row.id)}
												backgroundColor={
													isRowSelected
														? tableHeaderBgColor
														: index % 2 === 0
														? evenRowColor
														: oddRowColor
												}
											>
												{row.getVisibleCells().map((cell) => {
													return (
														<td
															key={cell.id}
															className={styles.tableData}
															style={{
																width:
																	cell.column.getSize() !== 0
																		? cell.column.getSize()
																		: undefined,
															}}
															color={textColor}
														>
															{flexRender(
																cell.column.columnDef.cell,
																cell.getContext()
															)}
														</td>
													);
												})}
											</Box>
											{rowAdditionalData === row.id && AdditionalRowDataNode}
											{/* {viewDetails &&
										AdditionalRowData &&
										rowAdditionalData === row.id && (
											<tr
												key={`${row.id}_additional_data`}
												className={styles.tableRowDetails}
											>
												<td
													key={`${row.id}_additional_data_cell`}
													colSpan={table.getAllColumns().length}
												>
													<AdditionalRowData data={row.original} />
												</td>
											</tr>
										)} */}
										</Fragment>
									);
								})}
							</tbody>
							<tfoot>
								{table.getFooterGroups().map((footerGroup) => (
									<tr key={footerGroup.id}>
										{footerGroup.headers.map((header) => (
											<th key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.footer,
															header.getContext()
													  )}
											</th>
										))}
									</tr>
								))}
							</tfoot>
						</table>
					</Flex>
					<Flex
						flex='1'
						justifyContent='space-between'
						mb='20px'
						mt='20px'
						ml='20px'
						// if we want to use background here might be helpful later
						// rounded={'0.5rem'}
						// px='1rem'
						// py='1rem'
					>
						<Flex>
							{enableShowPerPage && (
								<Select
									bgColor={'white'}
									cursor='pointer'
									value={table.getState().pagination.pageSize}
									onChange={(e) => {
										table.setPageSize(Number(e.target.value));
									}}
									color={textColor}
								>
									{[10, 20, 30, 40, 50].map((pageSize) => (
										<option key={pageSize} value={pageSize}>
											Show {pageSize}
										</option>
									))}
								</Select>
							)}
						</Flex>
						{enablePagination && table.getPageCount() > 1 && (
							<Flex>
								<Button
									variant='outline'
									onClick={() => table.setPageIndex(0)}
									mr='5px'
									disabled={!table.getCanPreviousPage()}
								>
									<Flex justifyContent='center' alignItems='center'>
										<Icon as={HiChevronDoubleLeft} />
									</Flex>
								</Button>
								<Button
									variant='outline'
									onClick={() => table.previousPage()}
									mr='5px'
									disabled={!table.getCanPreviousPage()}
									color={textColor}
								>
									<Flex justifyContent='center' alignItems='center'>
										<Icon as={HiChevronLeft} />
									</Flex>
								</Button>
								<Flex alignItems='center' mr='5px' ml='5px' color={textColor}>
									{table.getState().pagination.pageIndex + 1} of{' '}
									{table.getPageCount()}
								</Flex>
								<Button
									variant='outline'
									onClick={() => table.nextPage()}
									mr='5px'
									disabled={!table.getCanNextPage()}
									color={textColor}
								>
									<Flex justifyContent='center' alignItems='center'>
										<Icon as={HiChevronRight} />
									</Flex>
								</Button>
								<Button
									variant='outline'
									onClick={() => table.setPageIndex(table.getPageCount() - 1)}
									mr='5px'
									disabled={!table.getCanNextPage()}
								>
									<Flex justifyContent='center' alignItems='center'>
										<Icon as={HiChevronDoubleRight} />
									</Flex>
								</Button>
							</Flex>
						)}
					</Flex>
				</>
			)}
		</Box>
	);
}
