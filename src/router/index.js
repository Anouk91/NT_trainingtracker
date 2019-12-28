import Vue from 'vue'
import Router from 'vue-router'

// Page content
import Home from '@/components/Home'
import User from '@/components/User'
import Exercises from '@/components/Exercises'
import Admin from '@/components/Admin'

// Fallback page
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/ndt',
      name: 'NDT',
      component: User
    },
    {
      path: '/nmt',
      name: 'NMT',
      component: User
    },
    {
      path: '/not',
      name: 'NOT',
      component: User
    },
    {
      path: '/exercises',
      name: 'Exercises',
      component: Exercises
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '**',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})
