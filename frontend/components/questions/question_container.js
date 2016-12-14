import { connect } from 'react-redux';
import QuestionIndex from './question_index.jsx';
import { requestAllQuestions } from '../../actions/question_actions.js';
import { requestAllComments } from '../../actions/comment_actions.js';
import { withRouter, hashHistory } from 'react-router';
import * as Actionable from '../../actions/actionable_actions.js';

const mapStatetoProps = (state) => ({
  questions: state.questions,
  upvotedAnswers: state.actionables.upvotedAnswers,
  downvotedAnswers: state.actionables.downvotedAnswers,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  requestAllQuestions: () => dispatch(requestAllQuestions()),
  requestAllComments: (id) => dispatch(requestAllComments(id)),
  requestUserActions: () => dispatch(Actionable.requestUserActions()),
  createUserAction: (userAction) => dispatch(Actionable.createUserAction(userAction)),
  destroyUserAction: (id) => dispatch(Actionable.destroyUserAction(id))
});

export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(QuestionIndex));
