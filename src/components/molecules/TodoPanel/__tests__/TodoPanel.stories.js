import React from 'react';
import { withKnobs } from '@storybook/addon-knobs/react';

import TodoPanel from 'components/molecules/TodoPanel';

import { storiesOf } from '@storybook/react';

const stories = storiesOf('Commons|molecules/TodoPanel', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => (
	<div style={{ margin: '100px' }}>
		<TodoPanel />
	</div>
));
