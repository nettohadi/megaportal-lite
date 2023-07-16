import {
	Button,
	forwardRef,
	Icon,
	Text,
	useColorModeValue,
	Tooltip,
	type ButtonProps,
	As,
} from '@chakra-ui/react';

import IconBox from 'components/Icons/IconBox';
import { Route } from 'routes';
import { variantChange } from 'theme/transition';

interface SidebarMenuButtonProps extends ButtonProps {
	isActive: boolean;
	icon: Route['icon'];
	name: Route['name'];
	as?: As;
	hasActiveChildRoute?: boolean;
	isOpen: boolean;
}

export const SidebarMenuButton = forwardRef<SidebarMenuButtonProps, 'a'>(
	(
		{
			isOpen,
			isActive,
			icon,
			name,
			as = 'a',
			hasActiveChildRoute = false,
			...rest
		},
		ref
	) => {
		const activeBg = useColorModeValue('blue.100', 'navy.700');
		// const inactiveBg = useColorModeValue('#f8f8f8', 'gray.400');
		const activeColor = useColorModeValue('brand.400', 'white');
		const inactiveColor = useColorModeValue('text.200', 'gray.400');

		return (
			<Tooltip
				label={isOpen ? '' : name}
				backgroundColor='brand.400'
				ml={isOpen ? '0' : '4px'}
			>
				<Button
					size='lg'
					sx={{
						bg: isActive ? activeBg : 'transparent',
						transition: variantChange,
						borderRadius: '15px',
						// mb: { xl: '6px' },
						// mx: { xl: 'auto' },
						px: { lg: isOpen ? '8px' : 'auto', xl: isOpen ? '12px' : 'auto' },
						// py: '12px',
						display: 'flex',
						justifyContent: isOpen ? 'flex-start' : 'center',
					}}
					ref={ref}
					{...rest}
					as={as}
					variant={'sidebar'}
					isActive={isActive}
				>
					{typeof icon === 'string' ? (
						<Icon>{icon}</Icon>
					) : (
						<IconBox
							bg='transparent'
							color={
								isActive || hasActiveChildRoute ? activeColor : inactiveColor
							}
							// h='24px'
							// w='24px'
							mr={isOpen ? '12px' : '0'}
							transition={variantChange}
							alignItems={isOpen ? 'flex-start' : 'center'}
						>
							{icon}
						</IconBox>
					)}
					<Text
						color={
							isActive || hasActiveChildRoute ? activeColor : inactiveColor
						}
						my='auto'
						fontSize='16px'
						lineHeight='24px'
						fontWeight='600'
						display={isOpen ? 'flex' : 'none'}
					>
						{name}
					</Text>
				</Button>
			</Tooltip>
		);
	}
);

SidebarMenuButton.displayName = 'SidebarMenuButton';
