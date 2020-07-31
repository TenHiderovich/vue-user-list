import Vue from 'vue'
import vuetify from './plugins/vuetify'
import router from './router'

import store from './store/index'
import App from './App'

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');

