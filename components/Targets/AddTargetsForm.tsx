import {
	Key,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

import {
	Button,
	Center,
	Divider,
	Flex,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	HStack,
	Input,
	Link,
	Text,
	VStack,
	useDisclosure,
	Grid,
	useToast,
} from '@chakra-ui/react';
import type { BoxProps, FlexboxProps } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import uniqBy from 'lodash/uniqBy';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

import { Table } from 'components/DataTable/Table';
import { CustomDragDrop } from 'components/Scans/CustomDragDrop';
import { useAddTargetsTable } from 'components/Targets/AddTargetsTable';
import { SelectTargetsModal } from 'components/Targets/SelectTargetsModal';
import { AdminContext } from 'layouts/Admin';
import { Target, TargetValue } from 'types/scans';
import {
	isTargetValidExternalTarget,
	isTargetValidInternalTarget,
	isIpRegex,
	validationDNS,
} from 'utils/formik';
import { getIpRangeSize } from 'utils/ip/getIpRangeSize';

export const TargetValueSchema = (isInternal: boolean) =>
	Yup.object().shape({
		target: Yup.string()
			.test(
				'is-target-valid',
				'Target is not valid',
				(value, { createError }) => {
					if (!value) {
						return false;
					}

					const result = !isInternal
						? isTargetValidExternalTarget(value)
						: isTargetValidInternalTarget(value);
					const error = result?.target;

					if (error) {
						return createError({ message: error });
					}

					return result === undefined;
				}
			)
			.required('Target value is required'),
		label: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
	});

export interface AddTargetsFormProps {
	tablePosition?: 'top' | 'bottom';
	containerStyles?: FlexboxProps;
	defaultTargets?: TargetValue[];
	isLoading?: boolean;
	targets: TargetValue[];
	tags?: any;
	projTargets: Target[];
	// onAddTargets?: (targets: TargetValue[]) => Promise<void> | undefined;
	onAddTargets: (arg0: TargetValue[]) => void;
	onRemoveTargets: (arg0: TargetValue[]) => void;
	form: ReturnType<typeof useFormik<TargetValue>>;
	formContentProps?: BoxProps;
	isInternalScan?: boolean;
}

type TargetTableCallbacks = {
	onRemoveTarget: (targetData: any) => any;
};

export function AddTargetsForm({
	tablePosition = 'bottom',
	containerStyles,
	isLoading,
	targets,
	tags,
	projTargets,
	form,
	onAddTargets,
	onRemoveTargets,
	formContentProps,
	isInternalScan,
}: AddTargetsFormProps) {
	const { contextValue } = useContext(AdminContext);

	const {
		isOpen: isSelectTargetOpen,
		onOpen: onSelectTargetOpen,
		onClose: onSelectTargetClose,
	} = useDisclosure();

	const [shownData, setShownData] = useState<TargetValue[]>([]);
	const [overLimits, setOverLimits] = useState<boolean>(false);

	useEffect(() => {
		setShownData(targets);
		if (targets && contextValue.ipLimits) {
			setOverLimits(targets?.length > contextValue.ipLimits);
		}
	}, [targets, contextValue]);

	const toast = useToast();

	const addMultipleTargets = useCallback(
		async (values: TargetValue[]) => {
			values = uniqBy(values, 'target');
			const filteredTargets = await Promise.all(
				values.map(async (value) => {
					const isTargetIp = isIpRegex(value.target);
					const firstValid = isInternalScan
						? isTargetValidInternalTarget(value.target) === undefined
						: isTargetValidExternalTarget(value.target) === undefined;
					let secondValid = true;
					if (!isTargetIp) {
						const dnsValidationResult = await validationDNS(value.target);
						secondValid = dnsValidationResult?.data?.isValid;
						!secondValid &&
							toast({
								status: 'error',
								title: 'Invalid domain',
								description: `${value.target}`,
							});
					}
					value.id = uuidv4().replaceAll('-', '');
					return firstValid && secondValid ? value : null;
				})
			);
			const validTargets = filteredTargets.filter((target) => target !== null);

			const invaliedTargetsCount = values.length - validTargets.length;
			const duplicatesTargets = targets.filter((t) =>
				values.find((v) => v.target === t.target)
			);

			let validTargetsWithoutDups = [] as any;
			validTargetsWithoutDups = validTargets.filter(
				(value) =>
					!duplicatesTargets.find((dup) => dup.target === value?.target)
			);

			if (duplicatesTargets.length) {
				toast({
					status: 'warning',
					title: 'Targets duplicates',
					description: `${duplicatesTargets.length} ${
						duplicatesTargets.length === 1
							? 'target duplicate was found'
							: 'targets duplicates were found'
					}`,
				});
			}

			if (invaliedTargetsCount) {
				toast({
					status: 'warning',
					title: 'Invalid targets',
					description: `${invaliedTargetsCount} ${
						invaliedTargetsCount === 1 ? 'target was' : 'targets were'
					} not added because they are not valid ip addresses or domain names`,
				});
			}

			return onAddTargets?.(validTargetsWithoutDups);
		},
		[onAddTargets, toast, targets, isInternalScan]
	);

	const addExistingTargets = useCallback(
		(values: TargetValue[]) => {
			onAddTargets(values);
		},
		[onAddTargets]
	);

	const onRemoveTarget = useCallback<TargetTableCallbacks['onRemoveTarget']>(
		(rowData) => {
			const targetId = rowData.index;
			targets.splice(targetId, 1);
			setShownData([...targets]);
			onRemoveTargets(targets);
		},
		[targets, onRemoveTargets]
	);

	const formik = form;
	const targetValueTarget = form.values.target;
	const targetValueLabel = form.values.label;

	const duplicateTargetFull = useMemo(() => {
		return targets?.find(
			(target) =>
				target.label === targetValueLabel?.trim() &&
				target.target === targetValueTarget?.trim()
		);
	}, [targets, targetValueLabel, targetValueTarget]);

	const duplicateTarget = useMemo(() => {
		return targets?.find(
			(target) => target.target === targetValueTarget?.trim()
		);
	}, [targets, targetValueTarget]);

	const table = useAddTargetsTable(shownData, { onRemoveTarget });

	const tableNode = shownData?.length ? <Table {...table} /> : '';

	const targetValue = formik.values.target;
	const targetRangeSize = useMemo(() => {
		return getIpRangeSize(targetValue);
	}, [targetValue]);

	return (
		<>
			<FormikProvider value={form}>
				<Flex flexDirection='column' mt={0} {...containerStyles}>
					{tablePosition === 'top' && tableNode}

					<VStack alignItems='stretch' {...formContentProps}>
						<form onSubmit={formik.handleSubmit}>
							<HStack alignItems='stretch' mb={5}>
								<FormControl
									isRequired
									isInvalid={!!(formik.errors.target && formik.touched.target)}
									isDisabled={isLoading}
								>
									<FormLabel>Target</FormLabel>
									<Input
										as={Input}
										id='target'
										name='target'
										onChange={formik.handleChange}
										value={formik.values.target}
									/>
									<FormErrorMessage>{formik.errors.target}</FormErrorMessage>
									<FormHelperText>
										{isInternalScan
											? `e.g. 192.168.0.1 or 192.168.0.0/24`
											: `e.g. www.megaplanit.com or 8.8.8.8`}
									</FormHelperText>
									{!!targetRangeSize && (
										<FormHelperText
											color={'orange'}
										>{`This will create ${targetRangeSize} targets`}</FormHelperText>
									)}
								</FormControl>
								<FormControl
									isInvalid={!!(formik.errors.label && formik.touched.label)}
									isDisabled={isLoading}
								>
									<FormLabel>Tag</FormLabel>
									<Input
										as={Input}
										id='label'
										name='label'
										onChange={formik.handleChange}
										value={formik.values.label}
										list='tags'
										type='text'
									/>
									<datalist id='tags'>
										{tags?.length > 0 &&
											tags.map((tag: { label: string }, index: Key) => {
												return <option key={index}>{tag.label}</option>;
											})}
									</datalist>
									<FormErrorMessage>{formik.errors.label}</FormErrorMessage>
								</FormControl>
							</HStack>

							{!!duplicateTarget && !duplicateTargetFull && !isLoading && (
								<Text
									mb={'1rem'}
									fontSize={'1rem'}
									maxW='24rem'
									color={'orange.400'}
									fontWeight='500'
								>{`The same target with a "${duplicateTarget.label}" label exists, are you sure you want to create a new one?`}</Text>
							)}

							{!!duplicateTargetFull && !isLoading && (
								<Text
									mb={'1rem'}
									fontSize={'1rem'}
									maxW='28rem'
									color={'red.500'}
									fontWeight='500'
								>{`Target with the same label and target value already exists.`}</Text>
							)}

							{!!overLimits && !isLoading && (
								<Text
									mb={'1rem'}
									fontSize={'1rem'}
									maxW='28rem'
									color={'red.500'}
									fontWeight='500'
								>{`No more than ${contextValue.ipLimits} targets.`}</Text>
							)}

							<FormControl textAlign='center' isDisabled={isLoading}>
								<Grid templateColumns='repeat(2, 1fr)' gap='2'>
									<Center textAlign='center'>
										{tablePosition === 'top' && (
											<Button
												width='full'
												variant='primary'
												type='button'
												onClick={onSelectTargetOpen}
												my={1}
												isDisabled={
													isLoading || !!duplicateTargetFull || !!overLimits
												}
											>
												Add Existing Targets
											</Button>
										)}
									</Center>
									<Center>
										<Button
											width='full'
											variant='primary'
											type='submit'
											my={1}
											isDisabled={
												isLoading || !!duplicateTargetFull || !!overLimits
											}
										>
											{/* {`Add Single Target`} */}
											{/* {not needed now} */}
											{targetRangeSize
												? `Add ${targetRangeSize} Targets`
												: `Add Single Target`}
										</Button>
									</Center>
								</Grid>
								<Text
									fontWeight={'500'}
									fontSize='0.75rem'
									my={2}
									color='gray.400'
								>{`IP Limits: ${contextValue.ipLimits}`}</Text>
							</FormControl>

							<Divider
								orientation='horizontal'
								my={10}
								borderColor='black'
								opacity={0.2}
							/>
							<FormControl isDisabled={isLoading}>
								<FormLabel>Bulk Add Targets</FormLabel>
								<CustomDragDrop
									onChangeFiles={addMultipleTargets}
									isDisabled={isLoading}
								/>
								<FormHelperText textAlign='left' mb={4}>
									Acceptable file type is .csv w/ two headers &quot;target&quot;
									and &quot;label&quot; (optional).
									<Link
										href={'/sample-targets.csv'}
										textDecoration='underline'
										display={'block'}
										_hover={{
											color: 'navy.300',
										}}
									>
										Sample CSV
									</Link>
								</FormHelperText>
								{tablePosition === 'top' && (
									<Link
										href={'./targets'}
										target='_blank'
										rel='noopener noreferrer'
										textDecoration='underline'
										display={'block'}
										mt={6}
										_hover={{
											color: 'navy.300',
										}}
									>
										Manage Targets
									</Link>
								)}
								{tablePosition === 'bottom' && tableNode}
							</FormControl>
						</form>
					</VStack>
				</Flex>
			</FormikProvider>

			<SelectTargetsModal
				id='select targets'
				isLoading={false}
				isOpen={isSelectTargetOpen}
				onClose={onSelectTargetClose}
				projTargets={projTargets}
				selProjTargets={addExistingTargets}
			/>
		</>
	);
}
