import Vue from 'vue'
import Router from 'vue-router'

// Page content
import Home from '@/components/Home'
import User from '@/components/User'
import Dailies from '@/components/Dailies'
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
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/dailies',
      name: 'Dailies',
      component: Dailies
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
