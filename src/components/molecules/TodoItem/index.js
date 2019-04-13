import React, { Component } from 'react';
import classnames from 'classnames';

import { isExist, transDayToDate } from 'util/helper';
import Icon from 'components/atoms/Icon';
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
			deleted: false,
		};

		this.handleSave = this.handleSave.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.addStar = this.addStar.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
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
			alert('請按下 Cancel 或 Add Task');
		} else {
			this.setState({ edit: !edit });
		}
	}

	removeTodo() {
		console.log('按下刪除');
		const { deleted } = this.state;
		const { id, isNewTodo } = this.props;
		console.log('刪除', id);
		if (!isNewTodo) {
			this.setState({ deleted: !deleted });
			let findSortId = null;
			firebaseDB.ref('sort').once('value', snapshot => {
				snapshot.forEach(idSnapshot => {
					if (id === idSnapshot.val()) {
						findSortId = idSnapshot.key;
					}
				});
			});
			firebaseDB
				.ref('sort')
				.child(findSortId)
				.remove();
			firebaseDB.ref(`todos/${id}`).remove();
		} else {
			alert('請按下 Cancel 或 輸入標題喔');
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
		const { edit, star, deleted, completed } = this.state;
		const { className, id, date, file, name, type, comment, isNewTodo } = this.props;
		console.log(id);
		return (
			<div className={classnames(styles.todoItem, className)}>
				<div className={styles.deleteItem}>
					<List
						ref={this.input}
						id={id}
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
					{
						<span onClick={this.removeTodo} onKeyPress={this.removeTodo} role="button" tabIndex="0">
							<Icon
								className={classnames({
									[styles.deleted]: deleted,
								})}
							>
								{deleted ? 'delete' : 'delete_outline'}
							</Icon>
						</span>
					}
				</div>
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
