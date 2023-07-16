import dayjs from 'dayjs';

export function formatDate(date?: Date) {
	if (!date) {
		return undefined;
	}
	return dayjs(date).format('MM/DD/YYYY');
}
