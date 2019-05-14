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
		const { isNewTodo } = this.props;

		this.state = {
			star: false,
			edit: isNewTodo,
			completed: false,
			deleted: false,
		};

		this.handleSave = this.handleSave.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.addStar = this.addStar.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.star) {
			this.setState({ star: nextProps.star });
		}

		if (nextProps.completed) {
			this.setState({ completed: nextProps.completed });
		}
	}

	handleSave(data) {
		const { isNewTodo, setNewTodo, id, completed } = this.props;
		const { message, star } = this.input.current.state;

		const { comment, date, file, name, timestamp, type } = data;
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
				completed,
				star,
				id,
			});

			if (isNewTodo) {
				setNewTodo();
			}
			this.setState({ edit: false });
		}
	}

	handleCancel() {
		const { isNewTodo, setNewTodo } = this.props;

		if (isNewTodo) {
			setNewTodo();
		}
		this.setState({ edit: false });
	}

	addStar() {
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
		const { edit } = this.state;
		const { isNewTodo } = this.props;
		if (isNewTodo) {
			alert('請按下 Cancel 或 Add Task');
		} else {
			this.setState({ edit: !edit });
		}
	}

	removeTodo() {
		const { deleted } = this.state;
		const { id, isNewTodo } = this.props;

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

			firebaseDB.ref(`todos/${id}`).remove();

			firebaseDB
				.ref('sort')
				.child(findSortId)
				.remove();
		} else {
			alert('請按下 Cancel 或 輸入標題喔');
		}
	}

	handleCheck() {
		const { completed } = this.state;
		const { id } = this.props;

		this.setState({ completed: !completed });
		firebaseDB.ref(`todos/${id}/completed`).set(!completed);
	}

	render() {
		const { edit, star, deleted, completed } = this.state;
		const { className, id, date, file, name, type, comment, isNewTodo, tab } = this.props;
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
						tab={tab}
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
