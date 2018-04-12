import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login/login.vue'
import index from '../pages/index/index.vue'

/** 组件 */
import activity from '../components/activity'
import office from '../components/office'
import mark from '../components/mark'
import manage from '../components/management'
import personal from '../components/personal'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/swpu',
    component: index,
    children: [
      {
        path: 'activity',
        component: activity
      },
      {
        path: 'office',
        component: office
      },
      {
        path: 'mark',
        component: mark
      },
      {
        path: 'manage',
        component: manage
      },
      {
        path: 'personal',
        component: personal
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    component: index
  }
  ]
})
