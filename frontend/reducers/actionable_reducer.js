import * as Action from '../actions/actionable_actions.js';

const defaultState = {
  followedTopics: [],
  followedUsers: [],
  followedQuestions: [],
  downvotedQuestions: [],
  passedQuestions: [],
  upvotedAnswers: [],
  downvotedAnswers: []
};

const ActionableReducer = (initialState = defaultState, action) => {
  switch(action.type) {
    case Action.RECEIVE_USER_ACTIONS:
      return action.userActions;
    default:
      return initialState;
  }
};

export default ActionableReducer;
