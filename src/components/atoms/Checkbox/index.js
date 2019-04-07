import React, { Component } from 'react';
import classnames from 'classnames';

import Icon from 'components/atoms/Icon';

import styles from './index.css';

class Checkbox extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(evt) {
		console.log('CheckBox value 與 checked', evt.target.value, evt.target.checked);
		const { onChange = () => {} } = this.props;

		// 把 checkbox 帶的值 與 開關 true/false 帶入 onChange
		onChange(evt.target.checked);
	}

	render() {
		const { name, value, content, className, small, checked, onChange, _, ...other } = this.props;
		return (
			<label
				htmlFor={name}
				className={classnames(styles.label, className, small ? styles.small : '')}
			>
				{content}
				<input
					type="checkbox"
					id={name}
					name={name}
					value={value}
					checked={checked}
					onChange={this.handleChange}
					{...other}
				/>
				<span className={styles.checkbox}>
					<Icon>check</Icon>
				</span>
			</label>
		);
	}
}

export default Checkbox;
