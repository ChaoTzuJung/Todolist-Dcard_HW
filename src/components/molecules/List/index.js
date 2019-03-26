import { contain } from 'react-container-helper';

import List from './component';

const initState = () => ({
	todo: {
		id: Date.now(),
		content: 'Type Something Here...',
		dateline: '2018/5/14_14:30',
		file: null,
		comment: 'meet him lorence Cafe',
	},
});

const mapSetStateToProps = (
	{ todo },
	{ className, checked, star, edit, date, file, comment, ...other },
	setState,
) => ({
	// state
	todo,

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
