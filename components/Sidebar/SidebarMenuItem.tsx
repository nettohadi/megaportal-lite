import { FC, useMemo } from 'react';

import { Box, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { GET_PROJECT_QUERY } from 'graphql/projects.graphql';
import { fetchData } from 'libs';
import { Route } from 'routes';
import { variantChange } from 'theme/transition';

import { SidebarChildRoute } from './SidebarChildRoute';
import { SidebarMenuButton } from './SidebarMenuButton';

export interface SidebarMenuItemProps {
	route: Route;
	isOpen: boolean;
}

export const SidebarMenuItem: FC<SidebarMenuItemProps> = (props) => {
	const { route, isOpen } = props;
	const { pathname, query } = useRouter();

	const { data } = useSWR(
		query.projectId
			? [
					GET_PROJECT_QUERY,
					{
						id: query.projectId,
					},
			  ]
			: null,
		fetchData
	);

	// verifies if routeName is the one active (in browser input)
	const isActive = useMemo(() => {
		return pathname.indexOf(route.layout + route.path) !== -1;
	}, [pathname, route]);

	const isShowSub = useMemo(() => {
		return !!query.projectId;
	}, [query]);

	const activeChildRoute = useMemo(() => {
		if (route.path === '/projects') {
			return route.childRoutes?.find((childRoute) =>
				pathname.includes(childRoute.path)
			);
		}

		return route.childRoutes?.find(
			(childRoute) =>
				pathname.indexOf(route.layout + route.path + childRoute.path) !== -1
		);
	}, [pathname, route]);

	const hasChildRoutes = (route.childRoutes?.length ?? 0) > 0;
	const projectIndexRouteIsActive =
		route.path === '/projects' && pathname === '/admin/projects/[projectId]';

	return (
		<Box
			sx={{
				transition: variantChange,
				borderRadius: '15px',
				_hover: {
					boxShadow: '0px 7px 11px rgba(0, 0, 0, 0.04)',
				},
				_active: {
					boxShadow: '0px 7px 11px rgba(0, 0, 0, 0.04)',
				},
			}}
		>
			<Link key={route.path} href={route.layout + route.path} passHref>
				<SidebarMenuButton
					isActive={isActive && !activeChildRoute && !projectIndexRouteIsActive}
					hasActiveChildRoute={!!activeChildRoute || projectIndexRouteIsActive}
					name={route.name}
					icon={route.icon}
					isOpen={isOpen}
				/>
			</Link>
			{hasChildRoutes && isActive && isShowSub ? (
				<Box w='full' py='1.5' pl='5' display={isOpen ? 'flex' : 'none'}>
					<Stack>
						<Link
							key='project_item'
							href={route.layout + route.path + '/' + query?.projectId}
							passHref
						>
							<SidebarChildRoute
								key='project_item'
								active={projectIndexRouteIsActive}
								route={{
									// for now we use hard-coded menu item name
									// name: data?.project?.name,
									name: 'Project Summary',
									path: '/',
								}}
							/>
						</Link>
						{route.childRoutes
							?.filter((childRoute) =>
								childRoute?.projectType?.includes(data?.project?.type)
							)
							?.map((childRoute) => {
								const active = activeChildRoute?.path === childRoute.path;

								return (
									<Link
										key={childRoute.path}
										href={
											route.layout +
											route.path +
											'/' +
											query?.projectId +
											childRoute.path
										}
										passHref
									>
										<SidebarChildRoute
											key={childRoute.path}
											route={childRoute}
											active={active}
										/>
									</Link>
								);
							})}
					</Stack>
				</Box>
			) : null}
		</Box>
	);
};

export default SidebarMenuItem;
