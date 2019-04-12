import React, { Component } from 'react';

import Header from 'components/organisms/Header';
import Navigation from 'components/molecules/Navigation';

class App extends Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
	}

	todoCategorys = [
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

	onClickTab = step => {
		this.ref.current.handleTabChange(step);
	};

	render() {
		const { children } = this.props;
		// React.cloneElement() requires a single child
		const childElement = React.Children.only(children);

		// pass props to {this.props.children}
		const childComponent = React.cloneElement(childElement, { ref: this.ref });
		return (
			<div style={{ height: '100%', paddingBottom: '48px' }}>
				<Header>
					<Navigation
						className=""
						activeCategory="myTasks"
						onClickTab={this.onClickTab}
						todoCategorys={this.todoCategorys}
					/>
				</Header>
				{childComponent}
			</div>
		);
	}
}

export default App;
