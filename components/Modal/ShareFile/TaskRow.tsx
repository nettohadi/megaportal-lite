import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { Checkbox, Flex, Td, Text } from '@chakra-ui/react';

import { STATUS, STATUS_MAP } from 'libs/constants';

export interface TaskProps {
	taskId: string;
	title: string;
	checkedTaskIds: string[];
	setCheckedTaskIds: Dispatch<SetStateAction<string[]>>;
	onCheckboxChange: (
		event: ChangeEvent<HTMLInputElement>,
		fileId: string,
		state: string[],
		setState: Dispatch<SetStateAction<string[]>>
	) => void;
	status: STATUS | null;
	height: number;
}

export const TaskRow = ({
	taskId,
	title,
	status,
	checkedTaskIds,
	setCheckedTaskIds,
	onCheckboxChange,
	height,
}: TaskProps) => {
	const textTruncate = (title: string) => {
		const ending = '...';
		const maxLength = 30;

		if (title.length > maxLength) {
			return title.substring(0, maxLength - ending.length) + ending;
		}
		return title;
	};

	return (
		<>
			<Td height={height}>
				<Checkbox
					isChecked={checkedTaskIds.includes(taskId)}
					onChange={(e) =>
						onCheckboxChange(e, taskId, checkedTaskIds, setCheckedTaskIds)
					}
				></Checkbox>
			</Td>
			<Td display={'flex'} alignItems={'center'} height={height}>
				<Text ml={2} mr={2}>
					{textTruncate(title)}
				</Text>
			</Td>
			<Td height={height}>
				<Flex justifyContent={'flex-end'} alignItems='center' gap={2}>
					<Text fontSize='md' color='gray.400' fontWeight='400'>
						{status ? STATUS_MAP[status] : 'none'}
					</Text>
				</Flex>
			</Td>
		</>
	);
};
