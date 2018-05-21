import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login/login.vue'
import index from '../pages/index/index.vue'
import home from '../pages/home/home.vue'

/** 组件 */
import activity from '../components/activity'
import office from '../components/office'
import mark from '../components/mark'
import manage from '../components/management'
import personal from '../components/personal'
import docPage from '../pages/doc/doc.vue'

import homeIndex from '../components/homeIndex'
import homeDynamic from '../components/homeDynamic'
import homeWork from '../components/homeWork'
import homePerson from '../components/homePerson'
// import ct from '../components/ct'
// import mg from '../components/mg'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/index',
    component: index,
    children: [
      {
        path: '/activity',
        component: activity
      },
      {
        path: '/office',
        component: office
      },
      {
        path: '/mark',
        component: mark
      },
      {
        path: '/manage',
        component: manage
      },
      {
        path: '/personal',
        component: personal
      }
    ]
  },
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    component: home,
    children: [
      {
        path: '/home/index',
        component: homeIndex
      },
      {
        path: '/home/dynamic',
        component: homeDynamic
      },
      {
        path: '/home/work',
        component: homeWork
      },
      {
        path: '/home/person',
        component: homePerson
      }
    ]
  },
  {
    path: '/docpage',
    component: docPage
  }
  ]
})
