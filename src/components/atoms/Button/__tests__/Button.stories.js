import React from 'react';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';

const stories = storiesOf('Commons|atoms/Button', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => (
	<Button
		color={select(
			'color',
			{ normal: 'normal', save: 'save', cancel: 'cancel', upload: 'upload' },
			'normal',
		)}
		disabled={boolean('Disabled', false)}
		onClick={action('onClick')}
	>
		{text('content', 'Add Task')}
	</Button>
));

stories.add('with icon text', () => (
	<Button>
		<Icon>{text('with icon', 'close')}</Icon>
		{text('text', 'Cancel')}
	</Button>
));

stories.add('with internal link', () => (
	<Button color="normal" link="/">
		{text('content', 'Go to home page')}
	</Button>
));

stories.add('with external link', () => (
	<Button color="normal" link="https://www.google.com/" type="external">
		{text('content', 'Link to google site')}
	</Button>
));
