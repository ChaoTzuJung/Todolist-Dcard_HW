import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import styles from './index.css';

const Input = ({
	placeholder = '請輸入關鍵字',
	value,
	submit,
	handleChange,
	getInputElement
}) => (
	<form
		className={styles.input}
		action=""
		onSubmit={submit}
	>
		<div className={styles.icon}>
			<FontAwesomeIcon icon={faPlus} color="#CBCBCB" size="1x" />
		</div>
		<input
			type="text"
			role="searchbox"
			tabIndex="0"
			ref={node => {
				if (node) {
					getInputElement(node);
				}
			}}
			placeholder={placeholder}
			value={value}
			onChange={handleChange}
		/>
	</form>
);

export default Input;
