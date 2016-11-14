import SessionMiddleware from './session_middleware.js';
import { applyMiddleware } from 'redux';
import QuestionMiddleware from './question_middleware.js';
import AnswerMiddleware from './answer_middleware.js';
import CommentMiddleware from './comment_middleware.js';
import TopicMiddleware from './topic_middleware.js';
import SearchMiddleware from './search_middleware.js';
import UserMiddleware from './user_middleware.js';

const RootMiddleware = applyMiddleware(
  SessionMiddleware, QuestionMiddleware, AnswerMiddleware, CommentMiddleware,
  TopicMiddleware, SearchMiddleware, UserMiddleware
);

export default RootMiddleware;
