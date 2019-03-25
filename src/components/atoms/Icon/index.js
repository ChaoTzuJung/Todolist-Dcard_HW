import React from 'react';
import classnames from 'classnames';

import styles from './index.css';

const Icon = ({
	children,
	className,
	outlined,
	light = false,
	...other
}) => (
	<i
		className={classnames(styles.icon,
			className,
			{
				[`material-icons`]: !outlined,
				[`material-icons-outlined`]: outlined,
			},
			{
				[styles.light]: light,
			})}
		{...other}
	>
		{children}
	</i>
);

export default Icon;
