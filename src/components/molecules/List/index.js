import { contain } from 'react-container-helper';

import { firebaseDB } from '../../../../firebase';
import List from './component';

const initState = ({ completed, star }) => ({
	message: '',
	completed: completed || false,
	star: star || false,
	edit: false,
});

const mapSetStateToProps = (
	{ message, completed, cacheTodo, star, edit },
	{
		className,
		date,
		deadline,
		file,
		comment,
		isNewTodo,
		tab,
		addStar,
		onEdit,
		handleCheckboxChange,
		...other
	},
	setState,
) => ({
	// state
	message,
	completed,
	cacheTodo,
	star,
	edit,
	// props
	className,
	date,
	deadline,
	file,
	comment,
	tab,
	addStar,
	onEdit,
	handleCheckboxChange,
	...other,

	handleChange(e) {
		const val = e.target.value;
		setState(prevState => ({
			...prevState,
			message: val,
		}));
	},
});

const setLifecycle = () => ({
	componentDidMount({ setState, getProps }) {
		const { id, isNewTodo } = getProps();
		if (!isNewTodo) {
			firebaseDB
				.ref(`todos/${id}`)
				.once('value')
				.then(snapshot => {
					const { message } = snapshot.val();
					setState(prevState => ({
						...prevState,
						message,
					}));
				});
		}
	},
});

export default contain(initState, mapSetStateToProps, setLifecycle)(List);
