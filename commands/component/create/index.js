import { prompt } from 'enquirer';

import { createComponentFiles } from './fileWriter';

const questions = [
	{
		type: 'input',
		name: 'name',
		message: 'component name:',
		validate: input => {
			if (input) {
				return true;
			}

			return 'component name is required!';
		},
	},
	{
		type: 'select',
		name: 'scope',
		message: 'component scope:',
		choices: ['atom', 'molecule', 'organism', 'layout'],
		default: 'atom',
	},
	{
		type: 'confirm',
		name: 'state',
		message: 'do you want to create default state container?',
		default: false,
	},
	{
		type: 'confirm',
		name: 'redux',
		message: 'do you want to create default redux connection?',
		default: false,
	},
	{
		type: 'confirm',
		name: 'storybook',
		message: 'do you want to create storybook test?',
	},
];

const createComponent = async () => {
	const { name, scope, state, redux, storybook } = await prompt(questions);
	await createComponentFiles({ name, scope, state, redux, storybook });
};

createComponent();
