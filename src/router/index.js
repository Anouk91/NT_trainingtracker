import Router from 'vue-router'
// import firebase from 'firebase'

// Page content
import Home from '@/components/Home'
import User from '@/components/User'
import Team from '@/components/Team'
import Exercises from '@/components/Exercises'
import Admin from '@/components/Admin'
// Fallback page
import PageNotFound from '@/components/PageNotFound'

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: true
    },
    {
      path: '/ndt',
      name: 'NDT',
      component: User,
      props: true,
      children: [
        {
          path: 'team-page',
          component: Team
        }
      ]
    },
    {
      path: '/nmt',
      name: 'NMT',
      component: User,
      props: true
    },
    {
      path: '/not',
      name: 'NOT',
      component: User,
      props: true
    },
    {
      path: '/exercises',
      name: 'Exercises',
      component: Exercises
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      props: true
    },
    {
      path: '**',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})

export default router
