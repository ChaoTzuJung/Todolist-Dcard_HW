import React from 'react';

import style from './index.css';

const ToggleButton = ({ toggle, handleClick, closeTitle = 'Close', openTitle = 'Open' }) => (
	<button
		type="button"
		className={toggle ? style.button : style.buttonReverse}
		onClick={handleClick}
	>
		{toggle ? closeTitle : openTitle}
	</button>
);

export default ToggleButton;
