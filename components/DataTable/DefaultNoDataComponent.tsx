import { Box, calc, Flex, Text, useColorModeValue } from '@chakra-ui/react';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';

export function DefaultNoDataComponent() {
	const cardBgColor = useColorModeValue('#f8f8f8', 'navy.800');
	const textColor = useColorModeValue('gray.700', 'white');

	return (
		<Card
			textAlign='center'
			backgroundColor={cardBgColor}
			justifyContent='center'
			height={{ sm: '50vh', xl: '70vh' }}
			width='auto'
			mx='20px'
		>
			<CardHeader>
				<Text fontSize='16px' textColor={textColor} fontWeight='500'>
					No data to display
				</Text>
			</CardHeader>
			<Box as='hr' my='2.5' />
			<CardBody>
				<Flex direction='column'>
					<Text color='gray.400' fontSize='16px' fontWeight='24px'>
						No results found.
					</Text>
				</Flex>
			</CardBody>
		</Card>
	);
}
