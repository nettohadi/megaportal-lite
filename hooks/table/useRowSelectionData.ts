import { RowSelectionState } from '@tanstack/react-table';

function isDefined<T>(argument: T | undefined): argument is T {
	return argument !== undefined;
}

export function useRowSelectionData<T>(
	data: T[] | undefined,
	rowSelectionState: RowSelectionState,
	identifier: string & keyof T
): T[] {
	if (!rowSelectionState || !data || !identifier) {
		return [];
	}

	const findDataWithSelectedID = (id: string) =>
		data.find((item) => item[identifier] === id);

	const selectedIds = Object.keys(rowSelectionState).filter(
		(key) => rowSelectionState[key] === true
	);
	const selectedData = selectedIds
		.map(findDataWithSelectedID)
		.filter(isDefined);

	return selectedData;
}
