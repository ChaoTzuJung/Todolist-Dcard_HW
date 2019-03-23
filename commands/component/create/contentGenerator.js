export const genComponentContent = _componentName =>
	`import React from 'react';
import classnames from 'classnames';

import styles from './index.css';

const ${_componentName} = ({ className }) => (
	<div className={classnames(styles.${_componentName.charAt(0).toLowerCase() +
		_componentName.slice(1)}, className)}>${_componentName}</div>
);

export default ${_componentName};
`;

export const genContainerContent = (_componentName, _state, _redux) => {
	const containImportText = "import { contain } from 'util/container';\n";
	const connectImportText = "import { connect } from 'react-redux';\n";
	const componentImportText = `import ${_componentName} from './component';\n`;
	const importText = `${_state ? containImportText : ''}${
		_redux ? connectImportText : ''
	}\n${componentImportText}\n`;

	const stateConfig = `const initState = () => ({
	exampleState: false,
});

const mapSetStateToProps = ({ exampleState }, { ...props }, setState) => ({
	exampleState,

	...props,

	exampleAction() {
		setState({ exampleState: true });
	},
});

`;

	const stateHOC = `${
		_redux ? 'const Container =' : 'export default'
	} contain(initState, mapSetStateToProps)(${_componentName});\n`;

	const reduxConfig =
		'const mapStateToProps = ({ global: { exampleReduxData } }) => ({ exampleReduxData });\n\n';

	const reduxHOC = `export default connect(mapStateToProps)(${
		_state ? 'Container' : _componentName
	});\n`;

	let containerContent = importText;
	if (_state) {
		containerContent += stateConfig + stateHOC;

		if (_redux) {
			containerContent += '\n';
		}
	}
	if (_redux) {
		containerContent += reduxConfig + reduxHOC;
	}

	return containerContent;
};

export const genStyleContent = _componentName => {
	const transferClassName = oldName =>
		oldName
			.split('')
			.map((letter, index) => {
				if (letter !== letter.toLowerCase()) {
					if (index !== 0) {
						return `-${letter.toLowerCase()}`;
					}

					return letter.toLowerCase();
				}
				return letter;
			})
			.join('');

	return `.${transferClassName(_componentName)} {}\n`;
};

export const genStorybookContent = (_componentName, _scope) => {
	const requirementImportText = `import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';\n
`;

	const componentPosition = _scope === 'layout' ? 'layouts' : `components/${_scope}s`;
	const componentImportText = `import ${_componentName} from '${componentPosition}/${_componentName}';\n\n`;

	const storyContent = `const stories = storiesOf('${_scope}s/${_componentName}', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => <${_componentName} />);
`;

	const storybookContent = requirementImportText + componentImportText + storyContent;

	return storybookContent;
};
