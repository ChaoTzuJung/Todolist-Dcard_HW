import { contain } from 'react-container-helper';

import FieldDate from './component';

const initState = () => ({
	startDate: null,
});

const mapSetStateToProps = ({ startDate }, { className, onChange, ...other }, setState) => ({
	// state
	startDate,

	// props
	className,
	onChange,
	...other,

	// actions
	handleChange(date) {
		setState({ startDate: date });
		onChange(date);
	},
});

export default contain(initState, mapSetStateToProps)(FieldDate);
