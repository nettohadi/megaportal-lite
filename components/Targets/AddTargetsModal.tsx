import { useState, useCallback } from 'react';

import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import { FormikHelpers, useFormik } from 'formik';
import uniqBy from 'lodash/uniqBy';
import { useRouter } from 'next/router';


import { useLoadingProgress } from 'components/Loading/LoadingProgress';
import {
	AddTargetsForm,
	TargetValueSchema,
} from 'components/Targets/AddTargetsForm';
import { TargetCompactFragment } from 'graphql/targets.graphql';
import { useListTargetsByProjectIdQuery } from 'libs/hooks/targets/useListTargetsByProjectIdQuery';
import { useListTargetsTagsQuery } from 'libs/hooks/targets/useListTargetsTagsQuery';
import { createTargets } from 'libs/mutations/createTargets';
import { TargetValue } from 'types/scans';
import {
	isTargetValidExternalTarget,
	isTargetValidInternalTarget,
	isIpRegex,
	validationDNS,
} from 'utils/formik';
import { getIpRangeSize } from 'utils/ip/getIpRangeSize';
import { parseCIDR } from 'utils/ip/parseCIDR';

export interface AddTargetsModalProps {
	id: string;
	isLoading?: boolean;
	isOpen: boolean;
	isInternal: boolean;
	onClose: () => void;
}

export interface Item {
	label: string;
	value: string;
}

