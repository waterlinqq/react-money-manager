import * as firebase from 'firebase/app'
import 'firebase/auth'
import store from 'store'

import { SetUser } from 'store/user/actions'

export const logout = () => {
  firebase.auth().signOut()
}

export const login = async () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithRedirect(provider)
}

export const listenAuth = () => {
  firebase.auth().onAuthStateChanged((user) => {
    let action
    if (user) {
      const { email, uid, photoURL, displayName } = firebase.auth().currentUser!
      action = SetUser({ email, uid, photoURL, displayName })
    } else {
      action = SetUser(null)
    }
    store.dispatch(action as any)
  })
}
