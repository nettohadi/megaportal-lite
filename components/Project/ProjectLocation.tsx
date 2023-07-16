import { Flex, Text, useColorModeValue, Box } from '@chakra-ui/react';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import { Project } from 'types/projects';

interface Props {
	project?: Project;
}

export const ProjectLocation = ({ project }: Props) => {
	const textColor = useColorModeValue('gray.700', 'white');

	return (
		<Box mb='44px' mt='16px'>
			<Card p='16px'>
				<CardHeader p='12px 5px' mb='12px'>
					<Flex mb={5} justifyContent='space-between'>
						<Text fontSize='2xl' color={textColor} fontWeight='bold'>
							Location Information
						</Text>
					</Flex>
				</CardHeader>
				<CardBody>
					<Flex mb={5} direction='column'>
						<Text fontSize='lg' color={textColor}>
							Business Address: {project?.address}
						</Text>
						<Text fontSize='lg' color={textColor}>
							Country: {project?.country}
						</Text>
						<Text fontSize='lg' color={textColor}>
							City: {project?.city}
						</Text>
						<Text fontSize='lg' color={textColor}>
							State/Province: {project?.state}
						</Text>
						<Text fontSize='lg' color={textColor}>
							Zip: {project?.zip}
						</Text>
					</Flex>
				</CardBody>
			</Card>
		</Box>
	);
};
