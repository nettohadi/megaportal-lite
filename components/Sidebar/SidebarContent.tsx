import { Stack, Box } from '@chakra-ui/react';

import { Route } from 'routes';

import { SidebarBrand } from './SidebarBrand';
import { SidebarRoutes } from './SidebarRoutes';

interface SidebarContentProps {
	routes: Route[];
	isOpen: boolean;
}

export const SidebarContent = ({ routes, isOpen }: SidebarContentProps) => {
	return (
		<Box>
			<Box>
				<SidebarBrand isOpen={isOpen} />
			</Box>
			<Stack
				mt='40px'
				direction='column'
				align={'flex-start'}
				mb='180px'
				mx={{ lg: '8px', xl: '16px' }}
				alignItems={isOpen ? 'flex-start' : 'center'}
			>
				<SidebarRoutes routes={routes} isOpen={isOpen} />
			</Stack>
		</Box>
	);
};
