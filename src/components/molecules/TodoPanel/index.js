import React, { Component } from 'react';
import classnames from 'classnames';

import Button from 'components/atoms/Button';
import ButtonFile from 'components/atoms/ButtonFile';
import FieldDate from 'components/atoms/FieldDate';
import Icon from 'components/atoms/Icon';

import styles from './index.css';

class TodoPanel extends Component {
	constructor(props) {
		super(props);
		this.inputDate = React.createRef();
		this.inputTime = React.createRef();

		const { todoData } = this.props;

		this.state = {
			caaheTodo: {},
			...todoData,
		};

		this.onUploadFile = this.onUploadFile.bind(this);
		this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
		this.onChangDate = this.onChangDate.bind(this);
		this.onChangeTime = this.onChangeTime.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	handleDateChange(e) {
		console.log(e);

		this.setState({ startTime: e }, () => {
			const { startTime } = this.state;
			const year = startTime.getFullYear();
			const month = startTime.getMonth() + 1;
			const day = startTime.getDate();
			const hour = startTime.getHours();
			const minute = startTime.getMinutes();
			this.setState({
				date: `${year}/${month}/${day}`,
				time: `${hour}:${minute}0`,
			});
		});
	}

	onUploadFile(e) {
		const file = e.target.files.item(0);

		const fr = new FileReader();

		fr.addEventListener('load', () => {
			if (file.type === 'image/png' || file.type === 'image/jpeg') {
				this.setState({
					fileData: fr.result,
					hasImage: true,
				});
			} else {
				this.setState({
					fileData: fr.result,
					hasImage: false,
				});
			}
		});

		fr.readAsDataURL(file);

		this.setState({
			fileName: file.name,
			fileType: file.type,
		});
	}

	handleChangeTextarea(e) {
		this.setState({
			textarea: e.target.value,
		});
	}

	onChangDate(e) {
		const year = e.getFullYear();
		const month = e.getMonth() + 1;
		const day = e.getDate();

		this.setState({
			date: `${year}/${month}/${day}`,
		});
	}

	onChangeTime(e) {
		const hour = e.getHours();
		const minute = e.getMinutes();

		this.setState({
			time: `${hour}:${minute}0`,
		});
	}

	render() {
		const { startTime, hasImage, fileName, fileData, textarea } = this.state;
		const { className, onCancel = () => {}, onSave = () => {}, todoData, ...other } = this.props;

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
								onChange={this.onChangDate}
								ref={this.inputDate}
								handleDateChange={this.handleDateChange}
								startTime={startTime}
								{...other}
							/>
							<FieldDate
								timeOnly
								onChange={this.onChangDate}
								ref={this.inputDate}
								handleDateChange={this.handleDateChange}
								startTime={startTime}
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
							{!hasImage && <span>{fileName}</span>}
						</div>
						{hasImage && (
							<div className={classnames(styles.photo, styles.preview)}>
								<span>{fileName}</span>
								<img src={fileData} alt="preview" />
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
								type="text"
								name="comment"
								placeholder="Type your memo here..."
								onChange={this.handleChangeTextarea}
								value={textarea}
								{...other}
							/>
						</div>
					</div>
				</div>
				<div className={styles.buttonGroup}>
					<Button color="cancel" onClick={() => onCancel(this.state)}>
						<Icon>close</Icon>
						Cancel
					</Button>
					<Button color="save" onClick={() => onSave(this.state)}>
						<Icon>add</Icon>
						Add Task
					</Button>
				</div>
			</div>
		);
	}
}

export default TodoPanel;
