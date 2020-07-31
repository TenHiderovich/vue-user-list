export default {
  fetchUsers() {
    return fetch('https://reqres.in/api/users')
      .then(status)
      .then(response => response.json())
  },
  addUser(data) {
    return fetch('https://reqres.in/api/users', { method: 'POST', data: data })
      .then(status)
      .then(response => response.json());
  },
  editUser(data) {
    return fetch('https://reqres.in/api/users' + data.id, { method: 'PUT', data: data })
      .then(status)
      .then(response => response.json());
  }
}

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}
