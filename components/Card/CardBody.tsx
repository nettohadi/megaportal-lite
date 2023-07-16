import { Box, useStyleConfig } from '@chakra-ui/react';

interface Props {
  variant?: string;
  children: React.ReactNode;
  [x: string]: any;
}

function CardBody({ variant, children, ...rest }: Props) {
	const styles = useStyleConfig('CardBody', { variant });
	// Pass the computed styles into the `__css` prop
	return (
		<Box __css={styles} {...rest}>
			{children}
		</Box>
	);
}

export default CardBody;
