import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { hot } from 'react-hot-loader/root';

import App from 'layouts/App';

const createRoutes = () => ({
	path: '/',
	component: App,
	indexRoute: {
		getComponent: (nextState, cb) =>
			require.ensure(
				[],
				require => {
					const component = require('./Home').default;
					cb(null, component);
				},
				'Home',
			),
	},
	childRoutes: [],
});

const Routes = ({ store, history }) => (
	<Provider store={store}>
		<Router history={history} routes={createRoutes(store)} />
	</Provider>
);

export default hot(Routes);
