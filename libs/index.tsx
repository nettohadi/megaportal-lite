import axios, { AxiosResponse } from 'axios';
import { GraphQLClient, Variables } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT || '';

export const graphQLClient = async () => {
	const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
	return new GraphQLClient(endpoint, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export async function fetchGraphqlSSR<
	TData = any,
	TVariables extends Variables = any
>(
	query: string,
	variables: TVariables,
	accessToken: string
): Promise<AxiosResponse<TData>> {
	return axios.post(
		endpoint,
		{
			query,
			variables,
		},
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);
}

/**
 * Checks if type `T` is the `unknown` type.
 */
export type IsUnknown<T> = unknown extends T
	? [T] extends [null]
		? false
		: true
	: false;

/**
 * Fetches data using GraphQL API
 * @param query GraphQL query
 * @param variables optional
 * @returns data as TData
 */
export async function fetchData<
	TData = any,
	TVariables extends Variables = any
>(
	query: string,
	variables?: TVariables

	// For some reason useSWR forces unknown type here ...
	// so it throws a lot of errors where we execute useSWR without specific return type ...
): Promise<IsUnknown<TData> extends true ? any : TData> {
	try {
		const gqlClient = await graphQLClient();
		const data = await gqlClient.request<
			IsUnknown<TData> extends true ? any : TData,
			TVariables
		>(query, variables);

		return data;
	} catch (error) {
		console.error('Error: ', error);
		throw error;
	}
}
