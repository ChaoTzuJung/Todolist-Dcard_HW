import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './index.css';

const Input = ({
	className,
	placeholder = '請輸入關鍵字',
	value,
	submit,
	handleChange,
	getInputElement,
	onFocus,
}) => (
	<form
		className={classnames(styles.input, className)}
		autoComplete="off"
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
			autoComplete="off"
			ref={node => {
				if (node) {
					getInputElement(node);
				}
			}}
			placeholder={placeholder}
			value={value}
			onChange={handleChange}
			onFocus={onFocus}
		/>
	</form>
);

export default Input;
