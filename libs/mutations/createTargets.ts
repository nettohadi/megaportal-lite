import {
	CreateTargetsResponse,
	CreateTargetsVariables,
	CREATE_TARGETS_MUTATION,
	DELETE_TARGETS_MUTATION,
} from 'graphql/targets.graphql';
import { fetchData } from 'libs';

export function createTargets(input: CreateTargetsVariables['input']) {
	return fetchData<CreateTargetsResponse, CreateTargetsVariables>(
		CREATE_TARGETS_MUTATION,
		{
			input,
		}
	);
}
