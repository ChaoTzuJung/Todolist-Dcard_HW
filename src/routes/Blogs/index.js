import { getBlogs, cleanBlogs } from 'actions/blog';

export default store => ({
	path: 'blogs',
	indexRoute: {
		getComponent: (nextState, cb) =>
			require.ensure(
				[],
				require => {
					const component = require('./container').default;
					cb(null, component);
				},
				'Blogs',
			),
		onEnter: () => {
			store.dispatch(cleanBlogs());
			store.dispatch(getBlogs());
		},
	},
});
