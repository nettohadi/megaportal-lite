import { forwardRef } from 'react';

import { Button, ButtonProps } from '@chakra-ui/react';

export type LinkButtonProps = ButtonProps;

export const LinkButton = forwardRef(function LinkButton(
	buttonProps: LinkButtonProps,
	ref: any
) {
	return <Button ref={ref} py='0.5rem' height={'auto'} {...buttonProps} />;
});
