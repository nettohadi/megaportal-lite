import { CellContext, RowData } from '@tanstack/react-table';

import { DefaultCellBox } from './DefaultCellBox';

export function DefaultCell<TData extends RowData, TValue = unknown>({
	...props
}: CellContext<TData, TValue>) {
	return <DefaultCellBox>{props.renderValue() as any}</DefaultCellBox>;
}
