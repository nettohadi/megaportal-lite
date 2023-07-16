import * as React from 'react';

import {
	// eslint-disable-next-line import/named
	FlexProps,
	Flex,
	Text,
	useToast,
} from '@chakra-ui/react';
import Papa from 'papaparse';
import { useDropzone } from 'react-dropzone';

import { User } from 'types/user';

export type FileStatus = 'idle' | 'start' | 'success' | 'error';

export interface FileState {
	status: FileStatus;
	file?: File;
	errorMessage?: string;
	originalSource?: string;
	id?: string;
	uploader?: User;
	uploadedDate?: Date;
	fileName?: string;
}
interface UploadFilesProps extends FlexProps {
	onChangeFiles: (arg0: any[]) => void;
	disabledEdit?: boolean;
	isDisabled?: boolean;
}
export const CustomDragDrop = ({
	onChangeFiles = console.log,
	disabledEdit,
	isDisabled,
	...otherProps
}: UploadFilesProps) => {
	const toast = useToast();
	const onDrop = React.useCallback(
		(files: File[]) => {
			// TODO: Reject bad files and files with bad headers and avoid duplicates
			/*
		const formattedFiles = files.map((file) => {
			return {
				name: file.name,
				lastModified: file.lastModified,
				size: file.size,
			};
		});
		setFiles(formattedFiles);
		const filesData = [];
		if (!result) {
				toast({
					title: 'Sorry! Something went wrong',
					position: 'bottom-left',
					isClosable: true,
					status: 'error',
				});
			}
		*/

			Promise.all(
				[...files].map(
					(file) =>
						new Promise((resolve, reject) =>
							Papa.parse(file, {
								header: true,
								complete: (results) => resolve(results.data), // Resolve each promise
								error: reject,
							})
						)
				)
			)
				.then((results: any[]) => {
					const combinedResults = [].concat(...results);
					const filteredResults: any[] = combinedResults
						.filter((result: any) => result.target)
						?.map((item) =>
							item
								? Object.keys(item).reduce(
										(newItem, key) => ({
											...newItem,
											[key.trim()]: (item[key] as string)?.trim
												? (item[key] as string).trim()
												: item[key],
										}),
										{}
								  )
								: item
						);

					if (filteredResults.length && filteredResults.length > 0) {
						onChangeFiles(filteredResults); // now since .then() excutes after all promises are resolved, filesData contains all the parsed files.
					} else {
						toast({
							title:
								'Could not import files, please ensure csv file has headers "targets" and "label"',
							position: 'bottom-left',
							isClosable: true,
							status: 'error',
						});
					}
				})
				.catch((err) => {
					toast({
						title: 'Sorry! Something went wrong',
						position: 'bottom-left',
						isClosable: true,
						status: 'error',
					});
				});
		},
		[toast, onChangeFiles]
	);

	// Check Mime Type for more details
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
	const accept = {
		'text/csv': ['.csv'],
	};

	const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
		onDrop,
		accept,
		noClick: true,
	});

	return (
		<>
			<Flex
				width={'100%'}
				height={'auto'}
				{...otherProps}
				flexDirection={'column'}
				{...getRootProps()}
				borderWidth={2}
				borderColor={'rgb(102} 102} 102)'}
				borderStyle={'dashed'}
				borderRadius={5}
				p={5}
				position={'relative'}
				cursor='pointer'
			>
				<input {...getInputProps()} disabled={isDisabled} />

				<Flex
					justifyContent={'center'}
					alignItems={'center'}
					flexDirection={'column'}
					m='10px'
					onClick={!disabledEdit ? open : undefined}
				>
					<Text textAlign={'center'} fontSize={'md'}>
						{isDragActive
							? 'Drop the files here ...'
							: 'Drop files here or click here to select a list of targets to add...'}
					</Text>
				</Flex>
			</Flex>
		</>
	);
};

export default CustomDragDrop;
