export default {
  updateUsers(state, users) {
    state.users = users.map((user) => {
      return { ...user, is_hide: false }
    });
  },
  createUser(state, data) {
    state.users.push(data);
  },
  updateUser(state, data) {
    state.users = state.users.map((user) => {
      if (data.id === user.id) {
        return { ...user, ...data }
      } else {
        return user;
      }
    });
  },
}
