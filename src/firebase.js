import firebase from 'firebase/app'
import 'firebase/firestore'

// firebase.analytics()
export const db = firebase.initializeApp({ projectId: 'trainingtrackr' }).firestore()
