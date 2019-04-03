import React from 'react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react';

import TodoPanel from 'components/molecules/TodoPanel';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const stories = storiesOf('Commons|molecules/TodoPanel', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => (
	<div style={{ margin: '100px' }}>
		<TodoPanel
			fileType={select(
				'file type',
				{ png: 'image/png', jpeg: 'image/jpeg', pdf: 'application/pdf', doc: 'application/zip' },
				'png',
			)}
			hasImage={boolean('hasImage', false)}
			fileName={text('fileName', '照片.png')}
			fileData={text(
				'imageUrl',
				'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
			)}
			textareaValue={text('comment', '內文')}
			onSave={action('Add Task')}
			onCancel={action('Cancel')}
		/>
	</div>
));
