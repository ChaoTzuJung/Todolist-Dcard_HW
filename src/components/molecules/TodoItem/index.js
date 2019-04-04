import React, { Component } from 'react';
import classnames from 'classnames';
import { isExist } from 'util/helper';
import List from 'components/molecules/List';
import TodoPanel from 'components/molecules/TodoPanel';

import styles from './index.css';

class TodoItem extends Component {
	constructor(props) {
		super(props);
		this.input = React.createRef();
		this.panel = React.createRef();

		this.state = {
			todo: {
				text: '',
				checked: false,
				star: false,
				edit: true,
				startTime: '',
				date: '',
				time: '',
				fileData: '',
				fileName: '',
				fileType: '',
				hasImage: false,
				textarea: '',
			},
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
		//  List contains a simple text input. We need to expose a way for other components to read the text written in the List component.
		const todo = {};
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
		const { todo } = this.state;
		const { className, edit } = this.props;
		const todoData = { ...todo };

		return (
			<div className={classnames(styles.todoItem, className)}>
				<List
					text={todo.text}
					checked={todo.checked}
					star={todo.star}
					edit={edit}
					deadline={todo.date || todo.time}
					date={`${todo.date} ${todo.time}` || todo.date || todo.time}
					file={todo.file}
					comment={todo.comment}
					ref={this.input}
					addStar={this.addStar}
					onEdit={this.onEdit}
					onChangeCheckbox={this.onCheck}
				/>
				{edit && (
					<TodoPanel
						// Add task and edit
						todoData={todoData}
						onSave={this.handleSave}
						onCancel={this.handleCancel}
						ref={this.panel}
					/>
				)}
			</div>
		);
	}
}

export default TodoItem;
