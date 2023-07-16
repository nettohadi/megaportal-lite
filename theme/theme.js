import { extendTheme } from '@chakra-ui/react';

import { CardComponent } from './additions/card/Card';
import { MainPanelComponent } from './additions/layout/MainPanel';
import { PanelContainerComponent } from './additions/layout/PanelContainer';
import { PanelContentComponent } from './additions/layout/PanelContent';
import { badgeStyles } from './components/badge';
import { buttonStyles } from './components/button';
import { inputStyles } from './components/input';
import { linkStyles } from './components/link';
import { tabStyles } from './components/tabs';
import { breakpoints } from './foundations/breakpoints';
import { globalStyles } from './styles';

export default extendTheme(
	{
		initialColorMode: 'dark',
		useSystemColorMode: true,
	},
	{ breakpoints },
	globalStyles,
	buttonStyles,
	linkStyles,
	badgeStyles,
	inputStyles,
	tabStyles,
	CardComponent,
	MainPanelComponent,
	PanelContentComponent,
	PanelContainerComponent
);
