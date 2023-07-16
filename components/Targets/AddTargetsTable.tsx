import { Center, Icon } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { MdDelete } from 'react-icons/md';


import { LinkButton } from 'components/DataTable/LinkButton';
import { DefaultCellBox, TableProps } from 'components/DataTable/Table';
import { TargetValue } from 'types/scans';

type TargetTableCallbacks = {
	onRemoveTarget: (targetData: any) => any;
};

export function useAddTargetsTable(
	data: TargetValue[],
	callbacks: TargetTableCallbacks
): TableProps<TargetValue> {
	const columnHelper = createColumnHelper<TargetValue>();

	const columns = [
		columnHelper.display({
			header: '#',
			cell: ({ row }) => <Center>{row.index + 1}</Center>,
		}),
		columnHelper.accessor('target', {
			header: 'Target',
		}),
		columnHelper.accessor('label', {
			header: 'Tag',
		}),
		columnHelper.display({
			header: 'Action',
			cell: ({ row }) => (
				<Center>
					<DefaultCellBox>
						<LinkButton onClick={() => callbacks.onRemoveTarget(row)}>
							<Icon
								as={MdDelete}
								w='24px'
								h='24px'
								fontWeight='bold'
								color='red.500'
							/>
						</LinkButton>
					</DefaultCellBox>
				</Center>
			),
		}),
	];

	return {
		columns,
		data,
		onChangeRowSelection: () =>
			console.log('setRowSelection not implemented yet'),
	};
}
