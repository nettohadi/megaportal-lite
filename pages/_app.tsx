import { useEffect, useState } from 'react';

import '@fontsource/roboto';
import '@fontsource/roboto/500.css';
import { ChakraProvider, useToast } from '@chakra-ui/react';
import { datadogRum } from '@datadog/browser-rum';
import type { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { LoadingProgressProvider } from 'components/Loading/LoadingProgress';
import theme from 'theme/theme';

type CustomAppProps = AppProps & {
	Component: NextComponentType & { layout?: string };
};

// TODO: hack to wait for mocks before rendering
// shouldn't have to do this..
// https://github.com/mswjs/msw/discussions/1049
function prepare() {
	return Promise.resolve();
}

function MyApp({ Component, pageProps }: CustomAppProps) {
	const toast = useToast();

	const handleOffline = () => {
		// toast for offline
		toast({
			title: `Offline`,
			description: 'Something went wrong, try refreshing browser.',
			status: 'error',
			isClosable: true,
			position: 'bottom-left',
		});
	};

	const handleOnline = () => {
		// toast for online
		toast({
			title: `Online`,
			description: 'You are online now',
			status: 'success',
			isClosable: true,
			position: 'bottom-left',
		});
	};
	useEffect(() => {
		window.addEventListener('offline', handleOffline);

		window.addEventListener('online', handleOnline);

		return () => {
			window.removeEventListener('offline', handleOffline);
			window.removeEventListener('online', handleOnline);
		};
	});

	const Layout =
		Component.layout ||
		(({ children }: { children: React.ReactNode }) => <>{children}</>);

	return (
		<>
			<Head>
				<meta
					httpEquiv='Content-Security-Policy'
					content='upgrade-insecure-requests'
				/>
			</Head>
			<ChakraProvider theme={theme}>
				<LoadingProgressProvider>
						<Layout {...pageProps}>
							<Component {...pageProps} />
						</Layout>
				</LoadingProgressProvider>
			</ChakraProvider>
		</>
	);
}
export default MyApp;
