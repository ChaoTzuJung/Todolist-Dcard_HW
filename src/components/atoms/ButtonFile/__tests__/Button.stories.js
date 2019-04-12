import React from 'react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import ButtonFile from 'components/atoms/ButtonFile';

const stories = storiesOf('Commons|atoms/ButtonFile', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => (
	<ButtonFile>
		<i className="material-icons" style={{ color: '#FFFFFF' }}>
			add
		</i>
	</ButtonFile>
));

stories.add('with button style', () => <ButtonFile type="button">選擇檔案</ButtonFile>);
