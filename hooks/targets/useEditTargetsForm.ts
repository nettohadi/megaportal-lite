import { useCallback, useMemo, useState } from 'react';

import { useToast } from '@chakra-ui/react';
import { FormikHelpers, useFormik } from 'formik';
import uniqBy from 'lodash/uniqBy';


import { TargetValueSchema } from 'components/Targets/AddTargetsForm';
import { useProjectContext } from 'context/project-context';
import { useProjectRouter } from 'hooks/useProjectRouter';
import { PROJECT_TYPE } from 'libs/constants';
import { useListTargetsByProjectIdQuery } from 'libs/hooks/targets/useListTargetsByProjectIdQuery';
import { TargetValue } from 'types/scans';
import { isIpRegex, validationDNS } from 'utils/formik';
import { getIpRangeSize } from 'utils/ip/getIpRangeSize';
import { parseCIDR } from 'utils/ip/parseCIDR';

export interface UseEditTargetsFormOptions {
	initialTargets?: TargetValue[];
}

export function useEditTargetsForm(options: UseEditTargetsFormOptions) {
	const { initialTargets = [] } = options;

	const router = useProjectRouter();
	const projectId = router.query.projectId;

	const { projectData } = useProjectContext();
	const isInternal = projectData?.type === PROJECT_TYPE.INTERNAL_SCAN;

	const toast = useToast();

	const [editTargetsState, setEditTargetsState] = useState<TargetValue[]>(
		initialTargets.map((t) => ({ id: t.id, label: t.label, target: t.target }))
	);

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

				const existingTargets = editTargetsState.filter((t) =>
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
						setEditTargetsState((prevValue) => [
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
					setEditTargetsState((prevValue) => [...prevValue, value]);
					formikHelpers.resetForm();
				} else {
					formikHelpers.setFieldError('target', 'Invalid domain');
				}
			}
		},
		[editTargetsState, toast]
	);
	const targetForm = useFormik<TargetValue>({
		initialValues: {
			target: '',
			label: '',
		},
		validationSchema: TargetValueSchema(isInternal),
		onSubmit: handleTargetFormSubmit,
	});

	const { data: projectTargetsData } =
		useListTargetsByProjectIdQuery(projectId);

	const projectTargets = useMemo(() => {
		return projectTargetsData?.targets || [];
	}, [projectTargetsData]);

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
				editTargetsState.find(
					(existingTarget) => existingTarget.target === t.target
				)
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
				setEditTargetsState((prevValue) => [
					...(prevValue ?? []),
					...(targetsToAdd.filter(
						(t) =>
							!editTargetsState.find(
								(existingTarget) => existingTarget.target === t.target
							)
					) ?? []),
				]);
			}
		},
		[editTargetsState, toast]
	);

	const handleRemoveTargets = useCallback((updatedTargets: TargetValue[]) => {
		setEditTargetsState([...updatedTargets]);
	}, []);

	const resetTargetsEdit = useCallback(() => {
		setEditTargetsState(
			initialTargets.map((t) => ({
				id: t.id,
				target: t.target,
				label: t.label,
			}))
		);
	}, [initialTargets]);

	return {
		form: targetForm,
		onAddTargets: handleAddTargets,
		onRemoveTargets: handleRemoveTargets,
		projTargets: projectTargets,
		targets: editTargetsState,
		resetTargetsEdit,
	};
}
