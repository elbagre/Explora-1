export const createUserAction = (user_action) => {
  $.ajax({
    method: 'POST',
    data: { user_action },
    url: 'api/user_actions'
  });
};

export const destroyUserAction = (id) => {
  $.ajax({
    method: 'DELETE',
    url: `api/user_actions/${id}`
  });
};

export const fetchUserActions = (success) => {
  $.ajax({
    method: 'GET',
    url: 'api/user_actions',
    success
  });
};
