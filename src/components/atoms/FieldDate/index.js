import { contain } from 'react-container-helper';

import FieldDate from './component';

const initState = () => ({
	startDate: null,
});

const mapSetStateToProps = ({ startDate }, { className, ...other }, setState) => ({
	// state
	startDate,

	// props
	className,
	...other,

	// actions
	handleChange(date) {
		setState({ startDate: date });
	},
});

export default contain(initState, mapSetStateToProps)(FieldDate);
