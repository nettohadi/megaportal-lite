import { Box } from '@chakra-ui/react';

import { HSeparator } from 'components/Separator/Separator';
import { Route } from 'routes';

import { SidebarMenuItem } from './SidebarMenuItem';

interface SidebarRoutesProps {
	routes: Route[];
	isOpen: boolean;
}

export const SidebarRoutes = ({ routes, isOpen }: SidebarRoutesProps) => {
	return (
		<Box>
			<Box>
				{routes
					.filter(
						(route) =>
							route.path !== '/false-positives' &&
							route.path !== '/special-notes' &&
							route.path !== '/reports' &&
							route.path !== '/scans' &&
							route.path !== '/admin-settings'
					)
					.map((r) => {
						return <SidebarMenuItem key={r.path} route={r} isOpen={isOpen} />;
					})}
			</Box>
			<HSeparator />
			<Box
				width='full'
				paddingTop='12px'
				display='flex'
				flexDirection='column'
				alignItems={isOpen ? 'flex-start' : 'center'}
			>
				{routes
					.filter(
						(route) =>
							route.path === '/false-positives' ||
							route.path === '/special-notes' ||
							route.path === '/reports' ||
							route.path === '/scans' ||
							route.path === '/admin-settings'
					)
					.map((r) => {
						return <SidebarMenuItem key={r.path} route={r} isOpen={isOpen} />;
					})}
			</Box>
		</Box>
	);
};
