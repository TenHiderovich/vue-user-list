export default {
  token: state => state.token,
  allUsers: state => state.users,
  allUsersWithoutHide: state => state.users.filter(user => !user.is_hide),
  usersCount: state => state.users.length,
  usersIdCount(state) {
    return state.users.reduce((acc, user) => {
      return !user.is_hide ? acc += user.id : acc;
    }, 0);
  },
  getUserById: state => id => state.users.find(user => user.id === id),
}
