import React from 'react';
import { withKnobs, select, text, boolean, color } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import Field from 'components/atoms/Field';

const stories = storiesOf('Commons|atoms/Field', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => (
	<Field
		type={select('type', {
			text: 'text',
			number: 'number',
			password: 'password',
			file: 'file',
			tel: 'tel',
			url: 'url',
		})}
		name="phone"
		icon={text('with icon', 'person_outline')}
		placeholder="aaa"
		valid={boolean('valid', true)}
		color={color('color', '#FFFFFF')}
		border={boolean('border', false)}
	/>
));
