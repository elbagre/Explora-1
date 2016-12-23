import { connect } from 'react-redux';
import { createAnswer } from '../../actions/answer_actions.js';
import { requestSingleUser, receiveSingleUser } from '../../actions/user_actions.js';
import { requestAllComments } from '../../actions/comment_actions.js';
import * as Actionable from '../../actions/actionable_actions.js';
import UserHome from './user_home.jsx';

const mapStateToProps = (state, ownProps) => ({
  id: parseInt(ownProps.params.id),
  user: state.users.detail,
  currentUser: state.session.currentUser,
  follows: state.actionables.followedTopics,
  upvotedAnswers: state.actionables.upvotedAnswers,
  downvotedAnswers: state.actionables.downvotedAnswers,
  downvotedQuestions: state.actionables.downvotedQuestions,
  passedQuestions: state.actionables.passedQuestions
});

const mapDispatchToProps = (dispatch) => ({
  requestSingleUser: (id) => dispatch(requestSingleUser(id)),
  receiveSingleUser: (user) => dispatch(receiveSingleUser(user)),
  requestAllComments: (id) => dispatch(requestAllComments(id)),
  createAnswer: (answer) => dispatch(createAnswer(answer)),
  requestUserActions: () => dispatch(Actionable.requestUserActions()),
  createUserAction: (userAction) => dispatch(Actionable.createUserAction(userAction)),
  destroyUserAction: (id) => dispatch(Actionable.destroyUserAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
