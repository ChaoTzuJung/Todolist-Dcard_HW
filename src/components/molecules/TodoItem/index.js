import { contain } from 'react-container-helper';

import TodoItem from './component';

const initState = () => ({
	todo: {
		id: Date.now(),
		text: 'Type Something Here…',
		deadline: '',
		file: '',
		comment: '',
		checked: false,
		star: false,
		edit: true,
	},
});

const mapSetStateToProps = (
	{ todo },
	{
		id,
		text,
		deadline,
		file,
		comment,
		checked,
		star,
		edit,
		...other
	},
	setState
) => ({
	// state
	todo,

	// props
	id,
	text,
	deadline,
	file,
	comment,
	checked,
	star,
	edit,
	...other,

	// actions
});

export default contain(initState, mapSetStateToProps)(TodoItem);
