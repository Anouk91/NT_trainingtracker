import Vue from 'vue'
import Router from 'vue-router'

// Page content
import NewExercise from '@/components/NewExercise'
import Home from '@/components/Home'
import User from '@/components/User'

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
      path: '/new-exercise',
      name: 'New Exercise',
      component: NewExercise

    },
    {
      path: '**',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})