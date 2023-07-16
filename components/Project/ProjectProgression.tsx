import { CSSProperties } from 'react';

import {
	Button,
	Flex,
	Stack,
	Text,
	useColorModeValue,
	type ButtonProps,
} from '@chakra-ui/react';

import { useProgression } from 'components/Project/useProgression';

export const ProjectProgression = () => {
	const progression = useProgression((s) => s.progression);
	const percent = progression * 100;

	// colors
	const bgColor = useColorModeValue('white', 'gray.500');
	const cardBgColor = useColorModeValue('#f8f8f8', 'navy.800');
	const cardTextColor = useColorModeValue('text.200', 'white');
	const lineColor = useColorModeValue('blackAlpha.700', 'gray.200');
	const progressBackgroundColor = useColorModeValue('#68D391', 'blue.300');

	return (
		<Flex
			gap={5}
			mb='20px'
			direction={{ xl: 'row', md: 'row', sm: 'column-reverse' }}
		>
			<Flex
				direction='column'
				flex={{ xl: 8, md: 1 }}
				bgColor={cardBgColor}
				borderRadius='16px'
				height='120px'
				gap='12px'
				mx='20px'
			>
				<Stack
					direction='row'
					justify='space-between'
					mb='1'
					width='auto'
					mx='20px'
					my='12px'
				>
					<Text fontSize='sm' fontWeight='semibold' color={cardTextColor}>
						PROJECT PROGRESSION
					</Text>
					<Text fontSize='sm' fontWeight='semibold' color={cardTextColor}>
						{percent.toFixed(0)}% COMPLETE
					</Text>
				</Stack>
				<Flex
					me='10px'
					width='auto'
					justifyContent='stretch'
					// boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.08)'
					height='24px'
					borderRadius='10px'
					mx='20px'
				>
					{[20, 40, 60, 80, 100].map((value, index) => {
						let buttonStyles: ButtonProps = {
							borderRadius: '0',
							cursor: 'auto',
						};
						let progressBackground: CSSProperties = {
							width: '100%',
							height: '100%',
						};
						if (percent >= value) {
							progressBackground = {
								...progressBackground,
								backgroundColor: progressBackgroundColor,
							};
						} else if (value - percent <= 20) {
							progressBackground = {
								...progressBackground,
								backgroundColor: progressBackgroundColor,
								width: `${(percent / value) * 100}%`,
							};
						}
						if (index === 0) {
							buttonStyles = {
								...buttonStyles,
								borderRadius: '8px',
								borderRightRadius: '0',
							};
						}
						if (index === 4) {
							buttonStyles = {
								...buttonStyles,
								borderRadius: '8px',
								borderLeftRadius: '0',
								borderRightWidth: 0,
							};
						}
						return (
							<Button
								key={index}
								variant='no-effects'
								flex='1'
								h='40px'
								fontSize='xs'
								borderRightColor={lineColor}
								borderRightWidth='2px'
								p='0'
								justifyContent='flex-start'
								overflow='hidden'
								backgroundColor={bgColor}
								{...buttonStyles}
							>
								<div style={progressBackground} />
							</Button>
						);
					})}
				</Flex>
			</Flex>
		</Flex>
	);
};
