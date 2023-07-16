/* eslint-disable import/named */
import { ItemId, TreeData, TreeItem } from '@atlaskit/tree';
import jwt_decode, { JwtPayload } from 'jwt-decode';

import { Requirements } from 'types/requirements';
import { RolePermission, Role } from 'types/role';

import { JwtUserPayload } from './constants';
import { MODULES_ID, PERMISSIONS_TYPE } from './role';

export const reorder = (
	list: Array<any>,
	startIndex: number,
	endIndex: number
): Array<any> => {
	const result = [...list];
	const [removed] = result.splice(startIndex, 1);
	const newPosition = endIndex + 1;

	const updatedRemoved = { ...removed, position: newPosition };
	result.splice(endIndex, 0, updatedRemoved);

	const newOrder = result.map((res, index) => {
		const newPos = index + 1;
		return { ...res, position: newPos };
	});
	return newOrder;
};

export const repositionList = (
	list: Array<any>,
	startIndex: number,
	endIndex: number
): Array<any> => {
	const result = [...list];
	const neededUpdate = result.splice(startIndex, endIndex - startIndex + 1);

	return neededUpdate;
};

export const convertArrayToTree = (
	rootId: string,
	list: Requirements[],
	path = 'root'
): TreeData => {
	const tree: TreeData = {
		rootId: rootId,
		items: {},
	};
	const rootItem: TreeItem = {
		id: rootId,
		children: [],
		hasChildren: list.length > 0,
		data: {
			title: 'Root Item',
			id: rootId,
		},
		isExpanded: true,
		isChildrenLoading: false,
	};
	list.forEach((el: Requirements) => {
		if (el.parent_path === path) {
			rootItem.children.push(el.id);
		}
		tree.items[el.id] = {
			id: el.id,
			children: el.children?.map((child: any) => child.id) || [],
			hasChildren: el.children && el.children?.length > 0 ? true : false,
			data: el,
			isExpanded: true,
			isChildrenLoading: false,
		};
		if (el.children && el.children?.length > 0) {
			getAllChildrenToTree(tree.items, el.children);
		}
	});

	tree.items[rootId] = rootItem;

	return tree;
};

export const getAllChildrenToTree = (
	items: Record<ItemId, TreeItem>,
	list: Requirements[]
) => {
	list.forEach((el: Requirements) => {
		items[el.id] = {
			id: el.id,
			children: el.children?.map((child: any) => child.id) || [],
			hasChildren: el.children && el.children?.length > 0 ? true : false,
			data: el,
			isExpanded: true,
			isChildrenLoading: false,
		};
		if (el.children && el.children?.length > 0) {
			getAllChildrenToTree(items, el.children);
		}
	});
};

export type VerifyResponse = {
	status: boolean;
	message?: string;
};

export const verifyToken = (
	scope: Array<string>,
	token?: string
): VerifyResponse => {
	if (!token) {
		return {
			status: false,
			message: `You don't have permission to use this function`,
		};
	}
	const decodedToken: JwtUserPayload & JwtPayload = jwt_decode(token);
	const havePermission = scope.every((el) => decodedToken.scope.includes(el));
	if (!havePermission) {
		return {
			status: false,
			message: `You don't have permission to use this function`,
		};
	}

	return {
		status: true,
	};
};

export const getPermissionID = (roles: Role[], name: string) => {
	if (!roles) return '';

	const role = roles.find((role) => role.name === name);

	if (role) return role.role_id;

	return '';
};

export const getPermissionName = (roles: Role[], id: string) => {
	if (!roles) return '';

	const role = roles.find((role) => role.role_id === id);

	if (role) return role.name;

	return '';
};

export const havePermissions = (
	types: PERMISSIONS_TYPE[],
	moduleId: MODULES_ID,
	permissions?: RolePermission[]
): boolean => {
	if (!permissions || permissions?.length === 0) return false;
	const modulePermissions = permissions
		.filter((e) => e.permission.module_id === moduleId)
		.map((e) => e.permission.name);
	if (!modulePermissions || modulePermissions.length === 0) return false;

	return types.every((e) => modulePermissions.includes(e));
};

export const haveOrgPermissions = (
	types: PERMISSIONS_TYPE[],
	moduleId: MODULES_ID,
	orgAdminEmail: string,
	orgStaffEmail: string,
	permissions?: RolePermission[]
): boolean => {
	if (!permissions || permissions?.length === 0 || !orgStaffEmail) return false;

	const emailSuffix = orgAdminEmail.split('@')[1];
	if (orgStaffEmail.indexOf(emailSuffix) === -1) return false;

	const modulePermissions = permissions
		.filter((e) => e.permission.module_id === moduleId)
		.map((e) => e.permission.name);

	return types.every((e) => modulePermissions.includes(e));
};

export const textTruncate = (title: string, maxLength = 30) => {
	const ending = '...';

	if (title.length > maxLength) {
		return title.substring(0, maxLength - ending.length) + ending;
	}
	return title;
};

export const capitalizeFirstLetter = (text: string): string => {
	return text.charAt(0).toUpperCase() + text.slice(1);
};
