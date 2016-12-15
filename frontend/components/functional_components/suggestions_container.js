import Suggestions from './suggestions.jsx';
import { connect } from 'react-redux';
import * as User from '../../actions/user_actions.js';

const mapStateToProps = (state, ownProps) => ({
  users: state.users.items,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  requestAllUsers: () => dispatch(User.requestAllUsers()),
  requestSingleUser: (id) => dispatch(User.requestSingleUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);
