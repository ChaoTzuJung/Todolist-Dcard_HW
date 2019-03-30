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

		this.state = {
			date: '',
			time: '',
			hasImage: false,
			imageUrl: null,
			fileName: '',
			fileType: null,
			fileData: null,
			textareaValue: '',
		};

		this.onCancel = this.onCancel.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onUploadFile = this.onUploadFile.bind(this);
		this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
		this.onChangDate = this.onChangDate.bind(this);
		this.onChangeTime = this.onChangeTime.bind(this);
	}

	onCancel() {
		this.setState({
			date: '',
			time: '',
			hasImage: false,
			imageUrl: null,
			fileName: '',
			fileType: null,
			fileData: null,
			textareaValue: '',
		});
		console.log(this.inputDate);
		console.log(this.inputTime);

		this.inputDate.current.state.startDate = null;
		this.inputTime.current.state.startDate = null;
	}

	onSave() {
		this.setState({
			date: '10/12',
			time: '10:10',
			hasImage: false,
			imageUrl: 'text',
			fileName: 'test',
			fileType: 'text',
			fileData: 'text',
			textareaValue: 'test',
		});
	}

	onUploadFile(e) {
		const file = e.target.files.item(0);

		const fr = new FileReader();

		fr.addEventListener('load', () => {
			if (file.type === 'image/png' || file.type === 'image/jpeg') {
				this.setState({
					imageUrl: fr.result,
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
			textareaValue: e.target.value,
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
		const { date, time, imageUrl, hasImage, fileName, fileType, fileData, textareaValue } = this.state;
		const { className, onCancel, onSave, ...other } = this.props;

		return (
			<div className={classnames(styles.todoPanel, className)}>
				<div className={styles.fieldGroup}>
					<div className={styles.label}>
						<p>
							<Icon>date_range</Icon>
							<span>Deadline</span>
						</p>
						<div className={styles.row}>
							<FieldDate dateOnly {...other} onChange={this.onChangDate} ref={this.inputDate} />
							<FieldDate timeOnly {...other} onChange={this.onChangeTime} ref={this.inputTime} />
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
								<img src={imageUrl} alt="preview" />
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
								value={textareaValue}
								{...other}
							/>
						</div>
					</div>
				</div>
				<div className={styles.buttonGroup}>
					<Button color="cancel" onClick={this.onCancel}>
						<Icon>close</Icon>
						Cancel
					</Button>
					<Button color="save" onClick={this.onSave}>
						<Icon>add</Icon>
						Add Task
					</Button>
				</div>
			</div>
		);
	}
}

export default TodoPanel;
