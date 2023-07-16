import React from 'react';

import { Flex } from '@chakra-ui/react';

interface Props {
  variant?: 'light' | 'dark';
  children?: React.ReactNode;
  my?: string;
}

export function HSeparator({ variant, children, ...rest }: Props) {
	return (
		<Flex
			h="1px"
			w="100%"
			bg="linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0) 100%)"
			{...rest}
		></Flex>
	);
}

export function VSeparator({ variant, children, ...rest }: Props) {
	return (
		<Flex
			w="2px"
			bg="blackAlpha.700"
			{...rest}
		></Flex>
	);
}
