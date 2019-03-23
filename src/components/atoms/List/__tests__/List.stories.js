import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import withTests from 'util/storybook';

import List from 'components/atoms/List';

const items = [
	{
		key: 1,
		value: 'Lee',
	},
	{
		key: 2,
		value: 'Mike',
	},
];

const stories = storiesOf('atoms/List', module);

stories.addDecorator(withKnobs);
stories.addDecorator(withTests('List'));

stories.add('__interactive', () => <List items={object('list', items)} />);
