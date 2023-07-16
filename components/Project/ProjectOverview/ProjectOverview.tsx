import { useMemo } from 'react';

import { CalendarIcon, TimeIcon, ChatIcon } from '@chakra-ui/icons';
import {
	Button,
	Flex,
	HStack,
	Icon,
	SimpleGrid,
	Spacer,
	Stack,
	Stat,
	StatLabel,
	StatNumber,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { differenceInDays } from 'date-fns';
import _ from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CircularSlider from 'react-circular-slider-svg';
import { AiOutlineFileText } from 'react-icons/ai';
import { RiArrowDropRightLine } from 'react-icons/ri';

import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import { Task } from 'types/task';

import { useProjectQuery } from '../useProjectQuery';
import { useTaskQuery } from '../useTasksQuery';

const findInArray = (arr: any, value: string) =>
	_.filter(arr, function (i) {
		return i.status === value;
	});

export const ProjectOverview = () => {
	const textColor = useColorModeValue('text.100', 'white');
	const arcBackgroundColor = useColorModeValue('#EDF2F7', '#0B1437');
	const cardTextColor = useColorModeValue('text.200', 'white');
	const taskBg = useColorModeValue('#f8f8f8', 'navy.700');
	const cardBgColor = useColorModeValue('#ffffff', 'navy.700');

	const router = useRouter();

	const { project } = useProjectQuery(router.query.projectId as string);
	const { requirements } = useTaskQuery(router.query.projectId as string);

	const tasks: Task[] = [];
	if (requirements) {
		requirements.forEach((requirement) => {
			if (requirement.tasks) {
				tasks.push(...requirement.tasks);
			}
		});
	}

	const inProgressTasks = findInArray(tasks, 'in_progress');
	const completedTasks = findInArray(tasks, 'complete');
	const newTasks = findInArray(tasks, 'new');
	const reviewTasks = findInArray(tasks, 'review');
	const openTasks = [...inProgressTasks, ...newTasks, ...reviewTasks];

	const allTasksCount = tasks?.length || 0;
	const allCompletedTasks = completedTasks.length || 0;
	// const allInProgressTasks = inProgressTasks.length || 0;
	// const allNewTasks = newTasks.length || 0;
	const allReviewTasks = reviewTasks.length || 0;
	// const allOpenTasks = openTasks.length || 0;
	const allRemainingTasks = allTasksCount - allCompletedTasks;

	const diffDays = useMemo(
		() => differenceInDays(new Date(project?.dueAt), Date.now()),
		[project?.dueAt]
	);
	const dateColor = useMemo(() => {
		if (diffDays <= 0) {
			return useColorModeValue('red.500', 'red.300');
		}
		if (diffDays >= 0 && diffDays < 7) {
			return useColorModeValue('red.500', 'red.300');
		} else if (diffDays >= 0 && diffDays < 30) {
			return useColorModeValue('orange.500', 'orange.300');
		} else {
			return useColorModeValue('gray.700', 'white');
		}
	}, [diffDays]);

	return (
		<>
			<SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px' mb='20px'>
				<Stack
					direction={{
						sm: 'column',
						md: 'row',
						lg: 'column',
					}}
					maxW={{ md: '100%' }}
					spacing='24px'
				>
					<Card bg={cardBgColor}>
						<CardHeader>
							<HStack>
								<ChatIcon />
								<Text
									fontSize='14px'
									textColor={textColor}
									fontWeight='600'
									lineHeight='24px'
								>
									5 Latest Comments
								</Text>
							</HStack>
						</CardHeader>
						<Flex
							direction='column'
							w='100%'
							h={{ sm: '100%', md: '100%', lg: '150px' }}
						>
							<Text
								mt={5}
								fontSize='14px'
								fontWeight='600'
								lineHeight='24px'
								textColor={cardTextColor}
							>
								[todo]
							</Text>
						</Flex>
					</Card>
				</Stack>
				<Flex direction='column'>
					<Card minH='100px' mb='20px' bg={cardBgColor}>
						<Flex direction='column'>
							<Flex
								flexDirection='row'
								align='center'
								justify='center'
								w='100%'
							>
								<Stat me='auto'>
									<HStack>
										<CalendarIcon />
										<StatLabel
											fontSize='14px'
											textColor={textColor}
											fontWeight='600'
											lineHeight='24px'
											textTransform='uppercase'
										>
											Started on
										</StatLabel>
									</HStack>
									<Flex>
										<StatNumber
											fontSize='14px'
											lineHeight='24px'
											color={cardTextColor}
											fontWeight='600'
											mt='16px'
										>
											{project?.createdAt
												? new Intl.DateTimeFormat('en-US', {
														year: 'numeric',
														month: '2-digit',
														day: '2-digit',
												  }).format(new Date(project?.createdAt))
												: null}
										</StatNumber>
									</Flex>
								</Stat>
							</Flex>
						</Flex>
					</Card>
					<Card minH='100px' mb='20px' bg={cardBgColor}>
						<Flex direction='column'>
							<Flex
								flexDirection='row'
								align='center'
								justify='center'
								w='100%'
							>
								<Stat me='auto'>
									<HStack>
										<TimeIcon />
										<StatLabel
											fontSize='14px'
											textColor={textColor}
											fontWeight='600'
											lineHeight='24px'
											textTransform='uppercase'
										>
											Days Left
										</StatLabel>
									</HStack>
									<StatNumber
										fontSize='14px'
										lineHeight='24px'
										fontWeight='600'
										mt='16px'
										color={dateColor}
									>
										{diffDays > 0 ? diffDays : 0}
									</StatNumber>
								</Stat>
							</Flex>
						</Flex>
					</Card>
				</Flex>
				<Flex direction='column'>
					<Card minH='100px' mb='20px' bg={cardBgColor}>
						<Flex direction='column'>
							<Flex
								flexDirection='row'
								align='center'
								justify='center'
								w='100%'
							>
								<Stat me='auto'>
									<StatLabel
										fontSize='14px'
										textColor={textColor}
										fontWeight='600'
										lineHeight='24px'
										textTransform='uppercase'
									>
										Tasks Remaining
									</StatLabel>
									{tasks && tasks.length > 0 ? (
										<Flex>
											<StatNumber
												fontSize='14px'
												lineHeight='24px'
												color={cardTextColor}
												fontWeight='600'
												mt='16px'
											>
												{allRemainingTasks}
											</StatNumber>
										</Flex>
									) : (
										<Flex>
											<Text mt={5} fontSize='sm' color={textColor}>
												None
											</Text>
										</Flex>
									)}
								</Stat>
							</Flex>
						</Flex>
					</Card>
					<Card minH='100px' mb='20px' bg={cardBgColor}>
						<Flex direction='column'>
							<Flex
								flexDirection='row'
								align='center'
								justify='center'
								w='100%'
							>
								<Stat me='auto'>
									<StatLabel
										fontSize='14px'
										textColor={textColor}
										fontWeight='600'
										lineHeight='24px'
										textTransform='uppercase'
									>
										Tasks Pending Review
									</StatLabel>
									{tasks && tasks.length > 0 ? (
										<Flex>
											<StatNumber
												fontSize='14px'
												lineHeight='24px'
												color={cardTextColor}
												fontWeight='600'
												mt='16px'
											>
												{allReviewTasks}
											</StatNumber>
										</Flex>
									) : (
										<Flex>
											<Text mt={5} fontSize='sm' color={textColor}>
												None
											</Text>
										</Flex>
									)}
								</Stat>
							</Flex>
						</Flex>
					</Card>
				</Flex>
				<Flex direction='column'>
					<Card minH='100px' bg={cardBgColor}>
						<CardHeader>
							<Text
								fontSize='14px'
								textColor={textColor}
								fontWeight='600'
								lineHeight='24px'
							>
								Tasks Completed
							</Text>
						</CardHeader>

						<Flex
							direction='column'
							align='center'
							alignSelf='center'
							textAlign='center'
							position='relative'
							height='150px'
							justifyContent={tasks && tasks.length > 0 ? 'inherit' : 'center'}
						>
							{tasks && tasks.length > 0 ? (
								<>
									<CircularSlider
										startAngle={80}
										endAngle={280}
										handleSize={6}
										minValue={0}
										maxValue={allTasksCount}
										size={200}
										arcColor='#3182CE'
										arcBackgroundColor={arcBackgroundColor}
										handle1={{
											value: allCompletedTasks,
										}}
									/>
									<Text
										color={textColor}
										fontSize='28px'
										fontWeight='bold'
										position='absolute'
										top='42%'
									>
										{allCompletedTasks} / {allTasksCount}
									</Text>
								</>
							) : (
								<Text mt={5} fontSize='sm' color={textColor}>
									None
								</Text>
							)}
						</Flex>
					</Card>
				</Flex>
			</SimpleGrid>
			{tasks && tasks.length > 0 && (
				<>
					<SimpleGrid columns={{ sm: 1, md: 2 }} spacing='24px' mb='20px'>
						{/* tasks ready for review */}
						<Stack
							direction={{
								sm: 'column',
								md: 'row',
								lg: 'column',
							}}
							maxW={{ md: '100%' }}
							spacing='24px'
						>
							<Card>
								<CardHeader>
									<HStack>
										<Icon as={AiOutlineFileText} />
										<Text
											fontSize='14px'
											textColor={textColor}
											fontWeight='600'
											lineHeight='24px'
										>
											Tasks Ready for Review
										</Text>
									</HStack>
								</CardHeader>
								<Flex direction='column' w='100%' pt='28px'>
									<Stack direction='column' w='100%'>
										{reviewTasks.map(({ title, id }) => {
											const taskLink = `/admin/projects/${router.query.projectId}/t/${id}`;

											const innerContent = (
												<Link href={taskLink}>
													<a>
														<Flex
															align='center'
															w='100%'
															data-group
															bgColor={taskBg}
															borderRadius='12px'
															px='12px'
															height='48px'
														>
															<Flex align='center'>
																<Flex direction='column'>
																	<Text fontSize='sm' color={textColor}>
																		{title}
																	</Text>
																</Flex>
															</Flex>
															<Spacer />
															<Button variant='no-effects' px='0px'>
																<Icon
																	as={RiArrowDropRightLine}
																	color='gray.400'
																	w='30px'
																	h='30px'
																	cursor='pointer'
																	transition='all .25s ease'
																	_groupHover={{
																		transform: 'translateX(25%)',
																	}}
																/>
															</Button>
														</Flex>
													</a>
												</Link>
											);

											return <>{innerContent}</>;
										})}

										{openTasks.map(({ title, id }) => {
											const taskLink = `/admin/projects/${router.query.projectId}/t/${id}`;

											const innerContent = (
												<Link href={taskLink}>
													<a>
														<Flex
															align='center'
															w='100%'
															data-group
															bgColor={taskBg}
															borderRadius='12px'
															px='12px'
															height='48px'
														>
															<Flex align='center'>
																<Flex direction='column'>
																	<Text fontSize='sm' color={textColor}>
																		{title}
																	</Text>
																</Flex>
															</Flex>
															<Spacer />

															<Button variant='no-effects' px='0px'>
																<Icon
																	as={RiArrowDropRightLine}
																	color='gray.400'
																	w='30px'
																	h='30px'
																	cursor='pointer'
																	transition='all .25s ease'
																	_groupHover={{
																		transform: 'translateX(25%)',
																	}}
																/>
															</Button>
														</Flex>
													</a>
												</Link>
											);

											return (
												<>
													{innerContent}
													{/* {idx + 1 !== reviewTasks.length && <HSeparator />} */}
												</>
											);
										})}
									</Stack>
								</Flex>
							</Card>
						</Stack>
						{/* open tasks */}
						<Stack
							direction={{
								sm: 'column',
								md: 'row',
								lg: 'column',
							}}
							maxW={{ md: '100%' }}
							spacing='24px'
						>
							<Card>
								<CardHeader>
									<HStack>
										<Icon as={AiOutlineFileText} />
										<Text
											fontSize='14px'
											textColor={textColor}
											fontWeight='600'
										>
											Open Tasks
										</Text>
									</HStack>
								</CardHeader>
								<Flex direction='column' w='100%' pt='28px'>
									<Stack direction='column' w='100%'>
										{openTasks.map(({ title, id }) => {
											const taskLink = `/admin/projects/${router.query.projectId}/t/${id}`;

											const innerContent = (
												<Link href={taskLink}>
													<a>
														<Flex
															align='center'
															w='100%'
															data-group
															bgColor={taskBg}
															borderRadius='12px'
															px='12px'
															height='48px'
														>
															<Flex align='center'>
																<Flex direction='column'>
																	<Text fontSize='sm' color={textColor}>
																		{title}
																	</Text>
																</Flex>
															</Flex>
															<Spacer />

															<Button variant='no-effects' px='0px'>
																<Icon
																	as={RiArrowDropRightLine}
																	color='gray.400'
																	w='30px'
																	h='30px'
																	cursor='pointer'
																	transition='all .25s ease'
																	_groupHover={{
																		transform: 'translateX(25%)',
																	}}
																/>
															</Button>
														</Flex>
													</a>
												</Link>
											);

											return <>{innerContent}</>;
										})}
									</Stack>
								</Flex>
							</Card>
						</Stack>
					</SimpleGrid>
				</>
			)}
		</>
	);
};
