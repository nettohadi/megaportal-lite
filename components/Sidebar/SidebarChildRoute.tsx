import { forwardRef } from 'react';

import { Link, LinkProps, useColorModeValue } from '@chakra-ui/react';

import { variantChange } from 'theme/transition';

import { ChildRoute } from '../../routes';

export interface SidebarChildRouteProps extends LinkProps {
	route: ChildRoute;
	active?: boolean;
}

// Uses html <a> anchor element
export const SidebarChildRoute = forwardRef<
	HTMLAnchorElement,
	SidebarChildRouteProps
>((props, ref) => {
	const { route, active, ...linkProps } = props;
	const { name } = route;

	// colors for active and inactive states
	const activeBg = useColorModeValue('blue.100', 'navy.700');
	const activeTextColor = useColorModeValue('brand.400', 'white');
	const inactiveTextColor = useColorModeValue('text.200', 'white');

	return (
		<Link
			as='a'
			ref={ref}
			{...linkProps}
			fontSize={14}
			fontWeight={500}
			px='4'
			py='1.5'
			borderRadius={10}
			w='full'
			sx={{
				transition: variantChange,
				bg: active ? activeBg : 'transparent',
				color: active ? activeTextColor : inactiveTextColor,
				opacity: active ? 0.9 : 0.55,
				fontWeight: active ? '600' : '500',
				_hover: {
					opacity: 0.75,
					bg: activeBg,
					color: 'brand.400',
				},
			}}
		>
			{name}
		</Link>
	);
});

SidebarChildRoute.displayName = 'SidebarChildRoute';

export default SidebarChildRoute;
