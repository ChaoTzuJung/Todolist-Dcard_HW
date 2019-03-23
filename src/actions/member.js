import { createAction } from 'redux-actions';

import { wrapFetch } from './api';

export const getMembers = createAction('GET_MEMBERS', async () => {
	try {
		const data = await wrapFetch('avatar/apo/25sproutMember.php');
		return data;
	} catch (error) {
		return { staffs: '' };
	}
});

export const cleanMembers = createAction('CLEAN_MEMBERS');
