import Router from 'vue-router'
// import firebase from 'firebase'

// Page content
import Home from '@/components/Home'
import User from '@/components/User'
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
      props: true
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
      component: Admin
    },
    {
      path: '**',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   let currentUser = firebase.auth().currentUser
//   let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

//   if (requiresAuth && !currentUser) next('login')
//   else if (!requiresAuth && currentUser) next('comics')
//   else next()
// })

export default router
