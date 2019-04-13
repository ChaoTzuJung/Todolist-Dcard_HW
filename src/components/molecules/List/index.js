import { contain } from 'react-container-helper';

import { firebaseDB } from '../../../../firebase';
import List from './component';

const initState = ({ completed }) => ({
	// controller input
	message: '',
	completed: completed || false,
	// cacheTodo: {
	// 	message: message || '',
	// },
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
		const val = e.target.value;
		console.log(`handleChange 輸入新的message: ${val}`);
		setState(prevState => ({
			...prevState,
			message: val,
		}));
		// () => {
		// 	setState(prevState => ({
		// 		cacheTodo: {
		// 			...prevState.cacheTodo,
		// 			message: prevState.message,
		// 		},
		// 	}));
		// },
	},
});

const setLifecycle = () => ({
	// 每次更新畫面 要 抓 data 的 message 到 cacheTodo 的 state 內
	componentDidMount({ setState, getProps }) {
		const { id, isNewTodo } = getProps();
		console.log('**List** componentDidMount 嘍 !!');
		console.log('**List** id是', id);
		if (!isNewTodo) {
			firebaseDB
				.ref(`todos/${id}`)
				.once('value')
				.then(snapshot => {
					console.log('Cannot read property message of null', snapshot.val());
					const { message } = snapshot.val();
					setState(prevState => ({
						...prevState,
						message,
					}));
					// setState(prevState => ({
					// 	cacheTodo: {
					// 		...prevState.cacheTodo,
					// 		message,
					// 	},
					// }));
				});
		}
	},
});

export default contain(initState, mapSetStateToProps, setLifecycle)(List);
