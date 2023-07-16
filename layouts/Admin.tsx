import { createContext, useEffect, useMemo, useRef, useState } from 'react';

import { Box, useDisclosure } from '@chakra-ui/react';
import { datadogRum } from '@datadog/browser-rum';
import _ from 'lodash';
import { useRouter } from 'next/router';

import { useLoadingProgress } from 'components/Loading/LoadingProgress';
import AdminNavbar from 'components/Navbars/AdminNavbar';
import Sidebar from 'components/Sidebar/Sidebar';
import { IProjectContext, ProjectContext } from 'context/project-context';
import { useGetDetailUser } from 'hooks/useGetDetailUser';
import { ROLE_ID } from 'libs/constants';
import { useProjectSmallById } from 'libs/hooks/project/useProjectSmallById';
import routes, { Route } from 'routes';

import MainPanel from '../components/Layout/MainPanel';
import PanelContainer from '../components/Layout/PanelContainer';
import PanelContent from '../components/Layout/PanelContent';
import Zendesk from '../utils/zendeskConfig';

interface Props {
	children: React.ReactNode;
}
interface IChild {
	title?: string;
	description?: string;
	router?: string;
}

const initialValues = {
	firstChild: undefined as IChild | undefined,
	secondChild: undefined as IChild | undefined,
	thirdChild: undefined as IChild | undefined,
	fourthChild: undefined as IChild | undefined,
	fifthChild: undefined as IChild | undefined,
	ipLimits: 0 as number | undefined,
};

export const AdminContext = createContext({
	contextValue: initialValues,
	setContextValue: async (contextValue: typeof initialValues) => null,
});

const SUPER_ADMIN_ROUTES = [
	'/form-field-templates',
	'/special-notes',
	'/false-positives',
	'/reports',
	'/scans',
	'/admin-settings',
];

export default function Dashboard({ children, ...rest }: Props) {
	// hooks
	const router = useRouter();
	const { start } = useLoadingProgress();
	const currentRouteRef = useRef(router.pathname);

	const [contextValue, setContextValue] = useState(initialValues);

	const allRoutes: Partial<Route>[] = [
		...routes,
	];

	useEffect(() => {
		router.events.on('routeChangeStart', (url) => {
			if (url !== currentRouteRef.current) {
				currentRouteRef.current = url;
				start({ name: 'ROUTE_CHANGE', type: 0 });
			}
		});

		return () => {
			router.events.off('routeChangeStart', () => {
				/* do nothing */
			});
		};
	}, [router.events, start]);

	// eslint-disable-next-line @typescript-eslint/ban-types
	const getActiveRoute: Function = (routes: any) => {
		const activeRoute = 'Megaplan IT';
		const activePath = undefined;
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				const collapseActiveRoute = getActiveRoute(routes[i].views);
				if (collapseActiveRoute.activeRoute !== activeRoute) {
					return collapseActiveRoute;
				}
			} else if (routes[i].category) {
				const categoryActiveRoute = getActiveRoute(routes[i].views);
				if (categoryActiveRoute.activeRoute !== activeRoute) {
					return categoryActiveRoute;
				}
			} else {
				if (router.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
					return {
						activeRoute: routes[i].name,
						activePath: routes[i].path,
					};
				}
			}
		}

		return {
			activeRoute,
			activePath,
		};
	};

	const { isOpen, onOpen, onClose } = useDisclosure();

	const detailUser = useGetDetailUser();
	const isSuperAdmin = detailUser?.role_id === ROLE_ID.SA;

	useEffect(() => {
		if (detailUser?.id) {
			datadogRum.startSessionReplayRecording();
			datadogRum.setUser({
				id: detailUser.id,
				name: `${detailUser.firstName} ${detailUser.lastName}`,
				email: detailUser.email,
				role: detailUser.role_id,
			});
		} else {
			datadogRum.stopSessionReplayRecording();
			datadogRum.clearUser();
		}
	}, [detailUser]);

	const filterRoutes = isSuperAdmin
		? routes
		: _.filter(routes, (route) => !SUPER_ADMIN_ROUTES.includes(route.path));

	const route = router.route;

	const isProjectRoute = useMemo(() => {
		return route?.split('/')?.[3] === '[projectId]';
	}, [route]);

	const projectId = isProjectRoute
		? (router.query.projectId as string)
		: undefined;

	const { project } = useProjectSmallById(projectId);

	const projectContextValue = useMemo<IProjectContext>(() => {
		return {
			isFetching: project === undefined,
			projectData: project,
			projectExist: project === undefined ? undefined : project !== null,
		};
	}, [project]);

	return (
		<AdminContext.Provider
			value={{ contextValue, setContextValue: setContextValue as any }}
		>
			<ProjectContext.Provider value={projectContextValue}>
				<Box>
					{process.env.NODE_ENV !== 'development' && (
						<Zendesk
							defer
							zendeskKey={process.env.NEXT_PUBLIC_ZENDESK_KEY as string}
						/>
					)}
					<Sidebar
						onOpen={onOpen}
						routes={filterRoutes}
						{...rest}
						isOpen={isOpen}
						onClose={onClose}
					/>

					<MainPanel
						w={{
							// base: '100%',
							lg: isOpen ? 'calc(100% - 275px)' : 'calc(100% - 75px)',
						}}
						pos='relative'
						h='100vh'
					>
						{/* @ts-expect-error Server Component */}
						<AdminNavbar
							onOpen={onOpen}
							brandText={getActiveRoute(allRoutes)['activeRoute']}
							brandPath={getActiveRoute(allRoutes)['activePath']}
							isOpen={isOpen}
							routes={filterRoutes}
							projectExists={project !== null}
							{...rest}
						/>

						{project !== null && (
							<PanelContent>
								<PanelContainer>{children}</PanelContainer>
							</PanelContent>
						)}
					</MainPanel>
				</Box>
			</ProjectContext.Provider>
		</AdminContext.Provider>
	);
}
