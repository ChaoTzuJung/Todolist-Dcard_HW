import React, { Component } from 'react';
import TodoList from 'components/organisms/TodoList';

import styles from './index.css';

// eslint-disable-next-line react/prefer-stateless-function
class HomeLayout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tab: 'myTasks',
		};

		this.handleTabChange = this.handleTabChange.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		const { tab } = this.state;
		// condition
		if (prevState.tab !== tab) {
			this.handleTabChange(tab);
		}
	}

	handleTabChange(step) {
		this.setState({
			tab: step,
		});
	}

	render() {
		const { tab } = this.state;
		return (
			<div className={styles.homeLayout}>
				<TodoList tab={tab} />
			</div>
		);
	}
}

export default HomeLayout;
