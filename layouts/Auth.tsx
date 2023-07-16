import React from 'react';

import { Box, Portal } from '@chakra-ui/react';

import AuthNavbar from 'components/Navbars/AuthNavbar';
import routes from 'routes';

export default function Auth({ children }: { children: React.ReactNode }) {
	return (
		<Box>
			<Portal>
				<AuthNavbar secondary={routes} />
			</Portal>
			<Box>{children}</Box>
		</Box>
	);
}
