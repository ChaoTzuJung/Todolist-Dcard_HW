import React, { Component } from 'react';
import classnames from 'classnames';

import { isExist, transDayToDate } from 'util/helper';
import List from 'components/molecules/List';
import TodoPanel from 'components/molecules/TodoPanel';

import { firebaseTodos, firebaseDB, firebaseSort } from '../../../../firebase';
import styles from './index.css';

class TodoItem extends Component {
	constructor(props) {
		super(props);
		this.input = React.createRef();
		this.panel = React.createRef();
		const { isNewTodo, completed, star } = this.props;

		this.state = {
			star: star || false,
			edit: isNewTodo,
			completed: completed || false,
		};

		this.handleSave = this.handleSave.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.addStar = this.addStar.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
	}

	handleSave(data) {
		console.log(`Add Task 帶的資料: ${data}`);

		// data 是 在 panel Add task 時 所戴的資料
		const { isNewTodo, setNewTodo, id } = this.props;
		const { message, star } = this.input.current.state;

		const { comment, date, file, name, timestamp, type } = data;
		console.log('startDate', timestamp);
		if (!isExist(this.input.current.state.message)) {
			alert('請輸入 Todo 標題 !');
			return;
		}

		let time;

		if (typeof timestamp === 'object') {
			time = timestamp.getTime();
		}

		if (isNewTodo) {
			firebaseTodos
				.push({
					comment: isExist(comment) ? comment : null,
					date: isExist(date) ? date : null,
					file: isExist(file) ? file : null,
					message: isExist(message) ? message : null,
					name: isExist(name) ? name : null,
					timestamp: isExist(time) ? time : null,
					type: isExist(type) ? type : null,
					completed: false,
					star: false,
					id: 0,
				})
				.then(snap => {
					const { key } = snap;
					firebaseDB.ref(`todos/${key}`).update({
						id: key,
					});
				});

			firebaseTodos.once('value', snapshot => {
				if (snapshot.val().length !== null) {
					const lastTodoIndex = Object.keys(snapshot.val()).length - 1;
					const lastTodoKey = Object.keys(snapshot.val())[lastTodoIndex];
					console.log(lastTodoKey);
					firebaseSort.push(lastTodoKey);
				}
			});

			if (isNewTodo) {
				setNewTodo();
			}

			this.setState({ edit: false });
		} else {
			firebaseDB.ref(`todos/${id}`).set({
				comment: isExist(comment) ? comment : null,
				date: isExist(date) ? date : null,
				file: isExist(file) ? file : null,
				message: isExist(message) ? message : null,
				name: isExist(name) ? name : null,
				timestamp: isExist(time) ? time : null,
				type: isExist(type) ? type : null,
				id,
				star,
			});

			if (isNewTodo) {
				setNewTodo();
			}
			this.setState({ edit: false });
		}
	}

	handleCancel() {
		const { isNewTodo, setNewTodo } = this.props;

		// 若是要新增Todo 的 panel 就回復成 input 而不是 todo item
		if (isNewTodo) {
			setNewTodo();
		}
		this.setState({ edit: false });
	}

	addStar() {
		console.log('按下星星');
		const { star } = this.state;
		const { id } = this.props;
		if (id) {
			this.setState({ star: !star }, () => {
				// eslint-disable-next-line react/destructuring-assignment
				firebaseDB.ref(`todos/${id}/star`).set(this.state.star);

				this.setState(prevState => ({
					cacheTodo: {
						...prevState.cacheTodo,
						star: !star,
					},
				}));
			});
		} else {
			alert('尚未儲存 Todo，無法加星星喔！');
		}
	}

	onEdit() {
		console.log('按下 edit icon (只改變 todoItem 的 edit state)');
		const { edit } = this.state;
		const { isNewTodo } = this.props;
		if (isNewTodo) {
			alert('請按下Cancel或Add Task');
		} else {
			this.setState({ edit: !edit });
		}
	}

	handleCheck() {
		console.log('按下Checkbox');
		const { completed } = this.state;
		const { id } = this.props;

		this.setState({ completed: !completed });
		firebaseDB.ref(`todos/${id}/completed`).set(!completed);
	}

	render() {
		const { edit, star, completed } = this.state;
		const { className, id, message, date, file, name, type, comment, isNewTodo } = this.props;
		console.log(id);
		return (
			<div className={classnames(styles.todoItem, className)}>
				<List
					ref={this.input}
					id={id}
					// message={message}
					completed={completed}
					star={star}
					edit={edit}
					date={date}
					deadline={isExist(date)}
					file={isExist(file)}
					comment={isExist(comment)}
					isNewTodo={isNewTodo}
					addStar={this.addStar}
					onEdit={this.onEdit}
					handleCheckboxChange={this.handleCheck}
				/>
				{edit && (
					<TodoPanel
						// Add task and edit
						ref={this.panel}
						id={id}
						date={transDayToDate(date)}
						file={file}
						name={name}
						type={type}
						textarea={comment}
						isNewTodo={isNewTodo}
						onSave={this.handleSave}
						onCancel={this.handleCancel}
					/>
				)}
			</div>
		);
	}
}

export default TodoItem;
