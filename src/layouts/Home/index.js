import React from 'react';
import { Link } from 'react-router';
import TodoItem from 'components/organisms/TodoList';

import styles from './index.css';

const HomeLayout = () => (
	<div className={styles.homeLayout}>
		<TodoItem />
	</div>
);

export default HomeLayout;
