import reducer from '../blogs';

describe('blogs reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			loading: false,
			posts: [],
		});
	});

	it('should handle GET_BLOGS_PENDING', () => {
		expect(
			reducer(undefined, {
				type: 'GET_BLOGS_PENDING',
			}),
		).toEqual({
			loading: true,
			posts: [],
		});
	});

	it('should handle GET_BLOGS_FULFILLED', () => {
		expect(
			reducer(
				{
					loading: true,
					posts: [],
				},
				{
					type: 'GET_BLOGS_FULFILLED',
					payload: {
						list: [
							{
								author: 'Lee',
								pID: '9527',
								thumb_url: '',
								time: '2016-01-22 12:23:34',
								title: '你好',
							},
						],
					},
				},
			),
		).toEqual({
			loading: false,
			posts: [
				{
					author: 'Lee',
					pID: '9527',
					thumb_url: '',
					time: '2016-01-22 12:23:34',
					title: '你好',
				},
			],
		});
	});

	it('should handle CLEAN_BLOGS', () => {
		expect(
			reducer(
				{
					loading: false,
					posts: [
						{
							author: 'Lee',
							pID: '9527',
							thumb_url: '',
							time: '2016-01-22 12:23:34',
							title: '你好',
						},
					],
				},
				{
					type: 'CLEAN_BLOGS',
				},
			),
		).toEqual({
			loading: false,
			posts: [],
		});
	});
});
