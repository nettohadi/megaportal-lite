import { Box, Flex, Stack, Text } from '@chakra-ui/react';

import IconBox from 'components/Icons/IconBox';
import { ArrowRightIcon, CheckedIcon } from 'components/Icons/Icons';

import { BoxCircleStyled } from './styles';

interface IProps {
	stepsDone?: Array<number>;
}
function OnboardingSidebar({ stepsDone }: IProps) {
	const steps = [
		{
			title: 'Verify Information',
			description: 'Please verify that all pre-filled\ninformation is correct',
		},
		{
			title: 'Enter Information',
			description: 'Fill out remaining company\ninformation',
		},
		// {
		// 	title: 'Setup Authentication',
		// 	description: 'Create Password and setup 2 factor\nauthentication',
		// },
		{
			title: 'Invite members to organization',
			description: 'Invite additional members to your\norganization',
		},
	];

	return (
		<Box
			p={{ base: '10px', xl: '30px', '2xl': '40px' }}
			pt='40px !important'
			h='100%'
			width='100%'
		>
			<Text
				fontSize='24px'
				fontWeight='500'
				textAlign='center'
				lineHeight='22px'
				whiteSpace='pre-line'
			>
				{'Please complete all\nregistration steps'}
			</Text>
			<Stack direction='column' mb='40px' pl='10px' mt='40px' spacing='0'>
				{steps.map(({ title, description }, index) => (
					<Flex
						align='center'
						key={index}
						textAlign='center'
						p='16px 0 0 64px'
						position='relative'
						mt='0px'
					>
						<BoxCircleStyled
							children={
								stepsDone?.includes(index) ? <CheckedIcon /> : index + 1
							}
						/>
						<Stack
							direction='row'
							borderBottom='1px solid #E2E2E2'
							w='100%'
							position='relative'
						>
							<Box textAlign='left' pb='16px'>
								<Text
									fontWeight='500'
									fontSize='16px'
									lineHeight='20px'
									pb='4px'
								>
									{title}
								</Text>
								<Text
									fontWeight='400'
									fontSize='14px'
									lineHeight='20px'
									color='#545454'
									whiteSpace='pre-line'
								>
									{description}
								</Text>
							</Box>
							<IconBox
								w='20px'
								h='20px'
								me='22px'
								position='absolute'
								right='15px'
								top='29%'
							>
								<ArrowRightIcon
									w='20px'
									h='20px'
									alignSelf='center'
									justifySelf='center'
								/>
							</IconBox>
						</Stack>
					</Flex>
				))}
			</Stack>
		</Box>
	);
}

export default OnboardingSidebar;
