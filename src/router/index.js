import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login/login.vue'
import index from '../pages/index/index.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
  ]
})
