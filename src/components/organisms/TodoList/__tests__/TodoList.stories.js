import React from 'react';
import { withKnobs } from '@storybook/addon-knobs/react';

import TodoList from 'components/organisms/TodoList';

import { storiesOf } from '@storybook/react';

const stories = storiesOf('Commons|organisms/TodoList', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => (
	<div style={{ margin: '100px' }}>
		<TodoList />
	</div>
));
