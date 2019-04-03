import React, { Component } from 'react';
import classnames from 'classnames';

import Input from 'components/atoms/Input';
import TodoItem from 'components/molecules/TodoItem';

import styles from './index.css';

class TodoList extends Component {
	constructor(props) {
		super(props);
		this.input = React.createRef();

		this.state = {
			todos: [
				{
					id: '',
					title: '',
					deadline: '',
					file: '',
					comment: '',
					star: false,
					edit: false,
					checked: false,
				},
			],
			open: false,
		};

		this.onFocus = this.onFocus.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	onFocus() {
		console.log(this);
		this.setState({
			open: true,
		});
	}

	handleSubmit(e) {
		console.log(e);
		this.input.current.state.value = '';
		this.setState(prevState => ({
			todos: [
				...prevState.todos,
				{
					id: Date.now(),
					title: 'test',
					deadline: '',
					file: '',
					comment: '',
					star: false,
					edit: false,
					checked: false,
				},
			],
			open: false,
		}));
	}

	handleCancel() {
		this.setState({
			open: false,
		});
		this.input.current.state.value = '';
	}

	render() {
		const { className, value, ...props } = this.props;
		const { todos, open } = this.state;

		return (
			<div className={classnames(styles.todolist, className)}>
				<Input
					className={styles.inputButton}
					ref={this.input}
					onFocus={this.onFocus}
					placeholder="Add Task"
					onSubmit={this.handleSubmit}
					{...props}
				/>
				{open && <TodoItem />}
				{todos.title &&
					todos.map(todo => (
						<TodoItem
							key={todo.id}
							text={todo.title}
							star={todo.star}
							edit={todo.edit}
							checked={todo.checked}
							date={todo.deadline}
							file={todo.file}
							comment={todo.comment}
						/>
					))}
			</div>
		);
	}
}

export default TodoList;
