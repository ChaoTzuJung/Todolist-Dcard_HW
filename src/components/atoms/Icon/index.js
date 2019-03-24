import React from 'react';
import classnames from 'classnames';

import styles from './index.css';

const Icon = ({
	children,
	className,
	light = false,
	size = 'md-24', // CSS rules for the standard material design sizing guidelines (.md-18 .md-24 .md-36 .md-48)
	...other
}) => (
	<i
		className={classnames(`material-icons ${size}`, styles.icon, className, {
			[styles.light]: light,
		})}
		{...other}
	>
		{children}
	</i>
);

export default Icon;
