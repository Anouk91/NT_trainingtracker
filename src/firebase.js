import { firebase } from '@firebase/app'
import 'firebase/firestore'

// // Testing
// const firebaseApp = firebase.initializeApp({
//   apiKey: 'AIzaSyDuN2TJ8SoMX8lKqdtIYYFHjtI7kV8Fu6c',
//   authDomain: 'trainingtrackr.firebaseapp.com',
//   databaseURL: 'https://trainingtrackr.firebaseio.com',
//   projectId: 'trainingtrackr',
//   storageBucket: 'trainingtrackr.appspot.com',
//   messagingSenderId: '200244850367',
//   appId: '1:200244850367:web:7d3d507d5892b962a6200a',
//   measurementId: 'G-6FRCXMS0QY'
// })

// Productie
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyA4pesZDgREDjWVUpVz_jPcBZ65hcxkh8E',
  authDomain: 'trainingtrackr-productie.firebaseapp.com',
  databaseURL: 'https://trainingtrackr-productie.firebaseio.com',
  projectId: 'trainingtrackr-productie',
  storageBucket: 'trainingtrackr-productie.appspot.com',
  messagingSenderId: '798479808372',
  appId: '1:798479808372:web:d3aeb7d3833f70ff981e21',
  measurementId: 'G-V7C0D5BL3S'
})

firebase.firestore().enablePersistence().catch(function (err) {
  if (err.code === 'failed-precondition') {
    console.log('err', err)
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code === 'unimplemented') {
    console.log('err', err)
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
})
export const db = firebaseApp.firestore()
