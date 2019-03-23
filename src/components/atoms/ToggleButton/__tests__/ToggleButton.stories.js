import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import withTests from 'util/storybook';

import ToggleButton from 'components/atoms/ToggleButton';

const stories = storiesOf('atoms/ToggleButton', module);

stories.addDecorator(withKnobs);
stories.addDecorator(withTests('ToggleButton'));

stories.add('__interactive', () => (
	<ToggleButton
		onOpen={action('open')}
		onClose={action('close')}
		openTitle={text('Open Title', 'Open')}
		closeTitle={text('Close Title', 'Close')}
	/>
));
