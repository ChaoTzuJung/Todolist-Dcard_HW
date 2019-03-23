import React from 'react';
import { mount } from 'enzyme';

import ToggleButton from 'components/atoms/ToggleButton';

test('should have default value: Close', () => {
	const component = mount(<ToggleButton onOpen={() => {}} onClose={() => {}} />);
	expect(component.text()).toContain('Close');
});

// Create custom snapshot testing
test('should become Open after click', () => {
	const component = mount(<ToggleButton onOpen={() => {}} onClose={() => {}} />);

	expect(component).toMatchSnapshot();

	// manually trigger the callback
	component.find('button').simulate('click');

	expect(component.text()).toContain('Open');
	// re-rendering would become Open
	expect(component).toMatchSnapshot();

	// manually trigger the callback
	component.find('button').simulate('click');

	expect(component.text()).toContain('Close');
	// re-rendering would become Close
	expect(component).toMatchSnapshot();
});
