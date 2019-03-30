import React from 'react';
import classnames from 'classnames';
import Button from 'components/atoms/Button';
import ButtonFile from 'components/atoms/ButtonFile';
import FieldDate from 'components/atoms/FieldDate';
import Icon from 'components/atoms/Icon';

import styles from './index.css';

const TodoPanel = ({
	date,
	time,
	imageUrl,
	hasImage,
	fileName,
	fileType,
	fileData,
	textareaValue,

	className,
	onCancel,
	onSave,

	handleCancel,
	handleSave,
	onUploadFile,
	handleChangeTextarea,
	onChangDate,
	onChangeTime,

	...other
}) => (
	<div className={classnames(styles.todoPanel, className)}>
		<div className={styles.fieldGroup}>
			<div className={styles.label}>
				<p>
					<Icon>date_range</Icon>
					<span>Deadline</span>
				</p>
				<div className={styles.row}>
					<FieldDate dateOnly {...other} onChange={onChangDate} />
					<FieldDate timeOnly {...other} onChange={onChangeTime} />
				</div>
			</div>
			<div className={styles.label}>
				<p>
					<Icon outlined>insert_drive_file</Icon>
					<span>File</span>
				</p>
				<div className={styles.row}>
					<ButtonFile onChange={onUploadFile}>
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
						onChange={handleChangeTextarea}
						value={textareaValue}
						{...other}
					/>
				</div>
			</div>
		</div>
		<div className={styles.buttonGroup}>
			<Button color="cancel" onClick={handleCancel}>
				<Icon>close</Icon>
				Cancel
			</Button>
			<Button color="save" onClick={handleSave}>
				<Icon>add</Icon>
				Add Task
			</Button>
		</div>
	</div>
);

export default TodoPanel;
