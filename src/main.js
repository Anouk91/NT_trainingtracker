import Vue from 'vue'
import App from './App'
import router from './router'
import VueFirestore from 'vue-firestore'
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(VueFirestore, BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
