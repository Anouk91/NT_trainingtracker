import Vue from 'vue'
import firebase from 'firebase'
import App from './App'
import router from './router'

Vue.config.productionTip = false

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDuN2TJ8SoMX8lKqdtIYYFHjtI7kV8Fu6c",
    authDomain: "trainingtrackr.firebaseapp.com",
    databaseURL: "https://trainingtrackr.firebaseio.com",
    projectId: "trainingtrackr",
    storageBucket: "trainingtrackr.appspot.com",
    messagingSenderId: "200244850367",
    appId: "1:200244850367:web:7d3d507d5892b962a6200a",
    measurementId: "G-6FRCXMS0QY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  firebase.analytics()


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
