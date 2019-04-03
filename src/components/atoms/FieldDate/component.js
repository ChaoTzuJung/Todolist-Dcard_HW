import React, { Fragment, Component } from 'react';
import DatePicker from 'react-datepicker';

import styles from './index.css';
// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker.css';

export class InputComponent extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(evt) {
		const { onChange = () => {} } = this.props;

		onChange(evt.target.value, evt.target.checked);
	}

	render() {
		const { name, value, content, className, small, onChange: _, ...other } = this.props;
		return (
			<label htmlFor={name} className={styles.label}>
				<input
					className={styles.input}
					type="text"
					id={name}
					name={name}
					value={value}
					onChange={this.handleChange}
					{...other}
				/>
			</label>
		);
	}
}

const FieldDate = ({ startTime, handleDateChange, dateOnly, timeOnly }) => (
	<Fragment>
		{!dateOnly && !timeOnly && (
			<DatePicker
				placeholderText="MMMM d, yyyy h:mm aa"
				selected={startTime}
				onChange={handleDateChange}
				minDate={new Date()}
				showTimeSelect
				timeFormat="HH:mm"
				timeIntervals={15}
				dateFormat="MMMM d, yyyy h:mm aa"
				timeCaption="time"
				customInput={<InputComponent />}
			/>
		)}
		{dateOnly && (
			<DatePicker
				placeholderText="yyyy/mm/dd"
				selected={startTime}
				onChange={handleDateChange}
				minDate={new Date()}
				dateFormat="yyyy/MM/dd"
				customInput={<InputComponent />}
			/>
		)}
		{timeOnly && (
			<DatePicker
				placeholderText="HH:mm"
				selected={startTime}
				onChange={handleDateChange}
				minDate={new Date()}
				showTimeSelect
				showTimeSelectOnly
				timeIntervals={60}
				dateFormat="HH:mm"
				timeFormat="HH:mm"
				timeCaption="Time"
				customInput={<InputComponent />}
			/>
		)}
	</Fragment>
);

export default FieldDate;
