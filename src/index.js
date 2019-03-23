import '@babel/polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// A modern alternative to CSS resets
import 'normalize.css';
// Global css setting
import './global.css';

import configureStore from './store';
import Routes from './routes';

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(<Routes store={store} history={history} />, document.getElementById('content'));
