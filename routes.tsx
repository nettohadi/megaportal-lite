import { SettingsIcon } from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';
import { AiOutlineScan } from 'react-icons/ai';
import { BiScan, BiTargetLock, BiNote } from 'react-icons/bi';
import { BsFillFileEarmarkRuledFill } from 'react-icons/bs';
import { CgDanger, CgTemplate } from 'react-icons/cg';
import { FaCubes } from 'react-icons/fa';
import { GoComment } from 'react-icons/go';
import { GrTask } from 'react-icons/gr';
import { ImStack } from 'react-icons/im';
import { RxCrossCircled } from 'react-icons/rx';
import { TbUsers, TbReportSearch } from 'react-icons/tb';
// import { MdPeopleOutline } from 'react-icons/md';

// import {
// 	TeamMembersIcon,
// 	FormFieldTemplateIcon,
// 	ProjectTemplateIcon,
// 	OrganizationsIcon,
// 	// SettingsIcon,
// } from 'components/Icons/Icons';
import { PROJECT_TYPE } from 'libs/constants';

export interface Route {
	path: string;
	name: string;
	icon?: React.ReactNode;
	layout: string;
	childRoutes?: ChildRoute[];
	projectType?: PROJECT_TYPE[];
}

export type ChildRoute = Pick<Route, 'path' | 'name' | 'projectType' | 'icon'>;

const routes: Route[] = [
	{
		path: '/projects',
		name: 'Projects',
		icon: <Icon as={ImStack} size='1.5rem' />,
		layout: '/admin',
		childRoutes: [
			{
				name: 'Targets',
				path: '/targets',
				projectType: [PROJECT_TYPE.SCAN, PROJECT_TYPE.INTERNAL_SCAN],
				icon: <Icon as={BiTargetLock} size='1.5em' />,
			},
		],
	},
];

export default routes;
