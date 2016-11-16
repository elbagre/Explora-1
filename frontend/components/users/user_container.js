import { connect } from 'react-redux';
import { requestSingleUser } from '../../actions/user_actions.js';
import { requestAllComments } from '../../actions/comment_actions.js';
import UserHome from './user_home.jsx';

const mapStateToProps = (state, ownProps) => ({
  id: parseInt(ownProps.params.id),
  user: state.users.detail,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  requestSingleUser: (id) => dispatch(requestSingleUser(id)),
  requestAllComments: (id) => dispatch(requestAllComments(id)),
  createAnswer: (answer) => dispatch(createAnswer(answer))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
