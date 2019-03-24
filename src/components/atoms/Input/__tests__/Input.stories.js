import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import Input from 'components/atoms/Input';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const stories = storiesOf('Commons|atoms/Input', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => (
	<div style={{ marginLeft: '200px'}}>
		<Input
			className=""
			placeholder={text('placeholder', 'Add Task')}
			handleChange={action('input change')}
			onSubmit={action('submit')}
		/>
	</div>

));
