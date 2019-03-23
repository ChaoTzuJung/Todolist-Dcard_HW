import { handleActions } from 'redux-actions';

export default handleActions(
	{
		GET_BLOGS_PENDING: state => ({
			...state,
			loading: true,
		}),

		GET_BLOGS_FULFILLED: (state, action) => ({
			...state,
			posts: action.payload.list,
			loading: false,
		}),

		CLEAN_BLOGS: state => ({
			...state,
			posts: [],
		}),
	},
	{
		loading: false,
		posts: [],
	},
);
