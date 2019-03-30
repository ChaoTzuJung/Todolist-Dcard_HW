import React from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';

import TodoItem from 'components/molecules/TodoItem/component';

import { storiesOf } from '@storybook/react';

const stories = storiesOf('Commons|molecules/TodoItem', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => (
	<div style={{ margin: '100px' }}>
		<TodoItem
			id={Date.now()}
			text={text('text', '')}
			date={text('deadline', null)}
			file={text('file', null)}
			comment={text('comment', null)}
			checked={boolean('checked', false)}
			star={boolean('star', false)}
			edit={boolean('edit', true)}
		/>
	</div>
));
