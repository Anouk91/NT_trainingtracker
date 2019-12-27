import { firebase } from '@firebase/app'
import '@firebase/firestore'

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
const firebaseProductionApp = firebase.initializeApp({
  apiKey: 'AIzaSyA4pesZDgREDjWVUpVz_jPcBZ65hcxkh8E',
  authDomain: 'trainingtrackr-productie.firebaseapp.com',
  databaseURL: 'https://trainingtrackr-productie.firebaseio.com',
  projectId: 'trainingtrackr-productie',
  storageBucket: 'trainingtrackr-productie.appspot.com',
  messagingSenderId: '798479808372',
  appId: '1:798479808372:web:d3aeb7d3833f70ff981e21',
  measurementId: 'G-V7C0D5BL3S'
})

export const db = firebaseProductionApp.firestore()
