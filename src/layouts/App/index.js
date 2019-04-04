import React from 'react';

import Header from 'components/organisms/Header';
import Navigation from 'components/molecules/Navigation';

const App = ({ children }) => {
	const todoCategorys = [
		{
			id: 0,
			key: 'myTasks',
			label: 'My Tasks',
		},
		{
			id: 1,
			key: 'inProgress',
			label: 'In Progress',
		},
		{
			id: 2,
			key: 'completed',
			label: 'Completed',
		},
	];

	return (
		<div style={{ background: '#e1e1e1', height: '100vh' }}>
			<Header>
				<Navigation
					className=""
					activeCategory="myTasks"
					onClickTab={step => console.log(step)}
					todoCategorys={todoCategorys}
				/>
			</Header>
			{children}
		</div>
	);
};

export default App;
