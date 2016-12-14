import { connect } from 'react-redux';
import QuestionDetail from './question_detail.jsx';
import * as Comment from '../../actions/comment_actions.js';
import * as Answer from '../../actions/answer_actions.js';
import * as Question from '../../actions/question_actions.js';
import * as Actionable from '../../actions/actionable_actions.js';

const mapStateToProps = (state, ownProps) => ({
  id: parseInt(ownProps.params.id),
  question: state.question_detail,
  currentUser: state.session.currentUser,
  follows: state.actionables.followedQuestions,
  downvotedQuestions: state.actionables.downvotedQuestions,
  upvotedAnswers: state.actionables.upvotedAnswers,
  downvotedAnswers: state.actionables.downvotedAnswers
});

const mapDispatchToProps = (dispatch) => ({
  fetchSingleQuestion: id => dispatch(Question.requestSingleQuestion(id)),
  requestAllComments: id => dispatch(Comment.requestAllComments(id)),
  createAnswer: (answer) => dispatch(Answer.createAnswer(answer)),
  createComment: (comment) => dispatch(Comment.createComment(comment)),
  requestUserActions: () => dispatch(Actionable.requestUserActions()),
  createUserAction: (userAction) => dispatch(Actionable.createUserAction(userAction)),
  destroyUserAction: (id) => dispatch(Actionable.destroyUserAction(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);
