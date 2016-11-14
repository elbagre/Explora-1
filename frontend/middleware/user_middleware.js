import * as User from '../actions/user_actions.js';
import * as API from '../util/user_api_util.js';

const UserMiddleware = ({ getState, dispatch }) => (next) => (action) => {
  const usersSuccess = (users) => dispatch(User.receiveAllUsers(users));
  const userSuccess = (user) => dispatch(User.receiveSingleUser(user));
  switch (action.type) {
    case User.REQUEST_ALL_USERS:
      API.fetchAllUsers(usersSuccess);
      break;
    case User.REQUEST_SINGLE_USER:
      API.fetchSingleUser(action.id, userSuccess)
      break;
    default:
      return next(action);
  }
};

export default UserMiddleware;
