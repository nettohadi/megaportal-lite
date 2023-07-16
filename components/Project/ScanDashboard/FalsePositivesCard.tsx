import {
	Flex,
	Link as ChakraLink,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import { FalsePositiveDetailsFragment } from 'graphql/false-positives.graphql';
import { formatDate } from 'utils/date';

interface Props {
	falsePositives: FalsePositiveDetailsFragment[];
}

export function FalsePositivesCard({ falsePositives }: Props) {
	// hooks
	const borderColor = useColorModeValue('gray.300', 'gray.500');
	const linkColor = useColorModeValue('brand.400', 'blue.400');
	const router = useRouter();
	const textColor = useColorModeValue('gray.700', 'white');
	const cardBg = useColorModeValue('#f8f8f8', 'navy.800');
	const cardTitleColor = useColorModeValue('text.100', 'white');
	const cardTextColor = useColorModeValue('text.200', 'white');

	return (
		<Card bgColor={cardBg} borderRadius='16px'>
			<CardHeader paddingBottom='8px'>
				<Flex align='center' direction='row' justify='space-between'>
					<Link href={`${router.asPath}/false-positives`} passHref>
						<ChakraLink
							fontSize='lg'
							fontWeight='bold'
							lineHeight={1.5}
							textColor={textColor}
						>
							False Positive Requests
						</ChakraLink>
					</Link>
					<Link href={`${router.asPath}/false-positives`} passHref>
						<ChakraLink
							color={linkColor}
							fontSize='16px'
							lineHeight='24px'
							fontWeight='600'
						>
							View all
						</ChakraLink>
					</Link>
				</Flex>
			</CardHeader>
			<CardHeader
				borderBottom='1px'
				borderColor={borderColor}
				paddingBottom='12px'
				mt='24px'
			>
				<Flex align='center' direction='row' justify='space-between'>
					<Text
						fontSize='16px'
						fontWeight='500'
						lineHeight='24px'
						textColor={cardTitleColor}
					>
						Name
					</Text>
					<Text
						fontSize='16px'
						fontWeight='500'
						lineHeight='24px'
						textColor={cardTitleColor}
					>
						Date
					</Text>
				</Flex>
			</CardHeader>
			<Flex direction='column' w='100%' gap='0.75rem' py='1rem'>
				{!falsePositives?.length && (
					<Flex fontSize={'14px'} opacity={0.75}>
						<Text>No data</Text>
					</Flex>
				)}
				{falsePositives
					?.slice(0, 5)
					.map(({ id, vulnerability, date_reported }) => (
						<Flex
							direction='row'
							justify='space-between'
							key={id}
							sx={{
								_hover: {
									backgroundColor: '',
								},
							}}
							gap='2'
						>
							<Link href={`${router.asPath}/false-positives/${id}}`} passHref>
								<Text
									as='a'
									cursor='pointer'
									flexGrow={1}
									fontSize='16px'
									lineHeight='24px'
									color={cardTextColor}
									fontWeight='500'
									textOverflow={'ellipsis'}
									w='50%'
								>
									{vulnerability.name}
								</Text>
							</Link>
							<Text
								flexBasis={'30%'}
								fontSize='16px'
								lineHeight='24px'
								color={cardTextColor}
								fontWeight='500'
								textAlign='right'
							>
								{formatDate(date_reported)}
							</Text>
						</Flex>
					))}
			</Flex>
		</Card>
	);
}
