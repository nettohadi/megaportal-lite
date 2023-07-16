import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';

interface Props {
	scannerNode?: string;
}

export function ScannerNodeCard({ scannerNode }: Props) {
	// hooks
	const textColor = useColorModeValue('gray.700', 'white');
	const cardBg = useColorModeValue('#f8f8f8', 'navy.800');
	const cardTextColor = useColorModeValue('text.200', 'white');

	return (
		<>
			<Card mb='2' bgColor={cardBg} borderRadius='16px'>
				<CardHeader paddingBottom='8px'>
					<Flex align='center' direction='row' justify='space-between'>
						<Text
							fontSize='lg'
							fontWeight='bold'
							lineHeight={1.5}
							textColor={textColor}
						>
							Scanner Node
						</Text>
					</Flex>
				</CardHeader>
				<Flex direction='column' w='100%' gap='0.75rem' py='1rem'>
					<Flex
						direction='row'
						justify='space-between'
						sx={{
							_hover: {
								backgroundColor: '',
							},
						}}
						gap='2'
					>
						<Text
							// flexBasis={'30%'}
							fontSize='16px'
							lineHeight='24px'
							color={cardTextColor}
							fontWeight='500'
							textAlign='right'
						>
							{scannerNode}
						</Text>
					</Flex>
				</Flex>
			</Card>
		</>
	);
}
