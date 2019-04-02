import React, { Fragment } from 'react';
import classnames from 'classnames';
import Checkbox from 'components/atoms/Checkbox';
import Field from 'components/atoms/Field';
import Icon from 'components/atoms/Icon';

import styles from './index.css';

const List = ({ className, text, star, edit, checked, deadline, file, comment, onChangeCheckbox, handleChange, AddStar, OpenEdit }) => (
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
							defaultValue={text}
							onChange={handleChange}
						/>
					) : (
						<Checkbox
							className={classnames({
								[styles.lineThrough]: checked,
							})}
							name="todo"
							checked={checked}
							content={text}
							onChange={onChangeCheckbox}
						/>
					)}
				</div>
				{!checked && (
					<div className={styles.down}>
						{deadline && (
							<Fragment>
								<Icon className={styles.iconFix}>date_range</Icon>
								{deadline && <span>6/18</span>}
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
					onClick={AddStar}
				>
					{star ? 'star' : 'star_border'}
				</Icon>
				<Icon
					className={classnames({
						[styles.edit]: edit,
					})}
					outlined={!edit}
					onClick={OpenEdit}
				>
					edit
				</Icon>
			</div>
		</div>
	</Fragment>
);

export default List;
