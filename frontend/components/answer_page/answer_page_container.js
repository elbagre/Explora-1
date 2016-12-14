import { connect } from 'react-redux';
import { requestAllQuestions } from '../../actions/question_actions.js';
import AnswerPage from './answer_page.jsx';
import { createAnswer} from '../../actions/answer_actions.js';
import * as Actionable from '../../actions/actionable_actions.js';

const mapStateToProps = (state) => ({
  questions: state.questions,
  currentUser: state.session.currentUser,
  downvotedQuestions: state.actionables.downvotedQuestions,
  passedQuestions: state.actionables.passedQuestions
});

const mapDispatchToProps = (dispatch) => ({
  requestAllQuestions: () => dispatch(requestAllQuestions()),
  createAnswer: (answer) => dispatch(createAnswer(answer)),
  requestUserActions: () => dispatch(Actionable.requestUserActions()),
  createUserAction: (userAction) => dispatch(Actionable.createUserAction(userAction)),
  destroyUserAction: (id) => dispatch(Actionable.destroyUserAction(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerPage);
