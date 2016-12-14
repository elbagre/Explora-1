import * as Action from '../actions/actionable_actions.js';
import * as API from '../util/actionable_api_util.js';

const ActionableMiddleware = ({ getState, dispatch }) => (next) => (action) => {
  const success = (userActions) => dispatch(Action.receiveUserActions(userActions));
  switch(action.type) {
    case Action.CREATE_USER_ACTION:
      API.createUserAction(action.userAction);
      break;
    case Action.DESTROY_USER_ACTION:
      API.destroyUserAction(action.id);
      break;
    case Action.REQUEST_USER_ACTIONS:
      API.fetchUserActions(success);
      break;
    default:
      next(action);
  }
}

export default ActionableMiddleware;
