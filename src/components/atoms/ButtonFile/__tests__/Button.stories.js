import React from 'react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import ButtonFile from 'components/atoms/ButtonFile';

const stories = storiesOf('Commons|atoms/ButtonFile', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => (
	<div style={{ margin: '60px' }}>
		<ButtonFile>
			<i className="material-icons" style={{ color: '#FFFFFF' }}>
				add
			</i>
		</ButtonFile>
	</div>
));

stories.add('with button style', () => (
	<div style={{ margin: '60px' }}>
		<ButtonFile type="button">選擇檔案</ButtonFile>
	</div>
));
