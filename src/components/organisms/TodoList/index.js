/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import classnames from 'classnames';
import Input from 'components/atoms/Input';
import TodoItem from 'components/molecules/TodoItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { firebaseTodos, firebaseLooper, firebaseSort } from '../../../../firebase';
import styles from './index.css';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

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
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	componentDidMount() {
		console.log('**TodoList** componentDidMount 嘍 !!');
		firebaseTodos.on('value', todoSnapshot => {
			// 確認Todo資料庫有資料 true or null
			if (todoSnapshot.val()) {
				// 有資料就抓出排序 讓 firebaseTodos 可以排序一下
				// eslint-disable-next-line no-shadow
				firebaseSort.once('value', sortSnapshot => {
					// 再確認Sort資料庫有資料 true or null
					if (sortSnapshot.val()) {
						// eslint-disable-next-line no-shadow
						firebaseSort.on('value', snapshot => {
							const sortIndex = [];
							const sortedArray = [];
							snapshot.forEach(childSnapshot => {
								// 抓出排序給 firebaseTodos 做參考
								sortIndex.push(childSnapshot.val());
							});
							// eslint-disable-next-line no-shadow
							firebaseTodos.once('value').then(snapshot => {
								const todoObject = snapshot.val();
								// 把 firebaseSort 排序塞入 firebaseTodo
								sortIndex.map(key => sortedArray.push(todoObject[key]));
								this.setState(prevState => ({
									...prevState.todos,
									todos: sortedArray,
								}));
							});
						});
					} else {
						// Sort 若無資料，直接把顯有 firebaseTodos 加入 state 並 渲染資料
						const todos = firebaseLooper(todoSnapshot);
						this.setState(prevState => ({
							...prevState.todos,
							todos,
						}));
					}
				});
			}
		});
	}

	onDragEnd(result) {
		// dropped outside the list
		if (!result.destination) {
			return;
		}
		const { todos } = this.state;
		const todo = reorder(todos, result.source.index, result.destination.index);
		// this.setState({
		// 	todos: todo,
		// });
		// 產生新順序
		const sortId = [];
		todo.forEach(obj => {
			sortId.push(obj.id);
		});

		// Todo 依照順序並渲染data跟畫面
		firebaseTodos.on('value', snapshot => {
			const TodoObj = snapshot.val();
			const answer = [];

			sortId.forEach(key => {
				let found = false;
				Object.keys(TodoObj).filter(item => {
					if (!found && item === key) {
						const newTodo = { ...TodoObj[item], id: item };
						answer.push(newTodo);
						found = true;
						return false;
					}
					return true;
				});
			});
			this.setState(prevState => ({
				...prevState.todos,
				todos: answer,
			}));
			// 建立順序
			firebaseSort.set(sortId);
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
		const { className, value, tab, ...props } = this.props;
		const { todos, isNewTodo } = this.state;
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
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
					<Droppable droppableId="droppable">
						{/* eslint-disable-next-line no-unused-vars */}
						{(provided, snapshot) => (
							<div {...provided.droppableProps} ref={provided.innerRef}>
								{tab === 'myTasks' &&
									todos.map((todo, index) => (
										<Draggable key={todo.id} draggableId={todo.id} index={index}>
											{/* eslint-disable-next-line no-shadow */}
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
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
												</div>
											)}
										</Draggable>
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
										.map((todo, index) => (
											<Draggable key={todo.id} draggableId={todo.id} index={index}>
												{/* eslint-disable-next-line no-shadow */}
												{(provided, snapshot) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
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
													</div>
												)}
											</Draggable>
										))}
								{tab === 'completed' &&
									todos
										.reduce((filtered, todo) => {
											if (todo.completed) {
												const filteredTodo = { ...todo };
												filtered.push(filteredTodo);
											}
											return filtered;
										}, [])
										.map((todo, index) => (
											<Draggable key={todo.id} draggableId={todo.id} index={index}>
												{/* eslint-disable-next-line no-shadow */}
												{(provided, snapshot) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
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
													</div>
												)}
											</Draggable>
										))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</div>
			</DragDropContext>
		);
	}
}

export default TodoList;
