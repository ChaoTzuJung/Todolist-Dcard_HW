import React from 'react';
import { withKnobs, object, boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import List from 'components/molecules/List';

const stories = storiesOf('Commons|molecules/List', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => (
	<div style={{ margin: '16px' }}>
		<List
			text={object('text', 'type something here...')}
			star={boolean('star', false)}
			edit={boolean('edit', false)}
			checked={boolean('checked', false)}
			date={boolean('date', true)}
			file={boolean('file', true)}
			comment={boolean('comment', true)}
		/>
	</div>
));
