import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';

export interface CardHeaderProps extends BoxProps {
	variant?: string;
	children: React.ReactNode;
}

function CardHeader({ variant, children, ...boxProps }: CardHeaderProps) {
	const styles = useStyleConfig('CardHeader', { variant });
	// Pass the computed styles into the `__css` prop
	return (
		<Box __css={styles} {...boxProps}>
			{children}
		</Box>
	);
}

export default CardHeader;
