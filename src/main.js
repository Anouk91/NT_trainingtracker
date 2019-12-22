import Vue from 'vue'
import App from './App'
import router from './router'
import { firestorePlugin } from 'vuefire' // https://vuefire.vuejs.org/vuefire/querying.html
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(firestorePlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
