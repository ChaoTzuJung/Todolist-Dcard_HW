import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

import styles from './index.css';

const Button = ({
	children,
	className,
	color,
	link,
	type = 'internal',
	disabled = false,
	onClick = () => {},
	...other
}) => {
	if (link) {
		if (type === 'external') {
			return (
				<a
					className={classnames(styles.button, className, {
						[styles.normal]: color === 'normal',
						[styles.save]: color === 'save',
						[styles.cancel]: color === 'cancel',
						[styles.upload]: color === 'upload',
						[styles.disabled]: disabled,
					})}
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					onClick={e => {
						if (!disabled) {
							onClick(e);
						}
					}}
					{...other}
				>
					<div>{children}</div>
				</a>
			);
		}

		return (
			<Link
				className={classnames(styles.button, className, {
					[styles.normal]: color === 'normal',
					[styles.save]: color === 'save',
					[styles.cancel]: color === 'cancel',
					[styles.upload]: color === 'upload',
					[styles.disabled]: disabled,
				})}
				to={link}
				onClick={e => {
					if (!disabled) {
						onClick(e);
					}
				}}
				{...other}
			>
				<div>{children}</div>
			</Link>
		);
	}

	return (
		/* eslint-disable react/button-has-type */
		<button
			className={classnames(styles.button, className, {
				[styles.normal]: color === 'normal',
				[styles.save]: color === 'save',
				[styles.cancel]: color === 'cancel',
				[styles.upload]: color === 'upload',
				[styles.disabled]: disabled,
			})}
			onClick={e => {
				if (!disabled) {
					onClick(e);
				}
			}}
			{...other}
		>
			<div>{children}</div>
		</button>
	);
};

export default Button;
