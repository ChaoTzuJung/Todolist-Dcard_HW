import React, { Component } from 'react';
import classnames from 'classnames';

import { transDateToDay } from 'util/helper';
import Button from 'components/atoms/Button';
import ButtonFile from 'components/atoms/ButtonFile';
import FieldDate from 'components/atoms/FieldDate';
import Icon from 'components/atoms/Icon';

import { firebaseDB } from '../../../../firebase';
import styles from './index.css';

class TodoPanel extends Component {
	constructor(props) {
		super(props);
		this.inputDate = React.createRef();
		this.inputTime = React.createRef();
		this.textareaRef = React.createRef();
		const { textarea } = this.props;

		this.state = {
			textarea: textarea || '',
			cacheTodo: {},
		};

		this.onUploadFile = this.onUploadFile.bind(this);
		this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	componentDidMount() {
		const { id, isNewTodo } = this.props;
		if (!isNewTodo) {
			firebaseDB
				.ref(`todos/${id}`)
				.once('value')
				.then(snapshot => {
					this.setState(prevState => ({
						cacheTodo: { ...prevState.cacheTodo, ...snapshot.val() },
					}));
				});
		}
	}

	handleDateChange(e) {
		const { day, time } = transDateToDay(e);
		this.setState(prevState => ({
			cacheTodo: {
				...prevState.cacheTodo,
				timestamp: e,
				date: `${day} ${time}`,
			},
		}));
	}

	onUploadFile(e) {
		const file = e.target.files.item(0);
		const fr = new FileReader();
		const { name, type } = file;

		fr.addEventListener('load', () => {
			this.setState(prevState => ({
				cacheTodo: {
					...prevState.cacheTodo,
					type,
					name,
					file: fr.result,
				},
			}));
		});

		fr.readAsDataURL(file);
	}

	handleChangeTextarea(e) {
		this.setState(
			{
				textarea: e.target.value,
			},
			() => {
				this.setState(prevState => ({
					cacheTodo: {
						...prevState.cacheTodo,
						comment: prevState.textarea,
					},
				}));
			},
		);
	}

	render() {
		const {
			textarea,
			cacheTodo: { timestamp, date, type, name, file, comment, completed },
		} = this.state;

		const { className, onCancel = () => {}, onSave = () => {}, ...other } = this.props;

		return (
			<div className={classnames(styles.todoPanel, className)}>
				<div className={styles.fieldGroup}>
					<div className={styles.label}>
						<p>
							<Icon>date_range</Icon>
							<span>Deadline</span>
						</p>
						<div className={styles.row}>
							<FieldDate
								dateOnly
								ref={this.inputDate}
								startTime={timestamp}
								handleDateChange={this.handleDateChange}
								{...other}
							/>
							<FieldDate
								timeOnly
								ref={this.inputDate}
								startTime={timestamp}
								handleDateChange={this.handleDateChange}
								{...other}
							/>
						</div>
					</div>
					<div className={styles.label}>
						<p>
							<Icon outlined>insert_drive_file</Icon>
							<span>File</span>
						</p>
						<div className={styles.row}>
							<ButtonFile onChange={this.onUploadFile}>
								<i className="material-icons" style={{ color: '#FFFFFF' }}>
									add
								</i>
							</ButtonFile>
							<span>{name}</span>
						</div>
						{(type === 'image/png' || type === 'image/jpeg') && (
							<div className={classnames(styles.photo, styles.preview)}>
								<img src={file} alt="preview" />
							</div>
						)}
					</div>
					<div className={styles.label}>
						<p>
							<Icon outlined>textsms</Icon>
							<span>Comment</span>
						</p>
						<div className={styles.row}>
							<textarea
								ref={this.textareaRef}
								type="text"
								name="comment"
								placeholder="Type your memo here..."
								value={textarea}
								onChange={this.handleChangeTextarea}
							/>
						</div>
					</div>
				</div>
				<div className={styles.buttonGroup}>
					<Button color="cancel" onClick={() => onCancel()}>
						<Icon>close</Icon>
						Cancel
					</Button>
					<Button
						color="save"
						onClick={() =>
							onSave({
								timestamp,
								date,
								type,
								name,
								file,
								comment,
								completed,
							})
						}
					>
						<Icon>add</Icon>
						Add Task
					</Button>
				</div>
			</div>
		);
	}
}

export default TodoPanel;
