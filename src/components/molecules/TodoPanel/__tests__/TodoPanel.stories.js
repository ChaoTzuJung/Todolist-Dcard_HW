import React from 'react';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import TodoPanel from 'components/molecules/TodoPanel';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const stories = storiesOf('Commons|molecules/TodoPanel', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => (
	<div style={{ margin: '100px' }}>
		<TodoPanel
			todoData={object('todoData', {
				text: '',
				checked: false,
				star: false,
				edit: true,
				startTime: '',
				date: '',
				time: '',
				fileData: '',
				fileName: '',
				fileType: '',
				hasImage: false,
				textarea: '',
			})}
			onSave={action('Add Task')}
			onCancel={action('Cancel')}
		/>
	</div>
));
