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
// import ct from '../components/ct'
// import mg from '../components/mg'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: index,
    children: [
      {
        path: '/activity',
        component: activity
      },
      {
        path: '/office',
        component: office,
        children: [
          {
            path: '/ct',
            component: office
          },
          {
            path: '/mg',
            component: office
          }
        ]
      },
      {
        path: '/mark',
        component: mark,
        children: [
          {
            path: '/ct',
            component: mark
          },
          {
            path: '/mg',
            component: mark
          }
        ]
      },
      {
        path: '/manage',
        component: manage,
        children: [
          {
            path: '/ct',
            component: manage
          },
          {
            path: '/mg',
            component: manage
          }
        ]
      },
      {
        path: '/personal',
        component: personal
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
  ]
})
