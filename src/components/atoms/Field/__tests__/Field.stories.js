import React from 'react';
import { withKnobs, select, text, boolean, color } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import Field from 'components/atoms/Field';

const stories = storiesOf('Commons|atoms/Field', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => (
	<div style={{ margin: '60px' }}>
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
			placeholder="type something here"
			valid={boolean('valid', true)}
			color={color('color', 'rgba( 0, 0, 0, 0)')}
			border={boolean('border', true)}
		/>
	</div>
));
