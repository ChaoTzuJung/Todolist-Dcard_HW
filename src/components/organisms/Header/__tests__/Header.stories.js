import React from 'react';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import Header from 'components/organisms/Header';
import Navigation from 'components/molecules/Navigation';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const stories = storiesOf('Commons|organisms/Header', module);

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
	<Header>
		<Navigation
			className=""
			activeCategory="myTasks"
			onClickTab={action('onClick tab')}
			todoCategorys={object('todoCategorys', todoCategorys)}
		/>
	</Header>
));
