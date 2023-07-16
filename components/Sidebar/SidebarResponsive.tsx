import { useRef } from 'react';

import { HamburgerIcon } from '@chakra-ui/icons';
import {
	type ColorProps,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Flex,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';

import { Route } from 'routes';

import { SidebarContent } from './SidebarContent';

interface SidebarResponsiveProps {
	routes: Route[];
	colorMode?: string;
	hamburgerColor?: ColorProps['color'];
}

// mobile sidebar
export function SidebarResponsive({
	routes,
	hamburgerColor,
}: SidebarResponsiveProps) {
	const mainPanel = useRef<HTMLDivElement>(null);

	const sidebarBackgroundColor = useColorModeValue('white', 'navy.800');

	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef<SVGSVGElement>(null);

	return (
		<Flex
			display={{ sm: 'flex', lg: 'none' }}
			ref={mainPanel}
			alignItems='center'
		>
			<HamburgerIcon
				color={hamburgerColor}
				w='18px'
				h='18px'
				ref={btnRef}
				onClick={onOpen}
			/>
			<Drawer
				isOpen={isOpen}
				onClose={onClose}
				placement={'left'}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent
					w='250px'
					maxW='250px'
					ms={{
						sm: '16px',
					}}
					my={{
						sm: '16px',
					}}
					borderRadius='16px'
					bg={sidebarBackgroundColor}
				>
					<DrawerCloseButton
						_focus={{ boxShadow: 'none' }}
						_hover={{ boxShadow: 'none' }}
					/>
					<DrawerBody maxW='250px' px='1rem'>
						<SidebarContent routes={routes} isOpen={false} />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Flex>
	);
}
