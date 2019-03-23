import { contain } from 'util/container';

import ToggleButton from './component';

const initState = () => ({
	toggle: true,
});

const mapSetStateToProps = ({ toggle }, { onOpen, onClose, openTitle, closeTitle }, setState) => ({
	toggle,
	handleClick() {
		if (toggle) {
			onClose();
		} else {
			onOpen();
		}
		setState({ toggle: !toggle });
	},
	openTitle,
	closeTitle,
});

export default contain(initState, mapSetStateToProps)(ToggleButton);
