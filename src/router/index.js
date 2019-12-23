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
      name: 'User',
      component: User
    },
    {
      path: '/nmt',
      name: 'User',
      component: User
    },
    {
      path: '/not',
      name: 'User',
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
