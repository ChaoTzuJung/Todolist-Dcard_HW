import React from 'react';

const defaultLifecycle = {
	componentDidMount: () => {},
	shouldComponentUpdate: () => true,
	componentDidUpdate: () => {},
	componentWillUnmount: () => {},
	getDerivedStateFromProps: () => null,
	getSnapshotBeforeUpdate: () => null,
};

export const contain = (
	initState = () => ({}),
	mapSetStateToProps = () => ({}),
	setLifecycle = () => defaultLifecycle,
) => Component => {
	const displayName = Component.displayName || Component.name || 'Component';
	const newLifecycle = setLifecycle();
	const componentLifecycle = Object.assign({}, defaultLifecycle, newLifecycle);

	class ContainerComponent extends React.Component {
		static getDerivedStateFromProps(nextProps, prevState) {
			return componentLifecycle.getDerivedStateFromProps(nextProps, prevState);
		}

		constructor(props) {
			super(props);
			this.state = initState(props);

			this.setState = this.setState.bind(this);
			this.getState = this.getState.bind(this);
			this.getProps = this.getProps.bind(this);
		}

		componentDidMount() {
			componentLifecycle.componentDidMount({
				setState: this.setState,
				getState: this.getState,
				getProps: this.getProps,
			});
		}

		shouldComponentUpdate(nextProps, nextState) {
			return componentLifecycle.shouldComponentUpdate(nextProps, nextState, {
				getState: this.getState,
				getProps: this.getProps,
			});
		}

		getSnapshotBeforeUpdate(prevProps, prevState) {
			return componentLifecycle.getSnapshotBeforeUpdate(prevProps, prevState);
		}

		componentDidUpdate(prevProps, prevState, snap) {
			componentLifecycle.componentDidUpdate(prevProps, prevState, snap, {
				setState: this.setState,
				getState: this.getState,
				getProps: this.getProps,
			});
		}

		componentWillUnmount() {
			componentLifecycle.componentWillUnmount({
				getState: this.getState,
				getProps: this.getProps,
			});
		}

		getState() {
			return this.state;
		}

		getProps() {
			return this.props;
		}

		render() {
			const setStateProps = mapSetStateToProps(this.state, this.props, this.setState);

			return <Component {...setStateProps} />;
		}
	}

	ContainerComponent.displayName = `Contain(${displayName})`;

	return ContainerComponent;
};
