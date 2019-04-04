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
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
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

	handleSubmit(e) {
		console.log(e);
		this.setState({
			isNewTodo: false,
		});
	}

	handleCancel() {
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

				{todos.map(todo => (
					<TodoItem
						key={todo.timestamp}
						text={todo.message}
						star={todo.stared}
						date={todo.date}
						file={todo.file}
						name={todo.name}
						type={todo.type}
						comment={todo.comment}
						complete={todo.complete}
					/>
				))}
			</div>
		);
	}
}

export default TodoList;
