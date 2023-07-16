import { User } from './user';
import { PAGES_NAME, HISTORY_ACTION } from '../libs/constants';

export interface IHistory {
	id: string;
	action: HISTORY_ACTION;
	module_id: string;
	page: PAGES_NAME;
	page_id: string;
	author: User;
	old_data?: json;
	new_data?: json;
	read: string[];
	created_at: Date;
	notification: string;
}
