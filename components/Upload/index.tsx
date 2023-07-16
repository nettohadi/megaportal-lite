import React, { FC, PropsWithChildren, useState } from 'react';

import {
	Flex,
	type FlexProps,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { type FileWithPath, fromEvent } from 'file-selector';

import { IMAGE_FILE_EXTENSIONS } from './constants';
import { InputUploadStyled } from './styles';
import { PresignedUrlParam } from './types';

type Props = FlexProps & {
	dragDrop?: boolean;
	accept?: string;
	multiple?: boolean;
	allowTypes?: string[];

	onUploadSuccess: (file: File, signedId: string) => void;
};

const Upload: FC<PropsWithChildren<Props>> = ({
	children,
	accept = 'image/*',
	multiple,
	allowTypes = IMAGE_FILE_EXTENSIONS,
	onUploadSuccess,
	...otherProps
}) => {
	const [, setProgress] = useState<number>();
	const toast = useToast();

	const bg = useColorModeValue('gray.100', 'navy.700');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			Promise.resolve(fromEvent(event)).then(
				(newFiles: (FileWithPath | DataTransferItem)[]) => {
					newFiles?.[0] && requestUpload(newFiles[0] as File);
				}
			);
		}
	};

	const requestUpload = async (file: File) => {
		const params: PresignedUrlParam = {
			filename: file.name,
			byte_size: file.size,
			content_type: file.type,
		};

		try {
			const { data } = await axios({
				method: 'post',
				url: '/api/file-upload',
				data: params,
			});
			const { url, headers, originalSource } = data;
			const response = await axios({
				method: 'put',
				url,
				headers,
				data: file,
				onUploadProgress: (progressEvent: ProgressEvent) => {
					const { loaded, total } = progressEvent;
					const percentage = Math.floor((loaded / total) * 100);
					setProgress(percentage);
				},
			});
			if (response.status === 200) {
				if (onUploadSuccess) {
					onUploadSuccess(file, originalSource);
				}
			}
		} catch (error: any) {
			error?.message &&
				toast({
					status: 'error',
					title: error?.message,
					position: 'bottom-left',
				});
		}
	};

	return (
		<Flex
			position='relative'
			width='100%'
			w='100%'
			h='max-content'
			minH='100%'
			bg={bg}
			{...otherProps}
		>
			<InputUploadStyled
				position='absolute'
				top='0'
				left='0'
				opacity='0'
				type='file'
				multiple={multiple}
				onChange={handleChange}
				cursor={'pointer'}
				accept={accept}
				height='100%'
			/>
			{children}
		</Flex>
	);
};

export default Upload;
