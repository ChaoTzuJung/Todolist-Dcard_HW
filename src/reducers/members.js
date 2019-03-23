import { handleActions } from 'redux-actions';

export default handleActions(
	{
		GET_MEMBERS_PENDING: state => ({
			...state,
			loading: true,
		}),

		GET_MEMBERS_FULFILLED: (state, action) => ({
			...state,
			staffs: action.payload.staffs,
			loading: false,
		}),

		CLEAN_MEMBERS: state => ({
			...state,
			staffs: {},
		}),
	},
	{
		loading: false,
		staffs: {},
	},
);
