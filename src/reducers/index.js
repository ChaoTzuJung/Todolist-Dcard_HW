import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import members from './members';
import blogs from './blogs';

const reducers = combineReducers({
	routing: routerReducer,
	members,
	blogs,
});

export default reducers;
