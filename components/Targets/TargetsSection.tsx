import { createColumnHelper } from '@tanstack/react-table';

import { Table } from 'components/DataTable/Table';
import { AddTargetsForm } from 'components/Targets/AddTargetsForm';
import { useAddTargetForm } from 'hooks/forms/useAddTargetsForm';

export type MockTarget = { target: string; label: string };

interface TargetsSectionProps {
	editMode?: boolean;
	targets: MockTarget[];
	containerStyles?: any;
	apiToken: string;
}

export function TargetsSection({
	editMode,
	targets,
	containerStyles,
	apiToken,
}: TargetsSectionProps) {
	// columnHelper returns a utility for creating different column definition types
	const columnHelper = createColumnHelper<MockTarget>();

	// define the columns
	const columns = [
		columnHelper.accessor('label', {
			header: 'Label',
		}),
		columnHelper.accessor('target', {
			header: 'Target',
		}),
	];

	const targetsForm = useAddTargetForm({
		onSubmit: () => {
			console.log('Function not implemented');
		},
	});

	if (editMode) {
		return (
			<AddTargetsForm
				form={targetsForm}
				onAddTargets={() => console.log('function not implemented')}
				onRemoveTargets={() => console.log('function not implemented')}
				projTargets={[]}
				tablePosition='top'
				targets={targets}
				containerStyles={containerStyles}
				apiToken={apiToken}
			/>
		);
	}

	return <Table columns={columns} data={targets} />;
}
