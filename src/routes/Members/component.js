import React from 'react';

import PageLayout from 'layouts/Page';
import SwitchList from 'components/molecules/SwitchList';

const PageContent = ({ getMembers, cleanMembers, members }) => (
	<SwitchList
		onOpen={getMembers}
		onClose={cleanMembers}
		items={Object.keys(members).map(key => ({ key, value: members[key].name }))}
	/>
);

const Members = PageLayout({
	PageHeader: "Member's page",
	PageContent,
});

Members.displayName = 'Members';

export default Members;
