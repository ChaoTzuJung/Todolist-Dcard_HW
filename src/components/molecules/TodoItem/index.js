import React, { Component } from 'react';
import classnames from 'classnames';
import axios from 'axios';

import { isExist, transDayToDate } from 'util/helper';
import List from 'components/molecules/List';
import TodoPanel from 'components/molecules/TodoPanel';

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
		const todo = { ...data, message, star };
		const URL = 'http://localhost:5000';

		if (!isExist(this.input.current.state.message)) {
			alert('請輸入 Todo 標題 !');
			return;
		}

		if (isNewTodo) {
			axios
				.post(`${URL}/todos`, todo)
				.then(response => {
					console.log(`Add Task POST的資料: ${response.data}`);
					if (isNewTodo) {
						setNewTodo();
					}
					this.setState({ edit: false });
				})
				.catch(error => {
					console.error(`POST 失敗: ${error}`);
				});
		} else {
			axios
				.put(`${URL}/todos/${id}`, todo)
				.then(response => {
					console.log(`Add Task 後要更新的單筆資料: ${response.data}`);
					if (isNewTodo) {
						setNewTodo();
					}
					this.setState({ edit: false });
				})
				.catch(error => {
					console.error(`PUT 失敗: ${error}`);
				});
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
		const { id, message, date, file, name, type, comment, completed } = this.props;
		const URL = 'http://localhost:5000';
		this.setState({ star: !star }, () => {
			const todo = {
				id,
				message,
				star: !star,
				date,
				file,
				name,
				type,
				comment,
				completed,
			};
			axios
				.put(`${URL}/todos/${id}`, todo)
				.then(response => {
					console.log(`Checked 後要更新的單筆資料: ${response.data}`);
				})
				.catch(error => {
					console.error(`PUT 失敗: ${error}`);
				});
		});
	}

	onEdit() {
		console.log('按下 edit icon (只改變 todoItem 的 edit state)');
		const { edit } = this.state;
		const { isNewTodo } = this.props;
		if (isNewTodo) {
			alert('請按下Cancel或Add Task')
		} else {
			this.setState({ edit: !edit });
		}
	}

	handleCheck() {
		console.log('按下Checkbox');
		const { completed } = this.state;
		const { id, message, star, date, file, name, type, comment } = this.props;
		const URL = 'http://localhost:5000';
		this.setState({ completed: !completed }, () => {
			const todo = {
				id,
				message,
				star,
				date,
				file,
				name,
				type,
				comment,
				completed: !completed,
			};
			axios
				.put(`${URL}/todos/${id}`, todo)
				.then(response => {
					console.log(`Checked 後要更新的單筆資料: ${response.data}`);
				})
				.catch(error => {
					console.error(`PUT 失敗: ${error}`);
				});
		});
	}

	render() {
		const { edit, star, completed } = this.state;
		const { className, id, message, date, file, name, type, comment, isNewTodo } = this.props;

		return (
			<div className={classnames(styles.todoItem, className)}>
				<List
					ref={this.input}
					id={id}
					message={message}
					completed={completed}
					star={star}
					edit={edit}
					date={date}
					deadline={isExist(date)}
					file={isExist(file)}
					comment={isExist(comment)}
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
