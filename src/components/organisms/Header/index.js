import React from 'react';
import Navigation from 'components/molecules/Navigation';
import styles from './index.css';

const Header = () => (
	<header className={styles.header}>
		<Navigation />
	</header>
);

export default Header;
