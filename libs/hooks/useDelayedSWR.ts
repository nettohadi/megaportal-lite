import { useState, useEffect } from 'react';

type Return = {
	data: any;
	error: any;
};

/**
 * Delays SWR data and error for five seconds to test loading state.
 * @param {any} data
 * @param {any} error
 * @returns
 */
function useDelayedSWR(data: any, error: any): Return {
	const [result, setResult] = useState({ data: null, error: null });

	useEffect(() => {
		const timer1 = setTimeout(() => setResult({ data, error }), 1000);

		return () => {
			clearTimeout(timer1);
		};
	}, [data, error]);

	return result;
}

export default useDelayedSWR;
