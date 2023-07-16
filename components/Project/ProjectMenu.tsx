import {
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import useSWR from 'swr';

import {
	GET_ALL_PROJECTS_BY_USER_ID_QUERY,
	FILTER_PROJECTS_QUERY,
} from 'graphql/projects.graphql';
import { fetchData } from 'libs';
import { havePermissions } from 'libs/functions';
import { useUserQuery } from 'libs/hooks/useUserQuery';
import { MODULES_ID, PERMISSIONS_TYPE } from 'libs/role';
import { Project } from 'types/projects';

import { useProjectQuery } from './useProjectQuery';

export const ProjectMenu = () => {
	const router = useRouter();

	const { project } = useProjectQuery(router.query.projectId as string);

	const user = useUserQuery();

	const hasReadProjectsPermission = havePermissions(
		[PERMISSIONS_TYPE.READ],
		MODULES_ID.PROJECTS,
		user?.role?.permissions
	);

	const { data: dataProjects } = useSWR(
		user?.id && [
			hasReadProjectsPermission
				? FILTER_PROJECTS_QUERY
				: GET_ALL_PROJECTS_BY_USER_ID_QUERY,
			hasReadProjectsPermission
				? {
						where: {
							active: { _eq: true },
						},
				  }
				: {
						user_id: user.id,
						active: { _eq: true },
				  },
		],
		fetchData
	);

	const projectIndex = (dataProjects?.projects as Project[])?.findIndex(
		(el) => el.id === project?.id
	);

	const onChangeProject = (isIncrease: boolean) => {
		const project =
			dataProjects?.projects[
				!!isIncrease ? projectIndex + 1 : projectIndex - 1
			];
		if (!!project?.id) {
			router.push('/admin/projects/' + project.id);
		}
	};

	return (
		<Flex
			transform={'translateY(5px)'}
			borderRadius={8}
			marginTop='20px'
			position={'relative'}
			// mb={{ md: 'unset', sm: 5 }}
			w={{ sm: 'max-content' }}
			zIndex='100'
			mx='20px'
			my='20px'
		>
			<Menu preventOverflow matchWidth closeOnSelect={false}>
				<MenuButton borderRadius={8} h={'40px'} width={250} as={Button}>
					<Text
						textAlign={'left'}
						overflow='hidden'
						textOverflow={'ellipsis'}
						pr={10}
					>
						{project?.name}
					</Text>
				</MenuButton>
				<MenuList
					maxHeight={500}
					overflowY={'auto'}
					overflowX={'hidden'}
					minW={250}
				>
					{dataProjects?.projects?.map((item: Project, idx: number) => (
						<MenuItem
							width={250}
							bg={projectIndex === idx ? 'gray.300' : 'unset'}
							key={item.id}
							_active={projectIndex === idx ? { bg: 'gray.300' } : {}}
							_focus={projectIndex === idx ? { bg: 'gray.300' } : {}}
						>
							<Link href={`/admin/projects/${item.id}`}>
								<a style={{ width: '100%' }}>
									<Text
										textAlign={'left'}
										overflow='hidden'
										textOverflow={'ellipsis'}
										whiteSpace='nowrap'
									>
										{item.name}
									</Text>
								</a>
							</Link>
						</MenuItem>
					))}
				</MenuList>
			</Menu>
			<Flex
				zIndex={1001}
				top='0'
				right={0}
				h={'40px'}
				position={'absolute'}
				direction={'column'}
			>
				<Button
					borderRadius={0}
					borderTopRightRadius={8}
					onClick={() => onChangeProject(false)}
					disabled={projectIndex === 0}
				>
					<MdKeyboardArrowUp />
				</Button>
				<Button
					borderRadius={0}
					borderBottomRightRadius={8}
					disabled={projectIndex === dataProjects?.projects?.length - 1}
					onClick={() => onChangeProject(true)}
				>
					<MdKeyboardArrowDown />
				</Button>
			</Flex>
		</Flex>
	);
};
