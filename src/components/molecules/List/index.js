import { contain } from 'react-container-helper';

import List from './component';

const initState = () => ({
	text: '',
});

const mapSetStateToProps = (
	{ text },
	{ className, checked, star, edit, date, file, comment, ...other },
	setState,
) => ({
	// state
	text,

	// props
	className,
	checked,
	star,
	edit,
	date,
	file,
	comment,
	...other,

	// actions
	onChangeCheckbox(event) {
		setState(event.target.value);
	},
});

export default contain(initState, mapSetStateToProps)(List);
