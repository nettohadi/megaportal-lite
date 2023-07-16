import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';

interface Props {
	address: string;
	country: string;
	city: string;
	state: string;
	zip: string;
}

export function LocationCard({ address, country, city, state, zip }: Props) {
	// hooks
	const textColor = useColorModeValue('gray.700', 'white');
	const cardBg = useColorModeValue('#f8f8f8', 'navy.800');
	const cardTextColor = useColorModeValue('text.200', 'white');

	return (
		<Card mb='2' bgColor={cardBg} borderRadius='16px'>
			<CardHeader paddingBottom='8px'>
				<Flex align='center' direction='row' justify='space-between'>
					<Text
						fontSize='lg'
						fontWeight='bold'
						lineHeight={1.5}
						textColor={textColor}
					>
						Location Information
					</Text>
				</Flex>
			</CardHeader>
			<Flex direction='column' w='100%' gap='0.75rem' py='1rem'>
				<Flex
					direction='column'
					justify='space-between'
					sx={{
						_hover: {
							backgroundColor: '',
						},
					}}
					gap='2'
				>
					<Text
						fontSize='16px'
						lineHeight='24px'
						color={cardTextColor}
						fontWeight='500'
						textAlign='left'
					>
						Business Address: {address}
					</Text>
					<Text
						fontSize='16px'
						lineHeight='24px'
						color={cardTextColor}
						fontWeight='500'
						textAlign='left'
					>
						Country: {country}
					</Text>
					<Text
						fontSize='16px'
						lineHeight='24px'
						color={cardTextColor}
						fontWeight='500'
						textAlign='left'
					>
						City: {city}
					</Text>
					<Text
						fontSize='16px'
						lineHeight='24px'
						color={cardTextColor}
						fontWeight='500'
						textAlign='left'
					>
						State/Province: {state}
					</Text>

					<Text
						fontSize='16px'
						lineHeight='24px'
						color={cardTextColor}
						fontWeight='500'
						textAlign='left'
					>
						Zip: {zip}
					</Text>
				</Flex>
			</Flex>
		</Card>
	);
}
