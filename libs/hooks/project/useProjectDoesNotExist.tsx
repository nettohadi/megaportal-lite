import { useEffect } from 'react';

import { useToast, Flex, Text, FlexProps } from '@chakra-ui/react';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';

import { ProjectSmall } from 'graphql/projects.graphql';
import { Project } from 'types/projects';

export function ProjectDoesNotExist(props: FlexProps) {
	return (
		<Flex flexDirection={'column'} {...props}>
			<Text as='p'>{`Project doesn't exist.`}</Text>
			<NextLink href={`/admin/projects`} passHref>
				<Text as='a' color='blue.500'>
					<Text as='span'>See all projects</Text>
				</Text>
			</NextLink>
		</Flex>
	);
}

export interface UseProjectDoesNotExistOptions {
	autoRedirect?: boolean;
	showToast?: boolean;
}

export function useProjectDoesNotExist(
	project?: Project | ProjectSmall | null,
	options?: UseProjectDoesNotExistOptions
) {
	const autoRedirect = options?.autoRedirect ?? false;
	const showToast = options?.showToast ?? false;
	const toast = useToast();
	const router = useRouter();

	useEffect(() => {
		if (project === null) {
			if (showToast) {
				toast({
					status: 'error',
					title: `Error`,
					description: `Project does not exist`,
					position: 'top',
				});
			}
			if (autoRedirect) {
				router.replace(`/admin/projects`);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [project]);

	return { projectExist: project !== null };
}
