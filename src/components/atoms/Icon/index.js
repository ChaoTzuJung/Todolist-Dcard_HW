import React from 'react';
import classnames from 'classnames';

import styles from './index.css';

const Icon = ({
	children,
	className,
	outlined,
	light = false,
	size = 'md-24', // CSS rules for the standard material design sizing guidelines (.md-18 .md-24 .md-36 .md-48)
	...other
}) => (
	<i
		className={classnames(styles.icon,
			className,
			{
				[`material-icons ${size}`]: !outlined,
				[`material-icons-outlined ${size}`]: outlined,
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
