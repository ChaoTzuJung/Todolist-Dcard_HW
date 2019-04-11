import { contain } from 'react-container-helper';

import { firebaseDB } from '../../../../firebase';
import List from './component';

const initState = ({ message, completed }) => ({
	message: message || '',
	completed: completed || false,
	cacheTodo: {},
	star: false,
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
	addStar,
	onEdit,
	handleCheckboxChange,
	...other,

	handleChange(e) {
		console.log(`handleChange 輸入新的message: ${e.target.value}`);
		setState(
			{
				message: e.target.value,
			},
			() => {
				setState(prevState => ({
					cacheTodo: {
						...prevState.cacheTodo,
						message: prevState.message,
					},
				}));
			},
		);
	},
});

const setLifecycle = () => ({
	// 每次更新畫面 要 抓 data 的 message 到 cacheTodo 的 state 內
	componentDidMount({ setState, getProps }) {
		const { id, isNewTodo } = getProps();
		console.log('List的props', getProps());
		console.log('List的id', id);
		if (!isNewTodo) {
			firebaseDB
				.ref(`todos/${id}`)
				.once('value')
				.then(snapshot => {
					const { message } = snapshot.val();
					setState(prevState => ({
						cacheTodo: {
							...prevState.cacheTodo,
							message,
						},
					}));
				});
		}
	},
});

export default contain(initState, mapSetStateToProps, setLifecycle)(List);
