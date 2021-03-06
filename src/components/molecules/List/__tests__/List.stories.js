import React from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import List from 'components/molecules/List';

const stories = storiesOf('Commons|molecules/List', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => (
	<div style={{ margin: '60px' }}>
		<List
			message={text('message', 'type something here...')}
			star={boolean('star', false)}
			edit={boolean('edit', false)}
			completed={boolean('checked', false)}
			deadline={boolean('deadline', true)}
			date={text('date', '6/18')}
			file={boolean('file', true)}
			comment={boolean('comment', true)}
		/>
	</div>
));
