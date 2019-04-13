import React from 'react';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';

const stories = storiesOf('Commons|atoms/Button', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => (
	<div style={{ border: '1px solid #000', margin: '60px', display: 'inline-block' }}>
		<Button
			color={select(
				'color theme',
				{ normal: 'normal', save: 'save', cancel: 'cancel', upload: 'upload' },
				'normal',
			)}
			disabled={boolean('Disabled', false)}
			onClick={action('onClick')}
		>
			{text('content', 'Add Task')}
		</Button>
	</div>
));

stories.add('with icon text', () => (
	<div style={{ border: '1px solid #000', margin: '60px', display: 'inline-block' }}>
		<Button>
			<Icon>{text('with icon', 'close')}</Icon>
			{text('text', 'Cancel')}
		</Button>
	</div>
));

stories.add('with internal link', () => (
	<div style={{ border: '1px solid #000', margin: '60px', display: 'inline-block' }}>
		<Button color="normal" link="/">
			{text('content', 'Go to home page')}
		</Button>
	</div>
));

stories.add('with external link', () => (
	<div style={{ border: '1px solid #000', margin: '60px', display: 'inline-block' }}>
		<Button color="normal" link="https://www.google.com/" type="external">
			{text('content', 'Link to google site')}
		</Button>
	</div>
));
