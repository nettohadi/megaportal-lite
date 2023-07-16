import { Box, useColorMode } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

import {
	Logo,
	LogoDarkMode,
	SimpleLogo,
	SimpleLogoDarkMode,
} from 'components/Icons/Icons';
import { HSeparator } from 'components/Separator/Separator';

interface Props {
	isOpen: boolean;
}

export const SidebarBrand = ({ isOpen }: Props) => {
	const { colorMode } = useColorMode();

	const simpleLogoVariants = {
		open: {
			opacity: 1,
			transition: {
				duration: 0.25,
				ease: [0.04, 0.62, 0.23, 0.98],
				delay: 0.25,
			},
		},
		close: {
			opacity: 0,
			transition: {
				delay: 0,
				duration: 0,
			},
		},
	};

	const logoVariants = {
		open: {
			opacity: 0,
			transition: {
				delay: 0,
				duration: 0,
			},
		},
		close: {
			opacity: 1,
			transition: {
				delay: 0.25,
				duration: 0.25,
				ease: [0.04, 0.62, 0.23, 0.98],
			},
		},
	};

	return (
		<Box position='relative' mt='30px'>
			{/* commented out AnimatePresence for now b/c its spamming the console with key errors */}
			{/* <AnimatePresence> */}
			<Box
				as={motion.div}
				initial={{ opacity: 0 }}
				variants={isOpen ? logoVariants : simpleLogoVariants}
				animate={isOpen ? 'close' : 'open'}
			>
				{colorMode == 'light' && !isOpen && (
					<SimpleLogo
						height='20px'
						width='172px'
						position='absolute'
						left='50%'
						top='11%'
						transform='translateX(-50%)'
					/>
				)}
				{colorMode == 'light' && isOpen && (
					<Box
						as={motion.div}
						initial={{ opacity: 0 }}
						variants={logoVariants}
						animate={isOpen ? 'close' : 'open'}
					>
						<Logo
							height='20px'
							width='172px'
							position='absolute'
							left='50%'
							transform='translateX(-50%)'
						/>
					</Box>
				)}
				{colorMode == 'dark' && !isOpen && (
					<SimpleLogoDarkMode
						height='20px'
						width='172px'
						position='absolute'
						left='50%'
						top='11%'
						transform='translateX(-50%)'
					/>
				)}
				{colorMode == 'dark' && isOpen && (
					<Box
						as={motion.div}
						initial={{ opacity: 0 }}
						variants={logoVariants}
						animate={isOpen ? 'close' : 'open'}
					>
						<LogoDarkMode
							height='20px'
							width='172px'
							position='absolute'
							left='50%'
							transform='translateX(-50%)'
						/>
					</Box>
				)}
			</Box>
			<Box paddingTop='28px'></Box>
			<HSeparator />
			{/* </AnimatePresence> */}
		</Box>
	);
};
