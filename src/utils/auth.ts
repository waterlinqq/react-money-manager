import * as firebase from 'firebase/app'
import 'firebase/auth'
import store from 'store'

import { userSet } from 'store/user/actions'

export const logout = () => {
  firebase.auth().signOut()
}

export const login = async () => {
  alert('')
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithRedirect(provider)
}

export const listenAuth = () => {
  firebase.auth().onAuthStateChanged((user) => {
    let action
    if (user) {
      const { email, uid, photoURL, displayName } = firebase.auth().currentUser!
      action = userSet({ email, uid, photoURL, displayName })
    } else {
      action = userSet(null)
    }
    store.dispatch(action)
  })
}
