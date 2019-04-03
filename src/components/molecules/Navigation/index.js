import { contain } from 'react-container-helper';

import Navigation from './component';

const initState = ({ activeCategory }) => ({
	activeCategory,
});

const mapSetStateToProps = (
	{ activeCategory },
	{ className, todoCategorys, onClickTab },
	setState,
) => ({
	// state
	activeCategory,

	// props
	className,
	todoCategorys,

	onClickTab(key) {
		setState({ activeCategory: key });
		onClickTab(key);
	},
});

export default contain(initState, mapSetStateToProps)(Navigation);
