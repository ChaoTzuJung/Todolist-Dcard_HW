import 'isomorphic-fetch';
import nock from 'nock';

import mockStore from '../__mocks__/store';
import * as actions from '../blog';

describe('async actions', () => {
	afterEach(() => nock.cleanAll());

	it('create GET_BLOGS_FULFILLED when fetch blogs has been done', async () => {
		nock('http://www.25sprout.com')
			.post('/bin/bloglist_2016.php')
			.reply(200, { status: 'success', list: [] });

		const expectedActions = [
			{ type: 'GET_BLOGS_PENDING' },
			{ type: 'GET_BLOGS_FULFILLED', payload: { status: 'success', list: [] } },
		];
		const store = mockStore({ blogs: {} });

		return store.dispatch(actions.getBlogs()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('create the empty list when fetch blogs with error', async () => {
		nock('http://www.25sprout.com')
			.post('/bin/bloglist_2016.php')
			.replyWithError('Not found');

		const expectedActions = [
			{ type: 'GET_BLOGS_PENDING' },
			{ type: 'GET_BLOGS_FULFILLED', payload: { list: [] } },
		];
		const store = mockStore({ blogs: {} });

		return store.dispatch(actions.getBlogs()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
