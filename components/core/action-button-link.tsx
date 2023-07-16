import { Button, ButtonProps } from '@chakra-ui/react';

export type ActionButtonLinkProps = ButtonProps;

export function ActionButtonLink(props: ActionButtonLinkProps) {
	return (
		<Button
			background={'transparent'}
			_hover={{
				background: 'transparent',
				opacity: 0.75,
			}}
			_active={{
				background: 'transparent',
				opacity: 0.85,
			}}
			_focus={{
				background: 'transparent',
				opacity: 0.9,
			}}
			_disabled={{
				opacity: 0.65,
				_hover: {
					opacity: 0.65,
				},
				_active: {
					opacity: 0.65,
				},
				_focus: {
					opacity: 0.65,
				},
			}}
			px='0.5rem'
			fontSize='15px'
			color={'#40a0ff'}
			{...props}
		/>
	);
}
