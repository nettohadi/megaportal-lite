import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

import Card from 'components/Card/Card';

export function HostStatusCard() {
	// hooks
	const textColor = useColorModeValue('gray.700', 'white');

	return (
		<Card mb='2'>
			<Flex direction='row' justify='space-between' w='100%'>
				<Text fontSize='lg' textColor={textColor} fontWeight='bold'>
					Host Status
				</Text>
				<Text fontSize='sm' textColor={textColor}>
					20 Hosts Failed
				</Text>
				<Text fontSize='sm' textColor={textColor}>
					20 Hosts Passed
				</Text>
			</Flex>
		</Card>
	);
}
