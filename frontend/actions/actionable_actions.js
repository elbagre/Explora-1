export const REQUEST_USER_ACTIONS = "REQUEST_USER_ACTIONS";
export const RECEIVE_USER_ACTIONS = "RECEIVE_USER_ACTIONS";
export const CREATE_USER_ACTION = "CREATE_USER_ACTION";
export const DESTROY_USER_ACTION = "DESTROY_USER_ACTION";

export const requestUserActions = () => ({
  type: REQUEST_USER_ACTIONS
});

export const receiveUserActions = (userActions) => ({
  type: RECEIVE_USER_ACTIONS,
  user_actions
});

export const createUserAction = (userAction) => ({
  type: CREATE_USER_ACTION,
  user_action
});

export const destroyUserAction = (id) => ({
  type: DESTROY_USER_ACTION,
  id
});
