import React, { Component } from 'react';
import classnames from 'classnames';
import axios from 'axios';

import Input from 'components/atoms/Input';
import TodoItem from 'components/molecules/TodoItem';

import styles from './index.css';

class TodoList extends Component {
	constructor(props) {
		super(props);
		this.input = React.createRef();

		this.state = {
			todos: [],
			isNewTodo: false,
		};

		this.onFocus = this.onFocus.bind(this);
		this.handleNewTodo = this.handleNewTodo.bind(this);
	}

	componentDidMount() {
		const URL = 'http://localhost:5000';

		axios
			.get(`${URL}/todos`)
			.then(response => {
				this.setState(prevState => ({
					...prevState.todos,
					todos: response.data,
				}));
			})
			.catch(error => {
				console.log(error);
			});
	}

	onFocus() {
		this.setState({
			isNewTodo: true,
		});
	}

	handleNewTodo() {
		this.setState({
			isNewTodo: false,
		});
	}

	render() {
		const { className, value, ...props } = this.props;
		const { todos, isNewTodo } = this.state;
		return (
			<div className={classnames(styles.todolist, className)}>
				<div className={styles.inputPanel}>
					{isNewTodo ? (
						<TodoItem isNewTodo={isNewTodo} setNewTodo={this.handleNewTodo} />
					) : (
						<Input
							className={styles.inputButton}
							ref={this.input}
							onFocus={this.onFocus}
							placeholder="Add Task"
							{...props}
						/>
					)}
				</div>

				{todos.reverse().map(todo => (
					<TodoItem
						key={todo.id}
						id={todo.id}
						message={todo.message}
						star={todo.star}
						date={todo.date}
						file={todo.file}
						name={todo.name}
						type={todo.type}
						comment={todo.comment}
						completed={todo.completed}
						isNewTodo={isNewTodo}
						setNewTodo={this.handleNewTodo}
					/>
				))}
			</div>
		);
	}
}

export default TodoList;
