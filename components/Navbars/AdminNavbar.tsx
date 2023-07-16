import {
	JSXElementConstructor,
	Key,
	ReactElement,
	ReactFragment,
	ReactPortal,
	useContext,
	useEffect,
	useState,
} from 'react';

import { ChevronRightIcon } from '@chakra-ui/icons';
import {
	Box,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Flex,
	Popover,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
	Portal,
	useColorModeValue,
	Text,
	Icon,
	Link,
} from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineScan } from 'react-icons/ai';
import { ImStack } from 'react-icons/im';
import useSWR from 'swr';

import IconBox from 'components/Icons/IconBox';
import { GET_PROJECT_QUERY } from 'graphql/projects.graphql';
import { GET_TEMPLATE_QUERY } from 'graphql/templates.graphql';
import { AdminContext } from 'layouts/Admin';
import { fetchData } from 'libs';
import { ProjectDoesNotExist } from 'libs/hooks/project/useProjectDoesNotExist';

interface Props {
	brandText: string;
	onOpen: () => void;
	brandPath: string;
	isOpen: boolean;
	routes: any;
	projectExists?: boolean;
}

export default function AdminNavbar({
	brandText,
	onOpen,
	brandPath,
	isOpen,
	routes,
	projectExists,
}: Props) {
	// hooks
	const router = useRouter();
	const { pathname } = useRouter();
	const { contextValue } = useContext(AdminContext);

	// state
	const [detailName, setDetailName] = useState();

	// colors
	const mainText = useColorModeValue('text.200', 'gray.200');

	/* @ts-expect-error Server Component */
	const value = /[^/]*$/.exec(pathname)[0];
	const transformedValue = value
		?.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

	const queryList = [
		{
			name: 'project',
			value: 'name',
			path: '/projects',
			query: GET_PROJECT_QUERY,
		},
		{
			name: 'template',
			value: 'title',
			path: '/templates',
			query: GET_TEMPLATE_QUERY,
		},
	];

	const queryConfig = queryList.find((el) => el.path === brandPath);
	const { data } = useSWR(
		router.query.projectId && queryConfig
			? [
					queryConfig.query,
					{
						id: router.query.projectId,
					},
			  ]
			: null,
		fetchData
	);

	const hasChildRoutes = routes.filter(
		(route: { hasOwnProperty: (arg0: string) => any }) =>
			route?.hasOwnProperty('childRoutes')
	);

	const groupProjectsByType = (objArray: any[], property: string | number) => {
		return objArray.reduce(
			(acc: { [x: string]: never[] }, obj: { [x: string]: any }) => {
				const key = Array.isArray(obj[property])
					? obj[property]
					: [obj[property]];
				for (const subKey of key) {
					const curGroup = [...(acc[subKey] ?? []), obj];
					acc = { ...acc, [subKey]: curGroup };
				}
				return acc;
			},
			{}
		);
	};

	const projectsGroupedByType = groupProjectsByType(
		hasChildRoutes[0]?.childRoutes,
		'projectType'
	);

	useEffect(() => {
		if (data && queryConfig) {
			setDetailName(data[queryConfig?.name]?.[queryConfig.value]);
		}
		return () => {
			setDetailName(undefined);
		};
	}, [data, queryConfig]);

	if (!projectsGroupedByType) {
		return;
	}

	const breadcrumbsData = [
		contextValue.secondChild,
		contextValue.thirdChild,
		contextValue.fourthChild,
		contextValue.fifthChild,
	].filter(Boolean);

	const lastBreadcrumb = breadcrumbsData.at(-1);

	const urlPattern = /^\/admin\/projects\/.+$/;
	const urlPatternMatch = urlPattern.test(pathname);

	const getLastItemWithValueInBreadcrumb = (obj: any) => {
		const keys = Object.keys(obj);
		for (let i = keys.length - 1; i >= 0; i--) {
			const key = keys[i];
			if (obj[key] && key !== 'ipLimits') {
				return obj[key];
			}
		}
		return undefined;
	};

	const breadcrumbIsActive =
		getLastItemWithValueInBreadcrumb(contextValue)?.title;

	const lastSlashIndex = pathname.lastIndexOf('/');
	const stringAfterLastSlash = pathname.substring(lastSlashIndex + 1);

	const words = stringAfterLastSlash.split('-');
	const capitalizedWords = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1)
	);
	const topBreadcrumbTransformedValue = capitalizedWords.join(' ');

	let isTopActive;
	if (pathname === '/admin/projects/[projectId]') {
		isTopActive = breadcrumbIsActive;
	} else {
		isTopActive = topBreadcrumbTransformedValue;
	}

	return (
		<>
			<Flex
				left={{
					lg: isOpen ? '327px' : '124px',
					xl: isOpen ? '327px' : '128px',
				}}
				mb='10px'
				display='flex'
				flexDirection='row'
				alignItems='center'
				minH='75px'
				justifyContent='space-between'
				lineHeight='25.6px'
				pt='12'
				pl='14'
				transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
				transitionDuration='.2s, .2s, .35s'
				transitionTimingFunction='linear, linear, ease'
			>
				<Flex
					w='100%'
					flexDirection={{
						sm: 'row',
						md: 'row',
					}}
					alignItems={{ xl: 'flex-start' }}
				>
					<Box mb={{ sm: '8px', md: '0px' }}>
						{/* Display Org Name on the project relation pages */}
						{data?.project?.organization_id && (
							<NextLink
								href={`/admin/organizations/${data.project.organization_id}`}
							>
								<Text fontSize='20px' fontWeight='700' mb='3'>
									{data?.project?.org?.name}
								</Text>
							</NextLink>
						)}
						{/* Display Org Name on the project relation pages */}

						<Breadcrumb
							separator={
								<ChevronRightIcon w='24px' h='24px' color={mainText} />
							}
						>
							<BreadcrumbItem>
								<BreadcrumbLink
									onClick={() =>
										router.push(`${brandPath ? `/admin${brandPath}` : '#'}`)
									}
									color={mainText}
								>
									<Text fontSize='18px'>{brandText}</Text>
								</BreadcrumbLink>
							</BreadcrumbItem>

							{router.query.projectId && contextValue.firstChild && (
								<BreadcrumbItem color={mainText}>
									<BreadcrumbLink
										color={mainText}
										onClick={() =>
											router.push(
												`${
													brandPath
														? `/admin${brandPath}/${router.query.projectId}`
														: '#'
												}`
											)
										}
									>
										<Text
											fontSize='18px'
											fontWeight={
												pathname === '/admin/projects/[projectId]' ? '700' : ''
											}
										>
											{contextValue.firstChild.title}
										</Text>
									</BreadcrumbLink>
								</BreadcrumbItem>
							)}

							{router.query.projectId &&
								!contextValue.firstChild &&
								detailName && (
									<BreadcrumbItem color={mainText}>
										<BreadcrumbLink
											color={mainText}
											onClick={() =>
												router.push(
													`${
														brandPath
															? `/admin${brandPath}/${router.query.projectId}`
															: '#'
													}`
												)
											}
										>
											<Text fontSize='18px'>{detailName}</Text>
										</BreadcrumbLink>
									</BreadcrumbItem>
								)}

							{breadcrumbsData.slice(0, -1).length > 0 && (
								<BreadcrumbItem color={mainText}>
									<Popover trigger='hover'>
										<PopoverTrigger>
											<BreadcrumbLink color={mainText}>...</BreadcrumbLink>
										</PopoverTrigger>
										<Portal>
											<PopoverContent>
												<PopoverCloseButton color={mainText} />
												<PopoverBody as={Breadcrumb}>
													{breadcrumbsData.slice(0, -1).map((breadcrumb) =>
														breadcrumb?.title ? (
															<BreadcrumbItem
																color={mainText}
																key={breadcrumb?.router}
															>
																<BreadcrumbLink
																	color={mainText}
																	title={breadcrumb.title}
																	onClick={() =>
																		router.push(breadcrumb?.router || '#')
																	}
																	noOfLines={1}
																	maxW='xs'
																>
																	<Text fontSize='18px'>
																		{breadcrumb.title}
																	</Text>
																</BreadcrumbLink>
															</BreadcrumbItem>
														) : null
													)}
												</PopoverBody>
											</PopoverContent>
										</Portal>
									</Popover>
								</BreadcrumbItem>
							)}
							{lastBreadcrumb && (
								<>
									<BreadcrumbItem color={mainText} isCurrentPage>
										<BreadcrumbLink
											color={mainText}
											onClick={() => router.push(lastBreadcrumb?.router || '#')}
											noOfLines={1}
											maxW='xs'
											title={lastBreadcrumb.title}
										>
											<Text
												fontSize='18px'
												fontWeight={
													topBreadcrumbTransformedValue === isTopActive
														? '700'
														: ''
												}
											>
												{lastBreadcrumb.title}
											</Text>
										</BreadcrumbLink>
									</BreadcrumbItem>
								</>
							)}
						</Breadcrumb>
					</Box>
				</Flex>
			</Flex>
			<Box
				pos='absolute'
				pt='8px'
				left={{
					lg: isOpen ? '259px' : '56px',
					xl: isOpen ? '259px' : '57px',
				}}
				mb='10px'
				transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
				transitionDuration='.2s, .2s, .35s'
				transitionTimingFunction='linear, linear, ease'
			>
				{urlPatternMatch == true ? (
					projectExists ? (
						<Flex flexDirection='row' gap='4'>
							<Flex gap='1'>
								<IconBox
									color={transformedValue === '[projectId]' ? 'brand.400' : ''}
								>
									<Icon as={ImStack} size='1.5rem' />
								</IconBox>

							</Flex>
							{projectsGroupedByType[data?.project?.type]?.map(
								(
									obj: {
										icon: any;
										path: any;
										_index: Key | null | undefined;
										name:
											| string
											| number
											| boolean
											| ReactElement<any, string | JSXElementConstructor<any>>
											| ReactFragment
											| ReactPortal
											| null
											| undefined;
									},
									_index: any
								) => {
									const isActive = transformedValue === obj?.name;
									return (
										<Flex key={_index} gap='1'>
											<IconBox color={isActive ? 'brand.400' : ''}>
												{obj?.icon}
											</IconBox>
											<NextLink
												href={`/admin/projects/${router.query.projectId}${obj?.path}`}
												passHref
											>
												<Link>
													<Text
														fontSize='14px'
														color={isActive ? 'brand.400' : ''}
														textDecoration={isActive ? 'underline' : ''}
													>
														{obj?.name}
													</Text>
												</Link>
											</NextLink>
										</Flex>
									);
								}
							)}
						</Flex>
					) : (
						<>
							<Head>
								<title>Project not found - Mega Portal</title>
							</Head>
							<ProjectDoesNotExist />
						</>
					)
				) : null}
			</Box>
		</>
	);
}
