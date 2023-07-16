import { AxiosError } from 'axios';

export function parseApiError(error: AxiosError<any>) {
	const errorMessage =
		error?.response?.data?.error ||
		error?.response?.data?.message ||
		error?.response?.data?.error?.message;

	const statusCode = error?.response?.status;

	return { errorMessage, statusCode };
}
