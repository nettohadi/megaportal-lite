import { PropsWithChildren } from 'react';

import { Box, BoxProps } from '@chakra-ui/react';

export type TagProps = PropsWithChildren<Omit<BoxProps, 'color'>> & {
	color: BoxProps['backgroundColor'];
};

export function Tag({ children, color, textColor, ...boxProps }: TagProps) {
	return (
		<Box
			backgroundColor={color ?? '#7a7a8a22'}
			px='1rem'
			display='inline-flex'
			py='0.2rem'
			rounded={'1rem'}
			textAlign='center'
			textColor={textColor ?? '#3a3a4af2'}
			{...boxProps}
		>
			{children}
		</Box>
	);
}
