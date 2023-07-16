import { useRef } from 'react';

import { CloseIcon } from '@chakra-ui/icons';
import { Box, useColorModeValue, IconButton, Flex } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

import { SidebarContent } from './SidebarContent';

interface Props {
	routes: any;
	colorMode?: string;
	hamburgerColor?: any;
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

// desktop sidebar
function Sidebar({ routes, isOpen, onOpen, onClose }: Props) {
	const mainPanel = useRef();
	const variantChange = '0.2s linear';

	const sidebarBg = useColorModeValue('#f8f8f8', 'navy.800');
	const sidebarMargins = '0px';

	return (
		<Flex>
			<Box
				display={{ sm: 'none', lg: 'block' }}
				position='fixed'
				ref={mainPanel as any}
				// onClose={onClose}
				// isOpen={isOpen}
			>
				<Box
					bg={sidebarBg}
					transition={variantChange}
					// w='304px'
					// maxW='304px'
					// ms={{
					// 	sm: '16px',
					// }}
					// my={{
					// 	sm: '16px',
					// }}
					ps='16px'
					pe='16px'
					w={isOpen ? '304px' : '75px'}
					h='100%'
					m={sidebarMargins}
					position='fixed'

					// filter='drop-shadow(0px 5px 14px rgba(0, 0, 0, 0.05))'
					// borderRadius={sidebarRadius}
				>
					<IconButton
						background='none'
						mt={5}
						_hover={{ background: 'none' }}
						icon={isOpen ? <CloseIcon /> : <FiMenu />}
						onClick={isOpen ? onClose : onOpen}
						aria-label={''}
					/>
					<Box
						flexDir='column'
						w='100%'
						alignItems={isOpen ? 'flex-start' : 'center'}
					>
						{/* <IconButton
							background='none'
							mt={5}
							_hover={{ background: 'none' }}
							icon={<FiMenu />}
							onClick={() => {
								if (navSize == 'small') changeNavSize('large');
								else changeNavSize('small');
							}}
							aria-label={''}
						/> */}
						<SidebarContent routes={routes} isOpen={isOpen} />
						{/* <Scrollbars
							autoHide
							universal
							renderTrackVertical={renderTrack}
							renderThumbVertical={useColorModeValue(
								renderThumbLight,
								renderThumbDark
							)}
							renderView={renderView}
						>
							<SidebarContent routes={routes} isOpen={isOpen} />
						</Scrollbars> */}
					</Box>
				</Box>
			</Box>
		</Flex>
	);
}

export default Sidebar;
