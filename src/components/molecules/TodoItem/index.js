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

		this.state = {
			todo: {
				// List 呈現
				text: '',
				checked: false,
				star: false,
				edit: true,
				deadline: false,
				file: false,
				comment: false,
				// panel 資料
				date: '',
				time: '',
				hasImage: false,
				imageUrl: null,
				fileName: '',
				fileType: null,
				fileData: null,
				textareaValue: '',
			},
		};
		this.handleSave = this.handleSave.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	handleSave(data) {
		const { date, time, fileName, imageUrl, fileData, textareaValue } = data

		// this.setState(prevState => ({
		// 	...prevState.todo,
		// 	date: data.date,
		// 	time: data.time,
		// 	fileName: data.fileName,
		// 	imageUrl: data.imageUrl,
		// 	fileData: data.fileData,
		// 	textareaValue: data.textareaValue,
		// }));
		// 缺 監察是否有填欄位
		if (isExist(this.input.current.state.text)) {
			this.setState(prevState => ({
				todo: {
					...prevState.todo,
					text: this.input.current.state.text,
					edit: false,
					deadline: isExist(date),
					file: isExist(fileName),
					comment: isExist(textareaValue),
				},
			}));
		} else {
			alert('請輸入 Todo 標題 !');
		}
	}

	handleCancel(e) {
		console.log(e);
	}

	render() {
		const { todo } = this.state;
		const { className, checked, star } = this.props;

		return (
			<div className={classnames(styles.todoItem, className)}>
				<List
					text={todo.text}
					checked={checked}
					star={star}
					edit={todo.edit}
					deadline={todo.deadline}
					file={todo.file}
					comment={todo.comment}
					ref={this.input}
				/>
				{todo.edit && <TodoPanel onSave={this.handleSave} onCancel={this.handleCancel} />}
			</div>
		);
	}
}

export default TodoItem;
