export const REQUEST_ALL_USERS = "REQUEST_ALL_USERS";
export const REQUEST_SINGLE_USER = "REQUEST_SINGLE_USER";
export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_SINGLE_USER = "RECEIVE_SINGLE_USER";

export const requestAllUsers = () => ({
  type: REQUEST_ALL_USERS
});

export const receiveAllUsers = (users) => ({
  type: RECEIVE_ALL_USERS,
  users
});

export const requestSingleUser = (id) => ({
  type: REQUEST_SINGLE_USER,
  id
});

export const receiveSingleUser = (user) => ({
  type: RECEIVE_SINGLE_USER,
  user
});
