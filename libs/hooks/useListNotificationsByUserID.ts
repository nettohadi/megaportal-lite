import useSWR from 'swr';


import { GET_LIST_HISTORIES_BY_USER } from 'graphql/histories.graphql';
import { fetchData } from 'libs';
import { IAggregate } from 'types/common';
import { IHistory } from 'types/history';
import { User } from 'types/user';

export function useListNotificationsByUserID(user?: User | undefined) {
	const { data, ...swr } = useSWR<{
		histories: IHistory[];
		histories_aggregate?: IAggregate;
	}>(
		user && [
			GET_LIST_HISTORIES_BY_USER,
			{
				userId: user?.id,
			},
		],
		fetchData
	);

	return {
		...swr,
		history: data?.histories,
		data,
	};
}
