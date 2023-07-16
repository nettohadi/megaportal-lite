import { PropsWithChildren } from 'react';

import { Box, BoxProps } from '@chakra-ui/react';

export function DefaultCellBox({
	children,
	center,
	...props
}: PropsWithChildren<BoxProps & { center?: boolean }>) {
	return (
		<Box
			display={'flex'}
			alignItems={center ? 'center' : undefined}
			justifyContent={center ? 'center' : 'stretch'}
			overflowX={'hidden'}
			px='0.75rem'
			py={'0.5rem'}
			{...props}
		>
			{children}
		</Box>
	);
}
