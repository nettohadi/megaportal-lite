import { FormEvent, useState } from 'react';

import {
	Button,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';

import {
	DELETE_FILE_MUTATION,
	GET_FILE_BY_ID_QUERY,
} from 'graphql/files.graphql';
import { fetchData } from 'libs';

interface Props {
	fileIdDelete?: number;
	onClose: () => any;
	onDeleteSuccess: () => any;
}

const DeleteConfirmModal = ({
	onClose,
	fileIdDelete,
	onDeleteSuccess,
}: Props) => {
	const [loading, setLoading] = useState(false);
	const onDeleteFile = async (event: FormEvent<HTMLFormElement>) => {
		setLoading(true);
		event.preventDefault();
		const result = await fetchData(GET_FILE_BY_ID_QUERY, {
			fileId: fileIdDelete,
		});

		if (result?.files?.length) {
			await fetchData(DELETE_FILE_MUTATION, {
				fileId: fileIdDelete,
			});

			onDeleteSuccess();
		}
		setLoading(false);
	};

	return (
		<Modal
			isOpen={!!fileIdDelete}
			onClose={onClose}
			closeOnOverlayClick={false}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Are you sure you want to delete this file?</ModalHeader>
				<ModalCloseButton />
				<form onSubmit={(event) => onDeleteFile(event)}>
					<ModalFooter>
						<Button
							variant='outlined'
							w='100px'
							h='35px'
							mr={3}
							onClick={onClose}
							isLoading={loading}
						>
							Cancel
						</Button>
						<Button
							colorScheme='red'
							w='100px'
							h='35px'
							type='submit'
							data-testid='confirm-delete-organization-button'
							isLoading={loading}
						>
							Delete
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default DeleteConfirmModal;
