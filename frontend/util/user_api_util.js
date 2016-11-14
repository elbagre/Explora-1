export const fetchAllUsers = (success, query) => {
  $.ajax({
    method: 'GET',
    url: '/api/users',
    data: { query },
    success,
    error: () => console.log("Fetch users error")
  });
};

export const fetchSingleUser = (id, success) => {
  $.ajax({
    method: 'GET',
    url: `api/users/${id}`,
    success,
    error: () => console.log("Fetch user error")
  });
};
