import axios, { AxiosResponse } from 'axios';

import {
	PresignedUrlParam,
	PresignedUrlResponse,
} from 'components/Upload/types';

const getPrivateFile = async (
	url: string,
	file?: File,
	contenType?: string
) => {
	const fileName = url.replace(
		`${process.env.NEXT_PUBLIC_SPACE_END_POINT}/${process.env.NEXT_PUBLIC_SPACE_BUCKET}/`,
		''
	);

	const params: PresignedUrlParam = {
		filename: file?.name ?? fileName,
		byte_size: file?.size as number,
		content_type: contenType as string,
	};
	return axios({
		method: 'post',
		url: '/api/get-uploaded-file',
		data: params,
	})
		.then(({ data }: AxiosResponse<PresignedUrlResponse>) => {
			return data;
		})
		.catch((error: Error) => {
			throw error;
		});
};

export const GetUploadedFile = async (
	url: string,
	file?: File,
	contenType?: string,
	callback?: (data: PresignedUrlResponse) => void,
	onError?: (err: string) => void
) => {
	let result = '';
	if (!!!url) {
		return result;
	}

	await getPrivateFile(url, file, contenType)
		.then((resp: PresignedUrlResponse) => {
			const data = resp;

			return fetch(resp.url)
				.then((res) => {
					return res.blob();
				})
				.then((blob) => {
					const hrefImg = URL.createObjectURL(blob);
					result = hrefImg;
					data.url = hrefImg;
					callback && callback(data);
				})
				.catch((error: Error) => {
					onError && onError(error.message);
				});
		})
		.catch((error: Error) => {
			onError && onError(error.message);
		});

	return result;
};
