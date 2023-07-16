import { useCallback, useEffect, useMemo, useState } from 'react';

import type {
	AsyncCreatableProps,
	AsyncProps,
	GroupBase,
} from 'chakra-react-select';
import _ from 'lodash';

import {
	AsyncSelectFetchSearchInputs,
	AsyncSelectFetchSearchOptions,
	AsyncSelectLoadOptions,
	AsyncSelectOnChange,
	AsyncSelectSearchData,
	SearchOption,
} from 'types/form';
import { Project } from 'types/projects';

import { useProjectRouter } from './useProjectRouter';

/*************************** THIS COMPONENT IS USED IN CONJUCTION WITH THE OLD TABLE ONLY: DELETE ONCE TABLE MIGRATION IS COMPLETE ***************************/
export type BaseVariables = {
	input: string;
	projectId: Project['id'];
};

export type SortCriteria = { name: string; type: 'asc' | 'desc' } | null;

export type FetchSearchFunction<TData, TVariables extends BaseVariables> = (
	input: TVariables
) => Promise<TData[] | undefined>;

export type SelectValueHandler<TData> = (item: TData) => string;

function selectValue<TData>(
	item: TData,
	handlerOrKey: keyof TData | SelectValueHandler<TData>
) {
	if (typeof handlerOrKey === 'string') {
		const key = handlerOrKey as keyof TData;
		return item[key] as string;
	}

	const select = handlerOrKey as SelectValueHandler<TData>;
	return select(item);
}

export type UseAsyncSearchOptions<TData, TVariables extends BaseVariables> = {
	data?: TData[] | null;
	filterOptions?: SearchOption[] | null;
	fetch: FetchSearchFunction<TData, TVariables>;
	selectLabelKey: keyof TData | SelectValueHandler<TData>;
	selectValueKey: keyof TData | SelectValueHandler<TData>;
	filterLabelKey?: keyof TData | SelectValueHandler<TData>;
	sortCriteria?: { name: keyof TData; type: 'asc' | 'desc' } | null;
};

