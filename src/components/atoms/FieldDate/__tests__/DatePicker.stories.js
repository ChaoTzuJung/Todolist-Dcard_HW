import React from 'react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FieldDate from 'components/atoms/FieldDate';

const stories = storiesOf('Commons|atoms/FieldDate', module);

stories.addDecorator(withKnobs);

stories.add('with default', () => (
	<div style={{ margin: '16px' }}>
		<FieldDate onChange={action('selected date and time')} startTime={null} />
	</div>
));

stories.add('with date only', () => (
	<div style={{ margin: '16px' }}>
		<FieldDate dateOnly onChange={action('selected date')} startTime={null} />
	</div>
));

stories.add('with time only', () => (
	<div style={{ margin: '16px' }}>
		<FieldDate timeOnly onChange={action('selected time')} startTime={null} />
	</div>
));
