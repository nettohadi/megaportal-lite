import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export class TimezoneData {
	value: string;
	label: string;
}

export class DateTimeData {
	date: string;
	time: string;
}

export class TimezoneUtils {
	public static getCurrentTimezone(): TimezoneData {
		const guess = dayjs.tz.guess();

		const data = new TimezoneData();

		data.value = guess;
		data.label = `${guess} (GMT ${dayjs().tz(guess).format('Z')})`;

		return data;
	}

	public static getTimezones(): TimezoneData[] {
		const arr: TimezoneData[] = [];
		const names = dayjs.tz.name;

		for (const name of names) {
			if (
				(name.indexOf('/') < 0 && name !== 'UTC') ||
				name.startsWith('Etc/')
			) {
				continue;
			}

			const data = new TimezoneData();

			data.value = name;
			data.label = dayjs.tz(name).format('Z');

			arr.push(data);
		}

		arr.sort((a, b) => {
			if (a.label === b.label) {
				if (a.value === 'UTC') {
					return -1;
				}

				return a.value === b.value ? 0 : a.value > b.value ? 1 : -1;
			}

			const afc = a.label.charAt(0);
			const bfc = b.label.charAt(0);

			if (afc === '-') {
				if (bfc === '+') {
					return -1;
				}

				return a.label > b.label ? -1 : 1;
			}

			if (bfc === '-') {
				return 1;
			}

			return a.label > b.label ? 1 : -1;
		});

		arr.forEach((a) => (a.label = `${a.value} (GMT ${a.label})`));

		return arr;
	}

	public static getCurrentDateTime(
		timezone?: TimezoneData | undefined
	): DateTimeData {
		const data = new DateTimeData();

		const timezoneVal = !!timezone
			? timezone.value
			: this.getCurrentTimezone().value;

		data.date = dayjs().tz(timezoneVal).format('YYYY-MM-DD');
		data.time = dayjs().tz(timezoneVal).format('HH:mm');

		return data;
	}

	public static dateFormatWithTimezone(
		value: string,
		format: string,
		timezone?: TimezoneData | undefined
	) {
		if (!timezone) return;

		const timezoneVal = !!timezone
			? timezone.value
			: this.getCurrentTimezone().value;

		return dayjs(value).tz(timezoneVal).format(format);
	}
}
