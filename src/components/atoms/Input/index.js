import { contain } from 'react-container-helper';

import Input from './component';

const initState = () => ({
	inputElement: undefined,
	value: '',
	content: [],
});

const mapSetStateToProps = (
	{ inputElement, value, content, focused },
	{ className, placeholder, onSubmit = () => {}, onFocus = () => {}, ...props },
	setState,
) => ({
	// state
	value,
	content,
	focused,

	// props
	className,
	placeholder,
	onFocus,
	...props,

	// actions
	handleChange(event) {
		setState({ value: event.target.value });
	},

	getInputElement(node) {
		if (!inputElement) {
			setState({ inputElement: node });
		}
	},

	submit(event) {
		event.preventDefault();
		onSubmit(value);

		if (inputElement) {
			inputElement.blur();
		}
		setState({
			content: [{ id: Date.now(), value }, ...content],
			value: '',
		});
	},
});

export default contain(initState, mapSetStateToProps)(Input);
