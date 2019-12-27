import Vue from 'vue'
import App from './App'
import router from './router'
import { firestorePlugin } from 'vuefire' // https://vuefire.vuejs.org/vuefire/querying.html
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueRouter from 'vue-router'
import firebase from 'firebase'
// import firebaseui from 'firebaseui';
import { config } from './helpers/firebaseConfig.js'
Vue.use(VueRouter)

Vue.use(BootstrapVue)
Vue.use(firestorePlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  created () {
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$router.push('/success')
      } else {
        this.$router.push('/auth')
      }
    })
  },
  render: h => h(App)
})
