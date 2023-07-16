import * as React from 'react';

import { Flex, Spinner } from '@chakra-ui/react';
import Head from 'next/head';

interface Props {
	title?: string;
}

function LoadingPage(props: Props) {
	return (
		<>
			<Head>
				<title>{props.title}</title>
			</Head>
			<Flex
				alignItems='center'
				direction='column'
				height={{ sm: 'calc(100vh - 210px)', md: 'calc(100vh - 160px)' }}
				justifyContent='center'
				mt={{ sm: '150px', md: '100px' }}
			>
				<Spinner
					color='blue.500'
					emptyColor='gray.200'
					size='xl'
					speed='0.65s'
					thickness='4px'
				/>
			</Flex>
		</>
	);
}

LoadingPage.defaultProps = {
	title: 'Loading - Mega Portal',
};

export default LoadingPage;
