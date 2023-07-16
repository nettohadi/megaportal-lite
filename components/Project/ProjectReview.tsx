import { useState } from 'react';

import {
	Button,
	Flex,
	Text,
	Textarea,
	useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import { useLoadingProgress } from 'components/Loading/LoadingProgress';
import { CREATE_COMMENT_MUTATION } from 'graphql/comments.graphql';
import { UPDATE_TASK_STATUS_MUTATION } from 'graphql/task.graphql';
import { fetchData } from 'libs';
import { PAGES_NAME, ROLE_TYPE, STATUS } from 'libs/constants';
import { useUserQuery } from 'libs/hooks/useUserQuery';
import { Task } from 'types/task';

import { useTaskQuery } from './useTasksQuery';

const ROLE_CAN_REVIEW = [
	ROLE_TYPE.SUPER_ADMIN,
	ROLE_TYPE.ORG_ADMIN,
	ROLE_TYPE.AUDITOR,
];

export const ProjectReview = () => {
	const [message, setMessage] = useState<{ [key in string]: string }>();

	const { start, done } = useLoadingProgress();
	const router = useRouter();
	const user = useUserQuery();
	const { requirements, mutate } = useTaskQuery(
		router.query.projectId as string
	);

	const tasks: Task[] = [];
	let isHaveReviews = false;

	const textColor = useColorModeValue('gray.600', 'white');

	if (requirements) {
		requirements.forEach((requirement) => {
			if (requirement.tasks) {
				requirement.tasks.forEach((task) => {
					if (
						[STATUS.NEW, STATUS.IN_PROGRESS].includes(task.status as STATUS)
					) {
						tasks.push(task);
					}
				});
			}
		});
	}

	const handleApprove = async (id: string) => {
		start({ name: 'CREATE_COMMENT_MUTATION', type: 2 });

		await Promise.all([
			mutate(
				fetchData(CREATE_COMMENT_MUTATION, {
					userId: user?.id,
					message: (message && message[id]) || '',
					moduleId: id,
					module: PAGES_NAME.TASK_REVIEW,
				}),
				{
					rollbackOnError: true,
					populateCache: true,
					revalidate: true,
				}
			),
			mutate(
				fetchData(UPDATE_TASK_STATUS_MUTATION, {
					id,
					status: STATUS.REVIEW,
				})
			),
		]);

		done({ name: 'CREATE_COMMENT_MUTATION', type: 2 });
	};

	if (user) {
		isHaveReviews = ROLE_CAN_REVIEW.includes(user?.role_id as ROLE_TYPE);
	}

	const handleAutoApprove = async (id: string) => {
		if (!isHaveReviews) {
			start({ name: 'UPDATE_TASK_STATUS_MUTATION', type: 2 });
			await mutate(
				fetchData(UPDATE_TASK_STATUS_MUTATION, {
					id,
					status: STATUS.COMPLETE,
				})
			);
			done({ name: 'UPDATE_TASK_STATUS_MUTATION', type: 2 });
		}
	};

	const handleReject = async (id: string) => {
		start({ name: 'CREATE_COMMENT_MUTATION', type: 2 });

		await Promise.all([
			mutate(
				fetchData(CREATE_COMMENT_MUTATION, {
					userId: user?.id,
					message: (message && message[id]) || '',
					moduleId: id,
					module: PAGES_NAME.TASK_REVIEW,
				}),
				{
					rollbackOnError: true,
					populateCache: true,
					revalidate: true,
				}
			),
			mutate(
				fetchData(UPDATE_TASK_STATUS_MUTATION, {
					id,
					status: STATUS.REJECT,
				})
			),
		]);

		done({ name: 'CREATE_COMMENT_MUTATION', type: 2 });
	};

	return (
		<div>
			<Text fontSize='xl' fontWeight='bold' mb='5'>
				{tasks.length > 0
					? 'Items for review'
					: 'No items currently for review'}
			</Text>
			{tasks.length > 0 &&
				tasks.map((task, index) => {
					return (
						<Card p='16px' my='24px' key={index} w='50%'>
							<CardBody px='5px' pt='5px'>
								<Flex
									key={index}
									direction='column'
									justifyContent='space-between'
								>
									<Flex direction='column'>
										<Text fontSize='large' fontWeight='medium'>
											{task.title}
										</Text>
										<Text fontSize='sm' color={textColor} pt='5px'>
											Description: {task.description}
										</Text>
									</Flex>
									{isHaveReviews && (
										<Textarea
											my='14px'
											w='100%'
											placeholder='Add your comment here'
											value={
												message && message[task.id] ? message[task.id] : ''
											}
											onChange={(e) =>
												setMessage({ ...message, [task.id]: e.target.value })
											}
										/>
									)}
									<Flex mt='2' justifyContent='flex-end'>
										{isHaveReviews ? (
											<>
												<Button
													w='100px'
													mr='5'
													variant='danger'
													fontSize='14px'
													// colorScheme='red'
													onClick={() => handleReject(task.id)}
												>
													Reject
												</Button>
												<Button
													w='100px'
													fontSize='14px'
													variant='primary'
													onClick={() => handleApprove(task.id)}
												>
													Approve
												</Button>
											</>
										) : (
											<>
												{[STATUS.REVIEW].includes(task.status as STATUS) && (
													<Button
														variant='primary'
														onClick={() => handleAutoApprove(task.id)}
														fontSize='sm'
													>
														Un-request review and auto approve
													</Button>
												)}
											</>
										)}
									</Flex>
								</Flex>
							</CardBody>
						</Card>
					);
				})}
		</div>
	);
};
