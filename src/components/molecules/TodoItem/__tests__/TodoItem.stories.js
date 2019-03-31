import React from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';

import TodoItem from 'components/molecules/TodoItem';

import { storiesOf } from '@storybook/react';

const stories = storiesOf('Commons|molecules/TodoItem', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => (
	<div style={{ margin: '100px' }}>
		<TodoItem
			text={text('title', '')}
			checked={boolean('checked', false)}
			star={boolean('star', false)}
		/>
	</div>
));
