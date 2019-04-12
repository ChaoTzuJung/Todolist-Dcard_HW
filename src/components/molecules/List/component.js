import React, { Fragment } from 'react';
import classnames from 'classnames';

import Checkbox from 'components/atoms/Checkbox';
import Field from 'components/atoms/Field';
import Icon from 'components/atoms/Icon';

import styles from './index.css';

const List = ({
	// state
	cacheTodo: { message },
	completed,
	// message,
	star,
	edit,

	// props
	className,
	// icon 隔壁的時間
	date,
	// 3個小icon
	deadline,
	file,
	comment,
	addStar,
	onEdit,

	// actions
	handleCheckboxChange,
	handleChange,
}) => (
	<Fragment>
		<div
			className={classnames(styles.list, className, {
				[styles.colorList]: star,
				[styles.squaredBottom]: edit,
			})}
		>
			<div className={styles.left}>
				<div className={styles.top}>
					{edit ? (
						<Field
							className={styles.fieldFix}
							name="edit_todo"
							icon=""
							placeholder="Type Something Here..."
							valid="false"
							color={star ? '#FFF2DC' : '#F2F2F2'}
							border="false"
							value={message}
							onChange={handleChange}
						/>
					) : (
						<Checkbox
							className={classnames({
								[styles.lineThrough]: completed,
							})}
							name={message}
							value={message}
							content={message}
							checked={completed}
							onChange={handleCheckboxChange}
						/>
					)}
				</div>
				{!completed && (
					<div className={styles.down}>
						{deadline && (
							<Fragment>
								<Icon className={styles.iconFix}>date_range</Icon>
								{deadline && <span>{date}</span>}
							</Fragment>
						)}
						{file && (
							<Icon className={styles.iconFix} outlined>
								insert_drive_file
							</Icon>
						)}
						{comment && (
							<Icon className={styles.iconFix} outlined>
								textsms
							</Icon>
						)}
					</div>
				)}
			</div>
			<div className={styles.right}>
				<span onClick={addStar} onKeyPress={addStar} role="button" tabIndex="0">
					<Icon
						className={classnames({
							[styles.star]: star,
						})}
					>
						{star ? 'star' : 'star_border'}
					</Icon>
				</span>
				<span onClick={onEdit} onKeyPress={onEdit} role="button" tabIndex="0">
					<Icon
						className={classnames({
							[styles.edit]: edit,
						})}
						outlined={!edit}
					>
						edit
					</Icon>
				</span>
			</div>
		</div>
	</Fragment>
);

export default List;
