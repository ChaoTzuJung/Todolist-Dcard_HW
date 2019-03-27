import React from 'react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import FieldDate from 'components/atoms/FieldDate';

const stories = storiesOf('Commons|atoms/FieldDate', module);

stories.addDecorator(withKnobs);

stories.add('with default', () => (
	<div style={{ margin: '16px' }}>
		<FieldDate />
	</div>
));

stories.add('with date only', () => (
	<div style={{ margin: '16px' }}>
		<FieldDate dateOnly />
	</div>
));

stories.add('with time only', () => (
	<div style={{ margin: '16px' }}>
		<FieldDate timeOnly />
	</div>
));
