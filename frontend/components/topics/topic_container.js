import { connect } from 'react-redux';
import { requestSingleQuestion } from '../../actions/question_actions.js';
import { requestAllComments } from '../../actions/comment_actions.js';
import { requestSingleTopic, receiveSingleTopic } from '../../actions/topic_actions.js';
import TopicHome from './topic_home.jsx';
import * as Actionable from '../../actions/actionable_actions.js';
import { createAnswer } from '../../actions/answer_actions.js';

const mapStateToProps = (state, ownProps) => ({
  id: parseInt(ownProps.params.id),
  topic: state.topics.detail,
  follows: state.actionables.followedTopics,
  currentUser: state.session.currentUser,
  upvotedAnswers: state.actionables.upvotedAnswers,
  downvotedAnswers: state.actionables.downvotedAnswers,
  passedQuestions: state.actionables.passedQuestions,
  downvotedQuestions: state.actionables.downvotedQuestions
});

const mapDispatchToProps = (dispatch) => ({
  createAnswer: (answer) => dispatch(createAnswer(answer)),
  requestSingleQuestion: (id) => dispatch(requestSingleQuestion(id)),
  receiveSingleTopic: (topic) => dispatch(receiveSingleTopic(topic)),
  requestSingleTopic: (id) => dispatch(requestSingleTopic(id)),
  requestUserActions: () => dispatch(Actionable.requestUserActions()),
  createUserAction: (userAction) => dispatch(Actionable.createUserAction(userAction)),
  destroyUserAction: (id) => dispatch(Actionable.destroyUserAction(id)),
  requestAllComments: (id) => dispatch(requestAllComments(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicHome);
