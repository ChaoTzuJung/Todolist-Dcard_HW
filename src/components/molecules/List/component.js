import React from 'react';
import classnames from 'classnames';
import Icon from 'components/atoms/Icon';
import Checkbox from 'components/atoms/Checkbox';

import styles from './index.css';

const List = ({ className, todo, star, edit, checked, onChangeCheckbox }) => (
	<div className={classnames(styles.list, className, {
		[styles.colorList]: star,
	})}>
		<div className={styles.left}>
			<div className={styles.top}>
				<Checkbox
					className={classnames({
						[styles.lineThrough]: checked,
					})}
					name="todo"
					checked={checked}
					content="Type Something Here..."
					onChange={onChangeCheckbox}
				/>
			</div>
			{!checked && (
				<div className={styles.down}>
					<Icon className={styles.iconFix}>date_range</Icon>
					{todo.dateline && <span>{todo.dateline}</span>}
					<Icon className={styles.iconFix} outlined>insert_drive_file</Icon>
					<Icon className={styles.iconFix} outlined>textsms</Icon>
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
);

export default List;
