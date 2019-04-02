import { contain } from 'react-container-helper';

import List from './component';

const initState = () => ({
	text: '',
	star: false,
	edit: false,
});

const mapSetStateToProps = (
	{ text },
	{ className, checked, star, edit, date, deadline, file, comment, AddStar, OpenEdit, ...other },
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

	AddStar() {
		setState({ star: !star });
	},

	OpenEdit() {
		setState({ edit: !edit });
	},
});

export default contain(initState, mapSetStateToProps)(List);
