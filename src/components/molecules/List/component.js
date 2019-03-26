import React, { Fragment } from 'react';
import classnames from 'classnames';
import Checkbox from 'components/atoms/Checkbox';
import Field from 'components/atoms/Field'
import Icon from 'components/atoms/Icon';

import styles from './index.css';

const List = ({ className, todo, star, edit, checked, date, file, comment, onChangeCheckbox }) => (
	<Fragment>
		<div
			className={classnames(styles.list, className, {
				[styles.colorList]: star,
			})}
		>
			<div className={styles.left}>
				<div className={styles.top}>
					{!edit ? (
						<Checkbox
							className={classnames({
								[styles.lineThrough]: checked,
							})}
							name="todo"
							checked={checked}
							content="Type Something Here..."
							onChange={onChangeCheckbox}
						/>
					) : (
						<Field
							className={styles.fieldFix}
							name="edit_todo"
							icon=""
							placeholder="Type Something Here..."
							valid="false"
							color={star ? '#FFF2DC' : '#F2F2F2'}
							border="false"
						/>
					)}
				</div>
				{!checked && (
					<div className={styles.down}>
						{date && (
							<Fragment>
								<Icon className={styles.iconFix}>date_range</Icon>
								{todo.dateline && <span>{todo.dateline}</span>}
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
				<Icon
					className={classnames({
						[styles.star]: star,
					})}
				>
					{star ? 'star' : 'star_border'}
				</Icon>
				<Icon
					className={classnames({
						[styles.edit]: edit,
					})}
					outlined={!edit}
				>
					edit
				</Icon>
			</div>
		</div>
	</Fragment>
);

export default List;
