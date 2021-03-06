import { combineReducers } from 'redux';
import SessionReducer from './session_reducer.js';
import QuestionReducer from './question_reducer.js';
import QuestionDetailReducer from './question_detail_reducer.js';
import CommentReducer from './comment_reducer.js';
import TopicReducer from './topic_reducer.js';
import SearchReducer from './search_reducer.js';
import UserReducer from './user_reducer.js';
import ActionableReducer from './actionable_reducer.js';
import ErrorReducer from './error_reducer.js';

const RootReducer = combineReducers({
  session: SessionReducer,
  errors: ErrorReducer,
  questions: QuestionReducer,
  question_detail: QuestionDetailReducer,
  comments: CommentReducer,
  topics: TopicReducer,
  query: SearchReducer,
  users: UserReducer,
  actionables: ActionableReducer
});

export default RootReducer;
