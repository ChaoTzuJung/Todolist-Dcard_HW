import React from 'react';
import { mount } from 'enzyme';

import List from 'components/atoms/List';

const items = [
	{
		key: 1,
		value: 'Lee',
	},
	{
		key: 2,
		value: 'Mike',
	},
];

test('should have items property', () => {
	const component = mount(<List items={items} />);

	expect(component.props().items).toEqual(items);
});
