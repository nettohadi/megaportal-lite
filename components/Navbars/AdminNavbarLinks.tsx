import { useEffect, useState } from 'react';

import { ExternalLinkIcon, CopyIcon } from '@chakra-ui/icons';
import {
	Avatar,
	Button,
	Flex,
	Menu,
	MenuButton,
	useColorMode,
	useColorModeValue,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	Icon,
	Text,
	useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiOutlineQuestionCircle, AiFillQuestionCircle } from 'react-icons/ai';
import { BiLogOut, BiMoon } from 'react-icons/bi';
import useSWR from 'swr';

import {
	QuestionmarkIcon,
	QuestionmarkDarkModeIcon,
} from 'components/Icons/Icons';
import { SidebarResponsive } from 'components/Sidebar/SidebarResponsive';
import {
	// CHECK_UNREAD_NOTIFICATIONS,
	GET_LIST_HISTORIES_BY_USER,
	MARK_READING_NOTIFICATIONS,
} from 'graphql/histories.graphql';
import { fetchData } from 'libs';
import {
	HISTORY_ACTION,
	LIMIT_NOTIFICATION_ITEM,
	PAGES_NAME,
} from 'libs/constants';
import { useUserQuery } from 'libs/hooks/useUserQuery';
import routes from 'routes';
import { IHistory } from 'types/history';
import { GetUploadedFile } from 'utils/file-uploaded';

interface Props {
	variant?: 'light' | 'dark';
	children?: React.ReactNode;
	onOpen?: () => void;
}

export const pageUrl = (moduleId: string, page: PAGES_NAME, pageId: string) => {
	const enumToString: { [key in PAGES_NAME]?: string } = {
		[PAGES_NAME.REQUIREMENT]: 'r',
		[PAGES_NAME.TASK]: 't',
	};
	if (enumToString[page]) {
		return `/admin/projects/${moduleId}/${enumToString[page]}/${pageId}`;
	}
	return `/admin/projects/${moduleId}`;
};

export const mapContentMessage = ({
	action,
	page,
	author,
	module_id,
	page_id,
}: IHistory) => {
	const lowerCase = page.toLowerCase();
	const mainContent: { [key in HISTORY_ACTION]: string } = {
		[HISTORY_ACTION.COMMENT]: 'New comment',
		[HISTORY_ACTION.CREATE]: `Create new ${lowerCase}`,
		[HISTORY_ACTION.UPDATE]: `Updated ${lowerCase}`,
		[HISTORY_ACTION.ARCHIVE]: `Archived ${lowerCase}`,
		[HISTORY_ACTION.DUPLICATE]: `Duplicated ${lowerCase}`,
		[HISTORY_ACTION.CREATE_SUB]: 'Create new sub-requirement',
		[HISTORY_ACTION.CHANGE_STATUS]: `Updated ${lowerCase} status`,
		[HISTORY_ACTION.ASSIGN_MEMBER]: `Assign member`,
		[HISTORY_ACTION.CREATE_FORM]: `Create new form`,
		[HISTORY_ACTION.UPDATE_FORM]: 'Updated form',
		[HISTORY_ACTION.UPLOAD_FILE]: 'Uploaded a file',
		[HISTORY_ACTION.DELETE_FILE]: 'Delete a file',
		[HISTORY_ACTION.DOWNLOAD_FILE]: 'Download a file',
		[HISTORY_ACTION.ARCHIVE_FILE]: 'Archived a file',
		[HISTORY_ACTION.ARCHIVE_FIELD_DESIGNER]: 'Archive field design',
		[HISTORY_ACTION.ADD_PROJECT_MEMBER]: 'Add member to project',
		[HISTORY_ACTION.REMOVE_MEMBER_FROM_PROJECT]: 'Remove member from project',
		[HISTORY_ACTION.UPDATE_PROJECT_INFORMATION]: 'Update project information',
		[HISTORY_ACTION.SHARE_FILE]: 'Share file to another task',
		[HISTORY_ACTION.UPDATE_TEAM_MEMBER_INFORMATION]:
			'Update information of team member',
		[HISTORY_ACTION.ARCHIVE_TEAM_MEMBER]: 'Archived team member',
	};

	let authorPrepositions = '';
	switch (action) {
		case HISTORY_ACTION.SHARE_FILE:
		case HISTORY_ACTION.UPLOAD_FILE:
		case HISTORY_ACTION.DELETE_FILE:
		case HISTORY_ACTION.DOWNLOAD_FILE:
		case HISTORY_ACTION.REMOVE_MEMBER_FROM_PROJECT:
		case HISTORY_ACTION.ADD_PROJECT_MEMBER:
		case HISTORY_ACTION.COMMENT:
			authorPrepositions = 'by';
			break;
		default:
			authorPrepositions = 'from';
			break;
	}

	return {
		info: `${authorPrepositions} ${author?.firstName} ${author?.lastName}`,
		boldInfo: mainContent[action],
		href: pageUrl(module_id, page, page_id),
	};
};
