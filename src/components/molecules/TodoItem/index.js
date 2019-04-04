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

		this.state = {
			edit: false,
		};
		this.handleSave = this.handleSave.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.addStar = this.addStar.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onCheck = this.onCheck.bind(this);
	}

	handleSave(data) {
		// data 是 在 panel Add task 時 所戴的資料
		console.log(data);
		const { date, time, startTime, fileData, fileName, fileType, hasImage, textarea } = data;
		const URL = 'http://localhost:5000';

		axios
			.post(`${URL}/todos`, data)
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.log(error);
			});

		// axios.post(api, {})
		// const todo = {};
		if (isExist(this.input.current.state.text)) {
			this.setState(prevState => ({
				todo: {
					...prevState.todo,
					text: this.input.current.state.text,
					edit: false,
					startTime,
					date,
					time,
					fileData,
					fileName,
					fileType,
					hasImage,
					textarea,
					deadline: isExist(startTime),
					file: isExist(fileData),
					comment: isExist(textarea),
				},
			}));
		} else {
			alert('請輸入 Todo 標題 !');
		}
	}

	handleCancel() {
		this.setState(prevState => ({
			todo: {
				...prevState.todo,
				edit: false,
			},
		}));
	}

	addStar() {
		this.setState(prevState => ({
			todo: {
				...prevState.todo,
				star: !prevState.todo.star,
			},
		}));
	}

	onEdit() {
		this.setState(prevState => ({
			todo: {
				...prevState.todo,
				edit: !prevState.todo.edit,
			},
		}));
	}

	onCheck(value, checked) {
		console.log(value);
		console.log(checked);
		this.setState(prevState => ({
			todo: {
				...prevState.todo,
				// checked: !prevState.todo.checked,
				checked,
			},
		}));
	}

	render() {
		const { edit } = this.state;
		const { className, text, star, date, file, name, type, comment, complete } = this.props;

		return (
			<div className={classnames(styles.todoItem, className)}>
				<List
					ref={this.input}
					text={text}
					checked={complete === 'completed'}
					star={star}
					edit={edit}
					date={date}
					deadline={isExist(date)}
					file={isExist(file)}
					comment={isExist(comment)}
					addStar={this.addStar}
					onEdit={this.onEdit}
					onChangeCheckbox={this.onCheck}
				/>
				{edit && (
					<TodoPanel
						// Add task and edit
						ref={this.panel}
						date={transDayToDate(date)}
						file={file}
						name={name}
						type={type}
						textarea={comment}
						onSave={this.handleSave}
						onCancel={this.handleCancel}
					/>
				)}
			</div>
		);
	}
}

export default TodoItem;
