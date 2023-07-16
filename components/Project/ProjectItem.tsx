import { Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import { PROJECT_TYPE, TEXT_PROJECT_TYPE } from 'libs/constants';
import { Project } from 'types/projects';

export function ProjectItem({ project }: { project: Project }) {
	// hooks
	const textColor = useColorModeValue('text.100', 'text.100');
	const textProjectNameColor = useColorModeValue('text.200', 'text.100');
	const blueColor = useColorModeValue('brand.400', 'brand.100');
	const grayColor = useColorModeValue('gray.100', 'gray.500');
	const borderColor = useColorModeValue('blackAlpha.700', 'gray.200');
	const cardBgColor = useColorModeValue('#f8f8f8', 'navy.800');
	const cardTextColor = useColorModeValue('text.200', 'white');
	const projectPhaseBgColor = useColorModeValue('white', 'navy.700');

	return (
		<Link href={`/admin/projects/${project.id}`}>
			<a>
				<Card minH='100%' alignSelf='flex-start' bgColor={cardBgColor}>
					<CardHeader mb='18px'>
						<Flex height={'100%'} justifyContent={'center'} direction='column'>
							<Flex justifyContent={'space-between'} direction={'row'}>
								{project.type && (
									<Text
										fontSize='14px'
										color={textColor}
										fontWeight='600'
										lineHeight='24px'
										mb='16px'
									>
										{TEXT_PROJECT_TYPE[project.type]}
									</Text>
								)}
								<Text
									fontSize='14px'
									color={textColor}
									fontWeight='600'
									lineHeight='24px'
									mb='16px'
								>
									{project.org.name}
								</Text>
							</Flex>
							<Text
								fontSize='16px'
								lineHeight='24px'
								color={textProjectNameColor}
								fontWeight='600'
								mb='8px'
							>
								{project.name}
							</Text>
						</Flex>
					</CardHeader>
					<CardBody>
						<Flex
							direction='column'
							bgColor={projectPhaseBgColor}
							p='16px'
							borderRadius='8px'
						>
							<Text
								color={cardTextColor}
								fontSize='14px'
								fontWeight='400'
								lineHeight='24px'
							>
								{project.description}
							</Text>
							{project.type !== 'scan' && (
								<Flex
									me='10px'
									width='100%'
									justifyContent='stretch'
									title={`${project.phase} / ${project.phases} Phase Completed`}
								>
									{Array.from({ length: project.phases }).map((_, i, array) => (
										<Button
											key={i}
											variant='no-effects'
											flex='1'
											h='16px'
											fontSize='xs'
											bg={i < project.phase ? blueColor : grayColor}
											borderRightRadius={i == array.length - 1 ? '10px' : '0'}
											borderLeftRadius={i == 0 ? '10px' : '0'}
											borderRightColor={borderColor}
											borderRightWidth={i < array.length - 1 ? '2px' : '0'}
										/>
									))}
								</Flex>
							)}
						</Flex>

						{project.type === PROJECT_TYPE.COMPLIANCE &&
							project.dueAt !== null && (
								<Flex
									w='100%'
									direction='row'
									justify='space-between'
									pt='16px'
								>
									<Text
										color={cardTextColor}
										fontSize='14px'
										fontWeight='400'
										lineHeight='24px'
									>
										Due Date
									</Text>
									<Text
										fontSize='14px'
										color={cardTextColor}
										fontWeight='400'
										lineHeight='24px'
										mb='6px'
									>
										{project.dueAt
											? new Intl.DateTimeFormat('en-US', {
													year: 'numeric',
													month: '2-digit',
													day: '2-digit',
											  }).format(new Date(project.dueAt))
											: '-'}
									</Text>
								</Flex>
							)}
					</CardBody>
				</Card>
			</a>
		</Link>
	);
}
