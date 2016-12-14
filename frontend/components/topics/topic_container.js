import { connect } from 'react-redux';
import { requestSingleQuestion } from '../../actions/question_actions.js';
import { requestSingleTopic } from '../../actions/topic_actions.js';
import TopicHome from './topic_home.jsx';
import * as Actionable from '../../actions/actionable_actions.js';

const mapStateToProps = (state, ownProps) => ({
  id: parseInt(ownProps.params.id),
  topic: state.topics.detail,
  follows: state.actionables.followedTopics,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  requestSingleQuestion: (id) => dispatch(requestSingleQuestion(id)),
  requestSingleTopic: (id) => dispatch(requestSingleTopic(id)),
  requestUserActions: () => dispatch(Actionable.requestUserActions()),
  createUserAction: (userAction) => dispatch(Actionable.createUserAction(userAction)),
  destroyUserAction: (id) => dispatch(Actionable.destroyUserAction(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicHome);
