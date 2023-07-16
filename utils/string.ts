/**
 * Camelized given text
 * @param input input string
 * @returns Camelized version of the given string
 */
export function camelize(input: string) {
	return input.replace(
		/(?:^\w|[A-Z]|\b\w|\s+)/g,
		(match: string, index: number) => {
			if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces

			return index === 0 ? match.toLowerCase() : match.toUpperCase();
		}
	);
}

export function autoPlural(
	count: number | undefined | null,
	singularForm: string,
	pluralForm: string,
	addNumber?: boolean
) {
	if ((count ?? 0) % 10 === 1) {
		if (addNumber) {
			return `${count} ${singularForm}`;
		}
		return singularForm;
	}

	if (addNumber) {
		return `${count} ${pluralForm}`;
	}

	return pluralForm;
}

export function replaceEscapedNewLinesWithNewLines(input: string): string {
	return input
		.replace(/\\r\\n/g, `\n`)
		.replace(/\\r/g, `\n`)
		.replace(/\\n/g, `\n`);
}

export function ordinal(number: number) {
	if (number >= 4 && number <= 20) {
		return 'th';
	}

	const lastDigit = number % 10;

	if (lastDigit === 1) {
		return 'st';
	}

	if (lastDigit === 2) {
		return 'nd';
	}

	if (lastDigit === 3) {
		return 'rd';
	}

	return 'th';
}

export function withOrdinal(number: number) {
	return `${number}${ordinal(number)}`;
}
