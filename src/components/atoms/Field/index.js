import React from 'react';
import classnames from 'classnames';

import styles from './index.css';

const Field = ({ type, icon, name, className, valid = true, color, border, ...other }) => (
	<label
		htmlFor={name}
		className={classnames(styles.field, className, {
			[styles.file]: type === 'file',
			[styles.icon]: icon !== '',
			[styles.invalid]: !valid,
		})}
	>
		{icon && <i className="material-icons">{icon}</i>}
		<input
			className={classnames(styles.input, {
				[styles.border]: border,
			})}
			style={{ background: color }}
			autoComplete="off"
			type={type}
			name={name}
			{...other}
		/>
	</label>
);

export default Field;
