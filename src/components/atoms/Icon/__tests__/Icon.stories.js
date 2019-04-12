import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import Icon from 'components/atoms/Icon';

const stories = storiesOf('Commons|atoms/Icon', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => <Icon light={boolean('light', false)}>add</Icon>);

stories.add('outlined icon', () => (
	<Icon outlined={boolean('outlined', true)}>insert_drive_file</Icon>
));

const usedIcon = [
	'add',
	'date_range',
	'insert_drive_file',
	'textsms',
	'edit',
	'star',
	'star_border',
	'check_box',
	'check_box_outline_blank',
];

stories.add('used icon', () => (
	<div style={{ display: 'flex', flexWrap: 'wrap' }}>
		{usedIcon.map(icon => (
			<div
				key={icon}
				style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}
			>
				<Icon>{icon}</Icon>
				<span>{icon}</span>
			</div>
		))}
	</div>
));
