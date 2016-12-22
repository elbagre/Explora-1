import * as Questions from '../actions/question_actions.js';
import * as API from '../util/question_api_util.js';
import { receiveErrors, clearErrors } from '../actions/session_actions.js'
import { hashHistory } from 'react-router';

const QuestionMiddleware = ({getState, dispatch}) => (next) => (action) => {
  const questionsSuccess = (questions) => {
    dispatch(Questions.receiveAllQuestions(questions));
  }
  const questionSuccess = (question) => {
    dispatch(Questions.receiveSingleQuestion(question));
    hashHistory.push(`/question/${question.id}`)
  }

  const failure = errors => dispatch(receiveErrors(errors));

  switch(action.type) {
    case Questions.REQUEST_ALL_QUESTIONS:
      API.fetchAllQuestions(questionsSuccess);
      return next(action);
    case Questions.REQUEST_SINGLE_QUESTION:
      API.fetchSingleQuestion(action.id, questionSuccess);
      return next(action);
    case Questions.CREATE_QUESTION:
      API.postQuestion(action.question, questionSuccess, failure);
      return next(action);
    default:
      return next(action);
  }
};

export default QuestionMiddleware;
