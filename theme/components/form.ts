import { formAnatomy, formErrorAnatomy } from '@chakra-ui/anatomy';
import type { SystemStyleObject } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const formErrorStyleText = (props: any) => {
	return {
		color: mode('red.500', 'red.300')(props),
		mt: 2,
		fontSize: 'sm',
		lineHeight: 'normal',
	};
};

const formErrorStyleIcon = (props: any) => {
	return {
		marginEnd: '0.5em',
		color: mode('red.500', 'red.300')(props),
	};
};

const formErrorStyle = (props: any) => ({
	text: formErrorStyleText(props),
	icon: formErrorStyleIcon(props),
});

const formLabelStyle: SystemStyleObject = {
	fontFamily: 'Inter, Helvetica, Arial, sans-serif',
	marginEnd: 3,
	mb: 2,
	fontWeight: 'normal',
	fontSize: 'sm',
	transitionProperty: 'common',
	transitionDuration: 'normal',
	color: 'text.50',
	opacity: 1,
	_disabled: {
		opacity: '1 !important',
		background: 'red',
	},
};

const formStyleRequiredIndicator = (props: any) => {
	return {
		marginStart: 1,
		color: mode('red.500', 'red.300')(props),
	};
};

const formStyleHelperText = (props: any) => {
	return {
		mt: 2,
		color: mode('gray.600', 'whiteAlpha.600')(props),
		lineHeight: 'normal',
		fontSize: 'sm',
	};
};

const formStyle = (props: any) => ({
	container: { width: '100%', position: 'relative' },
	requiredIndicator: formStyleRequiredIndicator(props),
	helperText: formStyleHelperText(props),
});

export const formStyles = {
	components: {
		Form: {
			parts: formAnatomy.keys,
			baseStyle: formStyle,
		},
		FormError: {
			parts: formErrorAnatomy.keys,
			baseStyle: formErrorStyle,
		},
		FormLabel: {
			baseStyle: formLabelStyle,
		},
	},
};
