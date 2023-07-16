import { Flex } from '@chakra-ui/react';
import Head from 'next/head';

export function ErrorMessage(error: any) {
	return (
		<>
			<Head>
				<title>404 - Mega Portal</title>
			</Head>
			<Flex direction='column' mt={{ sm: '150px', md: '100px' }}>
				<p>Error loading data!</p>
				<p>{error.message || error?.error?.message}</p>
			</Flex>
		</>
	);
}
