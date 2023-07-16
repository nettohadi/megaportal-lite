import React from 'react';

import { Box, useStyleConfig, type BoxProps } from '@chakra-ui/react';

interface Props extends BoxProps {
	variant?: string;
	children: React.ReactNode;
	[x: string]: any;
}

function Card({ variant, children, ...rest }: Props) {
	const styles = useStyleConfig('Card', { variant });
	// Pass the computed styles into the `__css` prop
	return (
		<Box __css={styles} {...rest}>
			{children}
		</Box>
	);
}

export default Card;
