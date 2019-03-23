import { createAction } from 'redux-actions';

export const getBlogs = createAction('GET_BLOGS', async () => {
	const data = new FormData();

	data.append('num', '10');

	try {
		const posts = await fetch('http://www.25sprout.com/bin/bloglist_2016.php', {
			method: 'POST',
			body: data,
		});
		return posts.json();
	} catch (e) {
		return { list: [] };
	}
});

export const cleanBlogs = createAction('CLEAN_BLOGS');
