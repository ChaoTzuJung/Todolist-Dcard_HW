import { contain } from 'react-container-helper';
import List from './component';

const initState = () => ({
	text: '',
	star: false,
	edit: false,
});

const mapSetStateToProps = (
	{ text, star, edit },
	{ className, checked, date, deadline, file, comment, AddStar, OpenEdit, onCkecked, onChangeCheckbox, ...other },
	setState,
) => ({
	// state
	text,
	star,
	edit,
	// props
	className,
	checked,
	date,
	deadline,
	file,
	comment,
	onChangeCheckbox,
	...other,

	// actions
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
