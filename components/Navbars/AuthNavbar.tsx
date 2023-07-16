import {
	Box,
	Button,
	Flex,
	HStack,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';

import { ArgonLogoLight } from 'components/Icons/Icons';
import { SidebarResponsive } from 'components/Sidebar/SidebarResponsive';
import routes from 'routes';

interface Props {
	logo?: string;
	logoText?: string;
	secondary: any;
}

export default function AuthNavbar({
	logo,
	logoText,
	secondary,
	...rest
}: Props) {
	const navbarIcon = 'white';
	const navbarBg = 'none';
	const navbarBorder = 'none';
	const navbarShadow = 'initial';
	const navbarFilter = 'initial';
	const navbarBackdrop = 'none';
	const navbarPosition = 'absolute';
	const hamburgerColor = {
		base: useColorModeValue('gray.700', 'white'),
		md: 'white',
	};

	const linksAuth = (
		<HStack display={{ sm: 'none', lg: 'flex' }}>
			<Link href='/'>
				<a>
					<Button
						fontSize='sm'
						ms='0px'
						px='0px'
						me={{ sm: '2px', md: '16px' }}
						color={navbarIcon}
						variant='no-effects'
					>
						<Text>Managed Security</Text>
					</Button>
				</a>
			</Link>
			<Link href='/'>
				<a>
					<Button
						fontSize='sm'
						ms='0px'
						px='0px'
						me={{ sm: '2px', md: '16px' }}
						color={navbarIcon}
						variant='no-effects'
					>
						<Text>Compliance</Text>
					</Button>
				</a>
			</Link>
			<Link href='/'>
				<a>
					<Button
						fontSize='sm'
						ms='0px'
						px='0px'
						me={{ sm: '2px', md: '16px' }}
						color={navbarIcon}
						variant='no-effects'
					>
						<Text>Security Testing</Text>
					</Button>
				</a>
			</Link>
			<Link href='/'>
				<a>
					<Button
						fontSize='sm'
						ms='0px'
						px='0px'
						me={{ sm: '2px', md: '16px' }}
						color={navbarIcon}
						variant='no-effects'
					>
						<Text>Consulting</Text>
					</Button>
				</a>
			</Link>
			<Link href='/'>
				<a>
					<Button
						fontSize='sm'
						ms='0px'
						px='0px'
						me={{ sm: '2px', md: '16px' }}
						color={navbarIcon}
						variant='no-effects'
					>
						<Text>Company Info</Text>
					</Button>
				</a>
			</Link>
		</HStack>
	);

	return (
		<Flex
			position={navbarPosition}
			top='16px'
			left='50%'
			transform='translate(-50%, 0px)'
			background={navbarBg}
			border={navbarBorder}
			boxShadow={navbarShadow}
			filter={navbarFilter}
			backdropFilter={navbarBackdrop}
			borderRadius='15px'
			px='16px'
			py='22px'
			mx='auto'
			width='1044px'
			maxW='90%'
			alignItems='center'
			zIndex='3'
		>
			<Flex w='100%' justifyContent={{ sm: 'start', lg: 'space-between' }}>
				<Link href='/'>
					<a>
						<Stack
							direction='row'
							spacing='12px'
							align='center'
							justify='center'
						>
							<ArgonLogoLight w='74px' h='27px' />
						</Stack>
						<Text fontSize='sm' mt='3px'>
							{logoText}
						</Text>
					</a>
				</Link>
				<Box
					ms={{ base: 'auto', lg: '0px' }}
					display={{ base: 'flex', lg: 'none' }}
				>
					<SidebarResponsive
						hamburgerColor={hamburgerColor}
						routes={routes}
						{...rest}
					/>
				</Box>
				{linksAuth}
			</Flex>
		</Flex>
	);
}
