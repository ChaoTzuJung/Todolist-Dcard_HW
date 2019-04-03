import React from 'react';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import Navigation from 'components/molecules/Navigation';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const stories = storiesOf('Commons|molecules/Navigation', module);

stories.addDecorator(withKnobs);

const todoCategorys = [
	{
		id: 0,
		key: 'myTasks',
		label: 'My Tasks',
	},
	{
		id: 1,
		key: 'inProgress',
		label: 'In Progress',
	},
	{
		id: 2,
		key: 'completed',
		label: 'Completed',
	},
];

stories.add('__interactive', () => (
	<Navigation
		className=""
		activeCategory="myTasks"
		onClickTab={action('onClick tab')}
		todoCategorys={object('todoCategorys', todoCategorys)}
	/>
));
