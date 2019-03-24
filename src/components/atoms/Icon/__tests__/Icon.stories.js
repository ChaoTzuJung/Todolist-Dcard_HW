import React from 'react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import Icon from 'components/atoms/Icon';

const stories = storiesOf('Commons|atoms/Icon', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => (
	<Icon
		light={boolean('light', false)}
		size={select('size', {
			'18px': 'md-18',
			'24px': 'md-24',
			'36px': 'md-36',
			'48px': 'md-48',
		})}
	>
		add
	</Icon>
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
