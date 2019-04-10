import React, { Component } from 'react';
import classnames from 'classnames';
import Input from 'components/atoms/Input';
import TodoItem from 'components/molecules/TodoItem';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { firebaseTodos, firebaseLooper } from '../../../../firebase';
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
		firebaseTodos.on('value', snapshot => {
			const todos = firebaseLooper(snapshot).reverse();
			this.setState(prevState => ({
				...prevState.todos,
				todos,
			}));
		});
	}

	componentDidUpdate(prevProps) {
		console.log(prevProps);
		console.log(this.props);
		// eslint-disable-next-line react/destructuring-assignment
		if (this.props.todos !== prevProps.todos) {
			firebaseTodos.once('value').then(snapshot => {
				const todos = firebaseLooper(snapshot).reverse();
				this.setState(prevState => ({
					...prevState.todos,
					todos,
				}));
				console.log(todos);
			});
			console.log('componentDidUpdate');
		}
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
		const { className, value, tab, ...props } = this.props;
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
				{tab === 'myTasks' &&
					todos.map(todo => (
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
				{tab === 'inProgress' &&
					todos
						.reduce((filtered, todo) => {
							if (!todo.completed) {
								const filteredTodo = { ...todo };
								filtered.push(filteredTodo);
							}
							return filtered;
						}, [])
						.map(todo => {
							return (
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
							);
						})}
				{tab === 'completed' &&
					todos
						.reduce((filtered, todo) => {
							if (todo.completed) {
								const filteredTodo = { ...todo };
								filtered.push(filteredTodo);
							}
							return filtered;
						}, [])
						.map(todo => (
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
