import { contain } from 'react-container-helper';

import List from './component';

const initState = () => ({
	text: '',
});

const mapSetStateToProps = (
	{ text },
	{ className, checked, star, edit, deadline, file, comment, ...other },
	setState,
) => ({
	// state
	text,

	// props
	className,
	checked,
	star,
	edit,
	deadline,
	file,
	comment,
	...other,

	// actions
	onChangeCheckbox(event) {
		setState(event.target.value);
	},

	handleChange(e) {
		setState({ text: e.target.value });
	},
});

export default contain(initState, mapSetStateToProps)(List);
