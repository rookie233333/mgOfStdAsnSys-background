import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login/login.vue'
import index from '../pages/index/index.vue'
import home from '../pages/home/home.vue'

/** 组件 */
import news from '../components/activity'// 新闻中心
import office from '../components/office'
import mark from '../components/mark'
import manage from '../components/management'
import personal from '../components/personal'
import message from '../components/message'
import notic from '../components/notic'
import docPage from '../pages/doc/doc.vue'

import homeIndex from '../components/homeIndex'
import homeDynamic from '../components/homeDynamic'
import homeWork from '../components/homeWork'
import homeMessage from '../components/homeMessage'
import homeMark from '../components/homeMark'
// import ct from '../components/ct'
// import mg from '../components/mg'

import evApp from '../components/eventApproval'// 活动审批
import evDec from '../components/eventDeclaration'// 活动申办

import mgApp from '../components/manageOfApplication'// 社团联管理员管理
import mgMem from '../components/manageOfMember'// 会员管理
import mgSoc from '../components/manageOfSociety'// 社团管理
import mgSocF from '../components/manageOfSocietyF'// 财务管理
import mgSocU from '../components/manageOfSocietyU'// 社团管理员管理
import myMore from '../components/more'// 更多

import mgass from '../components/manageOfass'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/index',
    component: index,
    children: [
      {
        path: '/news',
        component: news
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
      },
      {
        path: '/message',
        component: message
      },
      {
        path: '/notic',
        component: notic
      },
      {
        path: '/evapp',
        component: evApp
      },
      {
        path: '/evdec',
        component: evDec
      },
      {
        path: '/mgapp',
        component: mgApp
      },
      {
        path: '/mgmem',
        component: mgMem
      },
      {
        path: '/mgsoc',
        component: mgSoc
      },
      {
        path: '/mgsocf',
        component: mgSocF
      },
      {
        path: '/mgsocu',
        component: mgSocU
      },
      {
        path: '/more',
        component: myMore
      },
      {
        path: '/mgass',
        component: mgass
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
        path: '/home/mark',
        component: homeMark
      },
      {
        path: '/home/message',
        componnent: homeMessage
      }
    ]
  },
  {
    path: '/docpage',
    component: docPage
  }
  ]
})
