import * as Session from '../actions/session_actions.js';
import * as API from '../util/session_api_util.js';
import { hashHistory } from 'react-router';

const SessionMiddleware = ({getState, dispatch}) => next => action => {
  const success = user => {
    dispatch(Session.requestCurrentUser(user));
    hashHistory.push('/home');
  }
  const failure = errors => dispatch(Session.receiveErrors(errors));

  switch(action.type) {
    case Session.LOGIN:
      API.login(action.user, success, failure);
      break;
    case Session.SIGNUP:
      API.signup(action.user, success, failure);
      break;
    case Session.LOGOUT:
      API.logout(() => {
        next(action);
        hashHistory.push('/entry');
      });
      break;
    default:
      next(action);
  }
};

export default SessionMiddleware;
