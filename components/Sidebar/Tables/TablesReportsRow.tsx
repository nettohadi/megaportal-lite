import {
	Avatar,
	Button,
	Flex,
	Td,
	Text,
	Tr,
	useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  paddingY?: string;
}


function TablesReportsRow({
	firstName,
	lastName,
	email,
	id,
	paddingY
}: Props) {
	const borderColor = useColorModeValue('gray.200', 'gray.600');
	const textColor = useColorModeValue('gray.700', 'white');
	const secondaryColor = useColorModeValue('gray.400', 'white');

	return (
		<Tr border="none">
			<Td
				borderColor={borderColor}
				minW={{ sm: '220px', xl: '180px', '2xl': '220px' }}
				ps="0px"
				px={{ xl: '2px', '2xl': '20px' }}
			>
				<Flex
					align="center"
					py={paddingY ? paddingY : '.8rem'}
					minWidth="100%"
					flexWrap="nowrap"
				>
					<Avatar
						src=""
						borderRadius="12px"
						me={{ sm: '18px', xl: '6px', '2xl': '18px' }}
					/>
					<Text
						fontSize={{ sm: 'md', xl: 'sm', '2xl': 'md' }}
						color={textColor}
						fontWeight="bold"
						minWidth="100%"
					>
						{`${firstName} ${lastName}`}
					</Text>
				</Flex>
			</Td>
			<Td
				borderColor={borderColor}
				minW={{ sm: '200px', lg: '170px' }}
				px={{ xl: '2px', '2xl': '20px' }}
			>
				<Text
					fontSize={{ sm: 'md', xl: 'sm', '2xl': 'md' }}
					color={secondaryColor}
					fontWeight="normal"
					pb=".5rem"
				>
					{email}
				</Text>
			</Td>
			<Td
				borderColor={borderColor}
				minW={{ sm: '150px', lg: '170px' }}
				px={{ xl: '2px', '2xl': '20px' }}
			>
				<Text
					fontSize={{ sm: 'md', xl: 'sm', '2xl': 'md' }}
					color={secondaryColor}
					fontWeight="normal"
					pb=".5rem"
				>
					{id}
				</Text>
			</Td>
			<Td>
				<Link href={`/admin/team-members/${id}`}>
					<a>
						<Button variant="outlined" w="70px">
              View
						</Button>
					</a>
				</Link>
			</Td>
		</Tr>
	);
}

export default TablesReportsRow;
