import { firebase } from '@firebase/app'
import '@firebase/firestore'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDuN2TJ8SoMX8lKqdtIYYFHjtI7kV8Fu6c',
  authDomain: 'trainingtrackr.firebaseapp.com',
  databaseURL: 'https://trainingtrackr.firebaseio.com',
  projectId: 'trainingtrackr',
  storageBucket: 'trainingtrackr.appspot.com',
  messagingSenderId: '200244850367',
  appId: '1:200244850367:web:7d3d507d5892b962a6200a',
  measurementId: 'G-6FRCXMS0QY'
})

export const db = firebaseApp.firestore()
