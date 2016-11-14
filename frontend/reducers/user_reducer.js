import * as User from '../actions/user_actions.js';
import { merge } from 'lodash';

const defaultState = {
  items: [],
  detail: {}
};

const UserReducer = (inititalState = defaultState, action) => {
  switch (action.type) {
    case User.RECEIVE_ALL_USERS:
      return merge({}, inititalState, { items: action.users });
    case User.RECEIVE_SINGLE_USER:
      return Object.assign({}, inititalState, { detail: action.user });
    default:
      return inititalState;
  }
};

export default UserReducer;
