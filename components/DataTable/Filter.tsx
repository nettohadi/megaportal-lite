import { useMemo, useState } from 'react';

import { Flex } from '@chakra-ui/react';
import { Column } from '@tanstack/react-table';
import { Select } from 'chakra-react-select';
import dayjs from 'dayjs';
import { uniqBy } from 'lodash';

interface FiltersProps {
	column: Column<any, unknown>;
	filterData?: any;
	filterOnFocus?: () => void;
	filterByDate?: (columnName: string, value: string) => void;
}

export function Filter({
	column,
	filterData,
	filterOnFocus,
	filterByDate,
}: FiltersProps) {
	const [selectedDateValue, setSelectedDateValue] = useState('');

	const facetedUniqueValues = column.getFacetedUniqueValues();
	const columnId = column.id;

	// map over filter data and return values that match the column id, then remove duplicates
	const filterValues = filterData
		?.map((item: any) => {
			// can log out columnId and item here if you need to see dynamic column names
			return item[columnId];
		})
		.filter((value: any, index: any, self: any) => {
			return self.indexOf(value) === index;
		});

	const isValidDate = (dateString: any) => {
		return typeof dateString === 'string' && dayjs(dateString).isValid();
	};

	const formatValue = useMemo(() => {
		return (value: any) => {
			if (isValidDate(value) && columnId?.includes('date')) {
				return dayjs(value).format('M/DD/YYYY');
			} else {
				// capitalize first letter
				if (typeof value === 'string') {
					value = value.charAt(0).toUpperCase() + value.slice(1);

					// remove underscores
					value = value.replace(/_/g, ' ');

					// trim value to 100 characters max
					if (value.length > 100) {
						return value.substring(0, 100) + '...';
					}

					return value;
				}
				if (typeof value === 'number') {
					return value;
				}
			}
		};
	}, [columnId]);

	const sortedUniqueValues = useMemo(() => {
		const data = Array.from(
			filterData ? filterValues : facetedUniqueValues.keys()
		)
			.filter((value) => {
				return value !== null && value !== undefined && value !== '';
			})
			.sort()
			.map((value) => ({
				value: value,
				label: formatValue(value),
			}));

		// return data;
		return uniqBy(data, 'label');
	}, [filterData, filterValues, facetedUniqueValues, formatValue]);

	const handleChange = (event: any) => {
		if (
			isValidDate(event.value) &&
			filterByDate &&
			columnId?.includes('date')
		) {
			setSelectedDateValue(dayjs(event.value).format('DD/MM/YYYY'));
			return filterByDate(column.id, dayjs(event.value).format('YYYY-MM-DD'));
		}

		return column.setFilterValue(event?.value.toString());
	};

	return (
		<Flex direction='column'>
			<Select
				options={sortedUniqueValues}
				placeholder={(column.columnDef.header as string) ?? ''}
				onChange={handleChange}
				useBasicStyles
				onFocus={filterOnFocus}
				chakraStyles={{
					container: (provided) => ({
						...provided,
						width: '100%',
						maxWidth: '300px',
					}),
					menuList: (provided) => ({
						...provided,
						minWidth: '210px',
					}),
				}}
				value={
					column.getFilterValue()
						? {
								label: columnId?.includes('date')
									? selectedDateValue
									: formatValue(column.getFilterValue()),
								value: column.getFilterValue(),
						  }
						: null
				}
			/>
		</Flex>
	);
}