export function AddTargetsModal({
	id,
	isLoading,
	isOpen,
	isInternal,
	onClose,
}: AddTargetsModalProps) {
	// hooks
	const router = useRouter();
	const toast = useToast();
	const { start, done } = useLoadingProgress();

	const projectId = router.query.projectId as string;
	const { targets: projTargets, mutate: mutateTargets } =
		useListTargetsByProjectIdQuery(projectId);
	const { targets: projTags } = useListTargetsTagsQuery(projectId);

	const [targets, setTargets] = useState<TargetValue[]>([]);

	const handleTargetFormSubmit = useCallback(
		async (value: TargetValue, formikHelpers: FormikHelpers<TargetValue>) => {
			const isTargetIp = isIpRegex(value.target);
			const rangeSize = getIpRangeSize(value.target);
			let isValidDNS = true;

			if (!isTargetIp) {
				const dnsValidationResult = await validationDNS(value.target);
				isValidDNS = dnsValidationResult?.data?.isValid || false;
			}

			if (rangeSize) {
				const addresses = parseCIDR(value.target);

				const existingTargets = targets.filter((t) =>
					addresses.includes(t.target)
				);

				if (existingTargets.length) {
					if (existingTargets.length === addresses.length) {
						toast({
							status: 'error',
							title: 'All targets have been added already',
							description: `All targets in this range were skipped because they have already been added`,
						});
					} else {
						toast({
							status: 'info',
							title: 'Some of the targets were skipped',
							description: `${existingTargets.length} targets were skipped because they have already been added`,
						});
					}
				}

				if (existingTargets.length !== addresses.length) {
					// if dns is valid
					if (isValidDNS) {
						setTargets((prevValue) => [
							...(prevValue ?? []),
							...(addresses
								.filter(
									(address) =>
										!existingTargets.find((t) => t.target === address)
								)
								.map((address) => ({
									label: value.label,
									target: address,
								})) ?? []),
						]);
						formikHelpers.resetForm();
					} else {
						formikHelpers.setFieldError('target', 'Invalid domain');
					}
				}
			} else {
				// if dns is valid
				if (isValidDNS) {
					setTargets((prevValue) => [...prevValue, value]);
					formikHelpers.resetForm();
				} else {
					formikHelpers.setFieldError('target', 'Invalid domain');
				}
			}
		},
		[targets, toast]
	);

	const targetForm = useFormik<TargetValue>({
		initialValues: {
			target: '',
			label: '',
		},
		validationSchema: TargetValueSchema(isInternal),
		onSubmit: handleTargetFormSubmit,
		validate: (targetValue) => {
			if (!targetValue.target) {
				return {
					target: 'Please specify a target value',
				};
			}
			return !isInternal
				? isTargetValidExternalTarget(targetValue.target)
				: isTargetValidInternalTarget(targetValue.target);
		},
	});

	const handleOnSubmit = () => {
		if (targets && targets.length > 0) {
			if (!projectId) {
				return;
			}
			const checkExistingTargets = targets.filter((targetFormValue) =>
				projTargets
					? !projTargets.find(
							(existingTarget: TargetValue) =>
								existingTarget.target === targetFormValue.target
					  )
					: targetFormValue
			);
			start({ name: 'CREATE_TARGETS_MUTATION', type: 2 });
			mutateTargets();
			// TODO mutate cache
			// mutateTargets(
			// 	(prevValue) => {
			// 		return {
			// 			targets: [
			// 				...(prevValue?.targets ?? []),
			// 				...checkExistingTargets.map(
			// 					(targetFormValue) =>
			// 						({
			// 							id: `${targetFormValue.target}-${targetFormValue.label}`,
			// 							label: targetFormValue.label,
			// 							project_id: projectId,
			// 							target: targetFormValue.target,
			// 							created_date: Date.now(),
			// 						} as TargetCompactFragment)
			// 				),
			// 			],
			// 		};
			// 	},
			// 	{ revalidate: false }
			// );

			const newTargetsToCreate = checkExistingTargets.map(
				(targetFormValue) => ({
					label: targetFormValue.label,
					project_id: projectId,
					target: targetFormValue.target,
				})
			);
			createTargets(newTargetsToCreate)
				.then((res) => {
					toast({
						title: `Succesfully imported ${res.insert_targets.affected_rows} items`,
						position: 'bottom-left',
						isClosable: true,
						status: 'success',
					});
				})
				.catch((error) => {
					toast({
						title: `Couldn't create a target`,
						description: error.message,
						status: 'error',
					});
				})
				.finally(() => {
					done({ name: 'CREATE_TARGETS_MUTATION', type: 2 });
				});

			setTargets([]);
		}
		onClose();
	};

	const handleAddTargets = useCallback(
		(addedTargets: TargetValue[]) => {
			const cidrTargets = addedTargets
				.map((value) => {
					const rangeSize = getIpRangeSize(value.target);

					if (rangeSize) {
						const addresses = parseCIDR(value.target);

						return addresses.map((address) => ({
							label: value.label,
							target: address,
						}));
					}
					return [value];
				})
				.flat();

			const targetsToAdd = uniqBy(cidrTargets, 'target');

			const existingTargets = targetsToAdd.filter((t) =>
				targets.find((existingTarget) => existingTarget.target === t.target)
			);

			if (existingTargets.length) {
				if (existingTargets.length === targetsToAdd.length) {
					toast({
						status: 'error',
						title: 'All targets have been added already',
						description: `All targets in this range were skipped because they have already been added`,
					});
				} else {
					toast({
						status: 'info',
						title: 'Some of the targets were skipped',
						description: `${existingTargets.length} targets were skipped because they have already been added`,
					});
				}
			}

			if (existingTargets.length !== targetsToAdd.length) {
				setTargets((prevValue) => [
					...(prevValue ?? []),
					...(targetsToAdd.filter(
						(t) =>
							!targets.find(
								(existingTarget) => existingTarget.target === t.target
							)
					) ?? []),
				]);
			}
		},
		[targets, toast]
	);

	const modalBackgroundColor = useColorModeValue('white', 'navy.800');

	return (
		<Modal
			id={id}
			isOpen={isOpen}
			onClose={onClose}
			size='2xl'
			closeOnOverlayClick={false}
		>
			<ModalOverlay />
			<ModalContent bgColor={modalBackgroundColor}>
				<ModalCloseButton />
				<ModalHeader>Add Targets</ModalHeader>
				<ModalBody mt={5}>
					<AddTargetsForm
						form={targetForm}
						isLoading={isLoading}
						targets={targets}
						tags={projTags}
						projTargets={[]}
						tablePosition='bottom'
						onAddTargets={handleAddTargets}
						onRemoveTargets={() => console.log('function not implemented')}
						isInternalScan={isInternal}
					/>
				</ModalBody>
				<ModalFooter>
					<Button onClick={onClose}>Cancel</Button>
					<Button
						ml={4}
						color='primary'
						disabled={targets.length === 0}
						onClick={handleOnSubmit}
					>
						Submit
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
