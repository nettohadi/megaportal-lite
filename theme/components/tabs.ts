import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';
import { Dict } from '@chakra-ui/utils';

export const tabStyles = {
	components: {
		Tabs: {
			variants: {
				line: (props: Dict<any> | StyleFunctionProps) => ({
					tab: {
						color: mode('text.200', 'white')(props),
						borderColor: 'transparent',
						bg: 'transparent',
						_selected: {
							borderColor: 'brand.400',
							color: 'brand.400',
							bg: 'transparent',
						},
					},
				}),
			},
		},
	},
};
