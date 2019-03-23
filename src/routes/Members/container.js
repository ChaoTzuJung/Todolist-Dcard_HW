import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';

import { getMembers, cleanMembers } from 'actions/member';
import Members from './component';

const mapStateToProps = state => ({
	members: state.members.staffs,
});

const mapDispatchToProps = dispatch => ({
	getMembers: () => dispatch(getMembers()),
	cleanMembers: () => dispatch(cleanMembers()),
});

export default hot(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(Members),
);
