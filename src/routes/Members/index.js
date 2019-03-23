import { getMembers, cleanMembers } from 'actions/member';

export default store => ({
	path: 'members',
	indexRoute: {
		getComponent: (nextState, cb) =>
			require.ensure(
				[],
				require => {
					const component = require('./container').default;
					cb(null, component);
				},
				'Members',
			),
		onEnter: () => {
			store.dispatch(cleanMembers());
			store.dispatch(getMembers());
		},
	},
});
