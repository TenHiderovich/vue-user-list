import Vue from 'vue'
import Router from 'vue-router'

import Login from './pages/Login'
import Users from './pages/Users'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        layout: 'Empty'
      },
      beforeEnter(to, from, next) {
        const { token } = localStorage;
        token ? next({ name: 'Users' }) : next();
      }
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      meta: {
        layout: 'Main'
      },
      beforeEnter(to, from, next) {
        const { token } = localStorage;
        token ? next() : next({ name: 'Login' });
      }
    }
  ]
});
