import { fetchData } from 'libs';
import { Scan } from 'types/scans';


const INSERT_SCAN_MUTATION = `#graphql
	mutation InsertImportScan($name:String!, $description:String!, $jobId: Int!, $projectId: uuid!) {
        insert_scans_one(object:{name: $name, description: $description, saint_job_id: $jobId, project_id: $projectId, status: "Not Synced"}) {
            id
			name
			description
			pci_status
			status
			created_date
			schedule_date
			repeat_in
			project_id
			vulnerabilities_count
			saintJobId: saint_job_id
			saint_scanrun_id
			options
			last_sync_date
			last_scanrun {
				id
				start_datetime
				progress
				status
			}
        }
 	}
`;

export type ImportScanInput = {
	name: string;
	description: string;
	jobId: Scan['saintJobId'];
	projectId: Scan['project_id'];
};

export async function importScan(input: ImportScanInput) {
	try {
		const result = await fetchData<{ insert_scans_one: Scan }>(
			INSERT_SCAN_MUTATION,
			{
				...input,
			}
		);

		return result?.insert_scans_one;
	} catch (err) {
		throw err;
	}
}
