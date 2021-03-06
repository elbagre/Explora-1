import { RECEIVE_ERRORS, CLEAR_ERRORS } from '../actions/session_actions.js';
import { SIGN_OUT } from '../actions/session_actions.js';

const ErrorReducer = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_ERRORS: {
      return action.errors.responseJSON;
    }
    case CLEAR_ERRORS: {
      return {};
    }
    case SIGN_OUT: {
      return {};
    }
    default: {
      return state;
    }
  }
};

export default ErrorReducer;
