import { mode } from '@chakra-ui/theme-tools';

const baseStyle = {
	field: {
		border: '1px solid',
		borderColor: '#949494',
		borderRadius: '4px',
		bg: 'inherit',
		_hover: {
			borderColor: '#767676',
		},
		_active: {
			border: '2px solid',
			borderColor: '#543FD3',
		},
		_readOnly: {
			boxShadow: 'none !important',
			userSelect: 'all',
		},
		_disabled: {
			backgroundColor: '#F4F4F4',
			borderColor: '#949494',
			opacity: '1 !important',
			cursor: 'not-allowed',
		},
		_invalid: {
			borderColor: '#EE0004',
		},
		_focusVisible: {
			zIndex: 1,
			border: '1px solid',
			_invalid: {
				borderColor: '#EE0004',
			},
		},
	},
	addon: {
		border: '1px solid',
		borderColor: 'inherit',
		bg: 'gray.100',
	},
};

const authVariant = (props: any) => {
	return {
		field: {
			bg: mode('white', 'navy.700')(props),
			border: '1px solid',
			borderColor: mode('gray.200', 'transparent')(props),
			_placeholder: {
				color: mode('gray.300', 'gray.400')(props),
			},
		},
	};
};

const searchVariant = (props: any) => {
	return {
		field: {
			border: 'none',
			py: '11px',
			borderRadius: 'inherit',
			_placeholder: {
				color: mode('gray.300', 'gray.400')(props),
			},
		},
	};
};

export const inputStyles = {
	components: {
		Input: {
			baseStyle,
			variants: {
				auth: authVariant,
				search: searchVariant,
			},
		},
	},
};
