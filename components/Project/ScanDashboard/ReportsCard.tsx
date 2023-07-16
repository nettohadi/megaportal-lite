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
import { ScanReportSmallFragment } from 'graphql/scan-report-finding.graphql';
import { formatDate } from 'utils/date';

interface Props {
	scanReports: ScanReportSmallFragment[];
}

export function ReportsCard({ scanReports }: Props) {
	// hooks
	const router = useRouter();

	// colors
	const borderColor = useColorModeValue('gray.300', 'gray.500');
	const cardBg = useColorModeValue('#f8f8f8', 'navy.800');
	const cardTextColor = useColorModeValue('text.200', 'white');
	const cardTitleColor = useColorModeValue('text.100', 'white');
	const linkColor = useColorModeValue('brand.400', 'blue.400');
	const textColor = useColorModeValue('gray.700', 'white');

	return (
		<Card mb='2' bgColor={cardBg} borderRadius='16px'>
			<CardHeader paddingBottom='8px'>
				<Flex align='center' direction='row' justify='space-between'>
					<Link href={`${router.asPath}/reports`}>
						<ChakraLink
							fontSize='lg'
							fontWeight='bold'
							lineHeight={1.5}
							textColor={textColor}
						>
							Reports
						</ChakraLink>
					</Link>
					<Link href={`${router.asPath}/reports`}>
						<ChakraLink
							color={linkColor}
							fontSize='16px'
							lineHeight='24px'
							fontWeight='600'
						>
							View All
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
						Report
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
			<Flex
				direction='column'
				h={{ sm: '100%', md: '100%', lg: '100%' }}
				w='100%'
				gap='0.75rem'
				py='1rem'
			>
				{!scanReports?.length && (
					<Flex fontSize={'14px'} opacity={0.75}>
						<Text>No data</Text>
					</Flex>
				)}
				{scanReports?.slice(0, 5).map((report) => {
					return (
						<Flex
							direction='row'
							gap='2'
							justify='space-between'
							key={report.id}
							sx={{
								_hover: {
									backgroundColor: '',
								},
							}}
						>
							<Link href={`${router.asPath}/reports/${report.id}`} passHref>
								<Text
									as='a'
									cursor='pointer'
									flexGrow={1}
									fontSize='16px'
									lineHeight='24px'
									fontWeight='500'
									w='50%'
									color={cardTextColor}
								>
									{report.name}
								</Text>
							</Link>
							<Text
								flexBasis={'30%'}
								fontSize='16px'
								lineHeight='24px'
								fontWeight='500'
								color={cardTextColor}
								textAlign='right'
							>
								{formatDate(report.created_date)}
							</Text>
						</Flex>
					);
				})}
			</Flex>
		</Card>
	);
}
