import { Button, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';

import { Project } from 'types/projects';

interface ProjectPhasesProps {
	project: Project;
}

export function ProjectPhases({ project }: ProjectPhasesProps) {
	// colors
	const greenColor = useColorModeValue('green.300', 'blue.300');
	const grayColor = useColorModeValue('white', 'gray.500');
	const borderColor = useColorModeValue('blackAlpha.700', 'gray.200');
	const cardBgColor = useColorModeValue('#f8f8f8', 'navy.800');
	const cardTextColor = useColorModeValue('text.200', 'white');

	return (
		<Flex
			direction='column'
			bgColor={cardBgColor}
			borderRadius='16px'
			height='120px'
			gap='12px'
			mx='20px'
			mb='20px'
		>
			<Stack
				direction='row'
				justify='space-between'
				mb='1'
				width='auto'
				mx='20px'
				my='12px'
			>
				<Text fontSize='sm' fontWeight='semibold' color={cardTextColor}>
					PROJECT PHASES
				</Text>
				<Text fontSize='sm' fontWeight='semibold' color={cardTextColor}>
					{project?.phase}/{project?.phases} PHASES COMPLETED
				</Text>
			</Stack>
			<Flex
				me='10px'
				width='auto'
				justifyContent='stretch'
				height='24px'
				borderRadius='10px'
				mx='20px'
				title={`${project?.phase} / ${project?.phases} Phase Completed`}
			>
				{Array.from({ length: project?.phases }).map((_, i, array) => (
					<Button
						key={i}
						variant='no-effects'
						flex='1'
						h='40px'
						fontSize='xs'
						bg={i < project?.phase ? greenColor : grayColor}
						borderRightRadius={i == array.length - 1 ? '8px' : '0'}
						borderLeftRadius={i == 0 ? '8px' : '0'}
						borderRightColor={borderColor}
						borderRightWidth={i < array.length - 1 ? '2px' : '0'}
					/>
				))}
			</Flex>
		</Flex>
	);
}
