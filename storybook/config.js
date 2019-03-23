import { addDecorator, configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { themes } from '@storybook/components';

// A modern alternative to CSS resets
import 'normalize.css';
// Global css setting
import 'global.css';

addDecorator(
	withOptions({
		name: '25sprout react starter',
		theme: themes.dark,
		hierarchySeparator: /\/|\./,
		hierarchyRootSeparator: /\|/,
	}),
);

const req = require.context('../src/components/', true, /stories\.js$/);

function loadStories() {
	req.keys().forEach(req);
}
configure(loadStories, module);