export function useAsyncSearch<TData, TVariables extends BaseVariables>(
	options: UseAsyncSearchOptions<TData, TVariables>
) {
	const router = useProjectRouter();
	const projectId = router.query.projectId as BaseVariables['projectId'];
	const {
		data,
		fetch,
		filterLabelKey,
		selectLabelKey,
		selectValueKey,
		sortCriteria,
	} = options;

	// const [sortedData, setSortedData] = useState(data ?? []);
	// const [filteredData, setFilteredData] = useState(data ?? []);
	const [searchedData, setSearchedData] = useState(data ?? []);
	const [shownData, setShownData] = useState(data ?? []);

	const [searchOption, setSearchOption] = useState<SearchOption | null>(null);
	const [filterOption, setFilterOption] = useState<SearchOption | null>(null);

	useEffect(() => {
		setShownData(data ?? []);
	}, [data]);

	useEffect(() => {
		if (sortCriteria) {
			const dataToSort = Object.assign({}, data ?? []);

			const sortIterator = (item: any) => {
				const rawIteratedData = _.get(item, sortCriteria.name);

				if (typeof rawIteratedData === 'string') {
					return rawIteratedData.toLowerCase();
				}

				return rawIteratedData;
			};

			const baseSort = _.orderBy(
				dataToSort,
				[sortIterator],
				[sortCriteria.type]
			);

			setShownData(baseSort);
		}
	}, [sortCriteria]);

	const searchData = useCallback<AsyncSelectSearchData<TData>>(
		(input) => {
			if (!projectId) {
				throw new Error('No projectId provided.');
			}

			return fetch({ input, projectId } as TVariables)
				.then((result) => result ?? [])
				.catch((err) => {
					console.log('Error fetching search options', err);
					return [];
				});
		},
		[projectId, fetch]
	);

	const defaultOptions = useMemo<SearchOption[]>(() => {
		const dataToFilter = data;

		if (!dataToFilter) {
			return [];
		}

		let resultsToReturn = dataToFilter;

		if (filterOption && filterLabelKey) {
			resultsToReturn = dataToFilter.filter(
				(dat) => selectValue(dat, filterLabelKey) === filterOption.value
			);
		}

		resultsToReturn = _.uniqBy(resultsToReturn, selectLabelKey);

		return resultsToReturn.map((item) => ({
			label: selectValue(item, selectLabelKey),
			value: selectValue(item, selectValueKey),
		}));
	}, [data, selectLabelKey, selectValueKey, filterOption, filterLabelKey]);

	const defaultFilterOptions = useMemo<SearchOption[]>(() => {
		const dataToFilter = data;

		if (!dataToFilter || !filterLabelKey) {
			return [];
		}
		let resultsToReturn = dataToFilter;

		if (searchOption && searchedData) {
			resultsToReturn = searchedData;
		}

		resultsToReturn = _.uniqBy(resultsToReturn, filterLabelKey);

		return resultsToReturn.map((item) => ({
			label: selectValue(item, filterLabelKey),
			value: selectValue(item, filterLabelKey),
		}));
	}, [data, filterLabelKey, searchOption, searchedData]);

	const fetchSearchOptions = useCallback<
		AsyncSelectFetchSearchOptions<SearchOption>
	>(
		(inputValue) => {
			return searchData(inputValue)
				.then((result) => {
					let resultsToReturn = result;

					if (filterOption && filterLabelKey) {
						resultsToReturn = result.filter(
							(dat) => selectValue(dat, filterLabelKey) === filterOption.value
						);
					}

					resultsToReturn = _.uniqBy(resultsToReturn, selectLabelKey);

					return resultsToReturn.map((item) => ({
						label: selectValue(item, selectLabelKey),
						value: selectValue(item, selectValueKey),
					}));
				})
				.catch((err) => {
					console.log('Error fetching search options', err);
					return [];
				});
		},
		[searchData, selectLabelKey, selectValueKey, filterOption, filterLabelKey]
	);
	const fetchFilterOptions = useCallback<
		AsyncSelectFetchSearchOptions<SearchOption>
	>(
		(inputValue) => {
			return searchData(inputValue)
				.then((result) => {
					if (filterLabelKey) {
						let resultsToReturn = result;

						if (searchOption && searchedData) {
							resultsToReturn = searchedData;
						}

						resultsToReturn = _.uniqBy(resultsToReturn, filterLabelKey);

						return resultsToReturn.map((item) => ({
							label: selectValue(item, filterLabelKey),
							value: selectValue(item, filterLabelKey),
						}));
					}

					return [];
				})
				.catch((err) => {
					console.log('Error fetching search options', err);
					return [];
				});
		},
		[searchData, filterLabelKey, searchOption, searchedData]
	);

	const fetchSearchInputs = useCallback<AsyncSelectFetchSearchInputs<TData>>(
		(inputValue) => {
			return searchData(inputValue).then((searchedData) => {
				if (!searchedData || searchedData.length === 0) {
					setSearchedData([]);
					return [];
				}

				if (filterOption && filterLabelKey) {
					searchedData = searchedData.filter(
						(dat) => selectValue(dat, filterLabelKey) === filterOption.value
					);
				}

				setSearchedData(searchedData);
				setShownData(searchedData);

				return searchedData;
			});
		},
		[searchData]
	);

	const loadOptions = useCallback<AsyncSelectLoadOptions>(
		(inputValue) => fetchSearchOptions(inputValue),
		[fetchSearchOptions]
	);
	const loadFilterOptions = useCallback<AsyncSelectLoadOptions>(
		(inputValue) => fetchFilterOptions(inputValue),
		[fetchFilterOptions]
	);

	const searchSelect = useCallback<AsyncSelectOnChange>(
		(option) => {
			const dataToFilter = data ?? [];

			setSearchOption(option);

			if (option) {
				return fetchSearchInputs(option.label);
			} else if (filterOption) {
				filterSelect(filterOption, {
					action: 'select-option',
					option: filterOption,
				});
			} else {
				setSearchedData(dataToFilter);
				setShownData(dataToFilter);
			}
		},
		[data, fetchSearchInputs, filterOption]
	);
	const filterSelect = useCallback<AsyncSelectOnChange>(
		(option) => {
			const dataToFilter = searchOption ? shownData : data ?? [];

			if (dataToFilter) {
				let endData = [...dataToFilter];

				setFilterOption(option);

				if (option && filterLabelKey) {
					endData = dataToFilter.filter(
						(dat) => selectValue(dat, filterLabelKey) === option.value
					);
				} else if (searchOption) {
					return searchSelect(searchOption, {
						action: 'select-option',
						option: searchOption,
					});
				}

				// setFilteredData(endData);
				setShownData(endData);
			}
		},
		[data, filterLabelKey, searchOption, shownData]
	);

	const formatCreateLabel = useCallback((inputValue: string) => inputValue, []);

	const searchProps = useMemo<
		Partial<AsyncCreatableProps<SearchOption, false, GroupBase<SearchOption>>>
	>(
		() => ({
			defaultOptions,
			formatCreateLabel,
			loadOptions,
			onChange: searchSelect,
			value: searchOption,
		}),

		[defaultOptions, formatCreateLabel, loadOptions, searchSelect, searchOption]
	);

	const filterProps = useMemo<
		Partial<AsyncProps<SearchOption, false, GroupBase<SearchOption>>>
	>(
		() => ({
			defaultOptions: defaultFilterOptions,
			loadOptions: loadFilterOptions,
			onChange: filterSelect,
			value: filterOption,
		}),
		[filterSelect, filterOption, defaultFilterOptions, loadFilterOptions]
	);

	return {
		asyncCreatableProps: searchProps,
		defaultOptions,
		fetchSearchInputs,
		fetchSearchOptions,
		filterProps,
		loadOptions,
		searchData,
		searchOption,
		searchSelect,
		shownData,
	};
}
