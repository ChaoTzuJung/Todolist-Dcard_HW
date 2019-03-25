import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import Checkbox from 'components/atoms/Checkbox';

const stories = storiesOf('Commons|atoms/Checkbox', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => (
	<Checkbox name="checkbox1" value="1" content="可以養寵物" small={boolean('small')} />
));
