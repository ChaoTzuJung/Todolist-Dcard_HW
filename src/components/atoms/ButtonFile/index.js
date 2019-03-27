import React, { Fragment, PureComponent } from 'react';
import classnames from 'classnames';

import styles from './index.css';

class ButtonFile extends PureComponent {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick(e) {
		this.refInput.click();
		const { onClick } = this.props;

		if (typeof onClick !== 'undefined') {
			onClick(e);
		}
	}

	render() {
		const { className, onChange, children, type, lan, ...other } = this.props;

		return (
			<Fragment>
				<button
					className={classnames(styles.buttonFile, className, {
						[styles.buttonStyle]: type === 'button',
					})}
					type="button"
					onClick={this.onClick}
					{...other}
				>
					<div>{children}</div>
				</button>
				<input
					ref={input => {
						this.refInput = input;
					}}
					className={styles.inputFile}
					type="file"
					onChange={onChange}
				/>
			</Fragment>
		);
	}
}

export default ButtonFile;
