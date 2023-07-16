import { useState, useEffect } from 'react';

import { useLoadingProgress } from 'components/Loading/LoadingProgress';

type Input = { data: any; error: any }[];

const getIsLoading = (input: Input) => {
	const mappedResults: boolean[] = input.map(({ data, error }) => {
		return !!data || !!error;
	});
	const isLoading = mappedResults.includes(false);

	return isLoading;
};

/**
 * Delays SWR data and error for five seconds to test loading state.
 * @param {Array} data
 * @returns {Object} {data, error}
 */
function useDataLoading(name: string, input: Input, clearEvents?: boolean) {
	const [result, setResult] = useState(getIsLoading(input));
	const { start, done, loading } = useLoadingProgress();

	useEffect(() => {
		if (!loading && result) {
			start({ name, type: 1 });
		} else if (!result) {
			if (clearEvents) {
				done();
			} else {
				done({ name, type: 1 });
			}
		}
	}, []);

	useEffect(() => {
		const isLoading = getIsLoading(input);

		setResult((prevResult) => {
			if (prevResult !== isLoading) {
				if (isLoading) {
					start({ name, type: 1 });
				} else {
					if (clearEvents) {
						done();
					} else {
						done({ name, type: 1 });
					}
				}
			}

			return isLoading;
		});
	}, [input]);

	return result;
}

export default useDataLoading;
