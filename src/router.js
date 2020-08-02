import Vue from 'vue'
import Router from 'vue-router'

import Login from './pages/Login'
import Users from './pages/Users'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        layout: 'Empty'
      },
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      meta: {
        layout: 'Main',
        auth: true,
      },
    }
  ]
});

router.beforeEach((to, from, next) => {
  const { token } = localStorage;
  const requieAute = to.matched.some(record => record.meta.auth);
  if (requieAute && !token) {
    next({ name: 'Login' });
  } else if(to.name === 'Login' && token) {
    next({ name: 'Users' });
  } else {
    next();
  }
})

export default router;
