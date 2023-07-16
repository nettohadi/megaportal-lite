import { isValid, format as formatFns } from 'date-fns';

import { StandardFormats } from './constants';

export const getDisplayDateTime =
	(format: StandardFormats) =>
	(value: string | null | undefined | Date, fallback = '-') => {
		const valueDate = typeof value === 'string' ? new Date(value) : value;
		return !!valueDate && isValid(valueDate)
			? formatFns(valueDate, format)
			: fallback;
	};
