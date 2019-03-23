import React from 'react';
import { withKnobs } from '@storybook/addon-knobs/react';

import Header from 'components/organisms/Header';

import { storiesOf } from '@storybook/react';

const stories = storiesOf('Commons|organisms/Header', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => <Header />);
