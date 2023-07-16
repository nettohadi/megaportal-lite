import { useToast, UseToastOptions } from '@chakra-ui/react';

const baseConfigNotify: UseToastOptions = {
	isClosable: true,
	position: 'bottom-left',
};

const useNotify = () => {
	const toast = useToast();

	const notifySuccess = (message: string) => {
		return toast({
			title: message,
			status: 'success',
			...baseConfigNotify,
		});
	};

	const notifyError = (message: string) => {
		return toast({
			title: message,
			status: 'error',
			...baseConfigNotify,
		});
	};

	const notifyWarning = (message: string) => {
		return toast({
			title: message,
			status: 'warning',
			...baseConfigNotify,
		});
	};

	return {
		notifySuccess,
		notifyError,
		notifyWarning,
	};
};

export default useNotify;
