import { FormikConfig, useFormik } from 'formik';

import { TargetValueSchema } from 'components/Targets/AddTargetsForm';
import { TargetValue } from 'types/scans';


export function useAddTargetForm(
	options: Partial<Omit<FormikConfig<TargetValue>, 'onSubmit'>> &
		Required<Pick<FormikConfig<TargetValue>, 'onSubmit'>>
) {
	return useFormik<TargetValue>({
		initialValues: {
			target: '',
			label: '',
		},
		validationSchema: TargetValueSchema,
		...options,
	});
}
