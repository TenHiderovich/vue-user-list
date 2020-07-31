export default {
  get() {
    return localStorage.token;
  },
  set(token) {
    localStorage.token = token;
  }
}