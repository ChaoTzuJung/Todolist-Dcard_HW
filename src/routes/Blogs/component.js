import React from 'react';

import PageLayout from 'layouts/Page';
import SwitchList from 'components/molecules/SwitchList';

const PageContent = ({ getBlogs, cleanBlogs, posts }) => (
	<SwitchList
		onOpen={getBlogs}
		onClose={cleanBlogs}
		items={posts.map(post => ({ key: post.pID, value: post.title }))}
	/>
);

const Blogs = PageLayout({
	PageHeader: "Blog's page",
	PageContent,
});

Blogs.displayName = 'Blogs';

export default Blogs;
