import React from 'react';
import classnames from 'classnames';

import styles from './index.css';

const Navigation = ({ className, todoCategorys, activeCategory, onClickTab }) => (
	<div className={classnames(styles.navigation, className)}>
		{todoCategorys.map(category => (
			<div
				key={category.key}
				className={classnames(styles.item, {
					[styles.active]: category.key === activeCategory,
				})}
				role="button"
				tabIndex="0"
				onClick={() => onClickTab(category.key)}
				onKeyPress={() => {}}
			>
				{category.label}
				<div className={styles.bottomLine} />
			</div>
		))}
	</div>
);

export default Navigation;
