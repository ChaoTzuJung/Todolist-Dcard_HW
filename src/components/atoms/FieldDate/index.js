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
	handleChange(e) {
		setState({ startDate: e });
		onChange(e);
	},

	// NOTE: child's method (FieldDate) can't be call by parent (TodoPanel)
	clearDateInput() {
		setState({ startDate: null });
	},
});

export default contain(initState, mapSetStateToProps)(FieldDate);
