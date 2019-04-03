import { contain } from 'react-container-helper';

import FieldDate from './component';

const initState = () => ({
	startDate: Date.now(),
});

const mapSetStateToProps = ({ startDate }, { className, startTime, onChange, handleDateChange, ...other }, setState) => ({
	// state
	startDate,

	// props
	className,
	startTime,
	onChange,
	handleDateChange,
	...other,

	// actions
	handleChange(e) {
		setState({ startDate: e });
		onChange(e);
	},
});

export default contain(initState, mapSetStateToProps)(FieldDate);
