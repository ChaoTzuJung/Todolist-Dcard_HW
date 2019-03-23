import React from 'react';
import Navigation from 'components/molecules/Navigation/component';
import styles from './index.css';

const Header = ({ children }) => (
	<header className={styles.header}>
		{children}
	</header>
);

export default Header;
