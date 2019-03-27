import React from 'react';
import classnames from 'classnames';
import Button from 'components/atoms/Button';
import ButtonFile from 'components/atoms/ButtonFile';
import Field from 'components/atoms/Field';
import FieldDate from 'components/atoms/FieldDate';
import Icon from 'components/atoms/Icon';

import styles from './index.css';

const TodoPanel = ({
	className,
	imageUrl,
	hasImage,
	files,
	id,
	onUploadFile,
	handleChangeTextarea,
	textareaValue,
	...other
}) => (
	<div className={classnames(styles.todoPanel, className)}>
		<div className={styles.fieldGroup}>
			<label htmlFor={id}>
				<p>
					<Icon>date_range</Icon>
					<span>Deadline</span>
				</p>
				<div className={styles.row}>
					<FieldDate dateOnly id={id} {...other} />
					<FieldDate timeOnly id={id} {...other} />
				</div>
			</label>
			<label htmlFor={id}>
				<p>
					<Icon outlined>insert_drive_file</Icon>
					<span>File</span>
				</p>
				<div className={styles.row}>
					<ButtonFile onChange={onUploadFile}>
						<i className="material-icons" style={{ color: '#FFFFFF' }}>add</i>
					</ButtonFile>
					{hasImage && <span>{files.name}</span>}
				</div>
				{hasImage && (
					<div className={classnames(styles.photo, styles.preview)}>
						<img src={imageUrl} alt="preview" />
					</div>
				)}
			</label>

			<label htmlFor={id}>
				<p>
					<Icon outlined>textsms</Icon>
					<span>Comment</span>
				</p>
				<div className={styles.row}>
					<textarea
						type="text"
						id={id}
						name="comment"
						placeholder="Type your memo here..."
						onChange={handleChangeTextarea}
						value={textareaValue}
						{...other}
					/>
				</div>
			</label>
		</div>
		<div className={styles.buttonGroup}>
			<Button color="cancel">
				<Icon>close</Icon>
				Cancel
			</Button>
			<Button color="save">
				<Icon>add</Icon>
				Add Task
			</Button>
		</div>
	</div>
);

export default TodoPanel;
