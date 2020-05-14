import * as firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDmDtZQueyX0QHZjFBCFwSNdorl2H8HAIw',
  authDomain: 'money-manager-a21b9.firebaseapp.com',
  databaseURL: 'https://money-manager-a21b9.firebaseio.com',
  projectId: 'money-manager-a21b9',
  storageBucket: 'money-manager-a21b9.appspot.com',
  // messagingSenderId: "sender-id",
  // appId: "app-id",
  // measurementId: "G-measurement-id",
}

firebase.initializeApp(firebaseConfig)
