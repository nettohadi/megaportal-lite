export interface IAggregate {
	aggregate: {
		count: number;
	};
}

export interface APIResponse<T> {
	data: T;
}
