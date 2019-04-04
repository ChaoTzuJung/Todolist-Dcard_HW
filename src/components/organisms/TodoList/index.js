import React, { Component } from 'react';
import classnames from 'classnames';

import Input from 'components/atoms/Input';
import TodoItem from 'components/molecules/TodoItem';

import styles from './index.css';
import DB from '../../../../db.json';

console.log(DB);

class TodoList extends Component {
	constructor(props) {
		super(props);
		this.input = React.createRef();

		this.state = {
			todos: [],
			isNewTodo: false,
		};

		this.onFocus = this.onFocus.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	onFocus() {
		this.setState({
			isNewTodo: true,
		});
	}

	handleSubmit(e) {
		console.log(ec);
		this.setState({
			isNewTodo: false,
		});
	}

	handleCancel() {
		this.setState({
			open: false,
		});
		this.input.current.state.value = '';
	}

	render() {
		const { className, value, ...props } = this.props;
		const { todos, isNewTodo } = this.state;

		return (
			<div className={classnames(styles.todolist, className)}>
				<div className={styles.inputPanel}>
				{isNewTodo ?
					<TodoItem edit={true}/>
					:
					<Input
						className={styles.inputButton}
						ref={this.input}
						onFocus={this.onFocus}
						placeholder="Add Task"
						onSubmit={this.handleSubmit}
						{...props}
					/>
				}
				</div>

				{DB.todos.map(todo => {
					console.log(todo);
					return (
						<TodoItem
							key={todo.id}
							text={todo.message}
							star={todo.stared}
							edit={todo.edit}
							checked={todo.checked}
							date={todo.deadline}
							file={todo.file}
							comment={todo.comment}
						/>
					);
				})}
			</div>
		);
	}
}

export default TodoList;
