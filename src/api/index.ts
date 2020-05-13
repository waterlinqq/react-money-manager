import * as firebaseApi from './firebase'
import * as storageApi from './storage'
import store from 'store'

const API = new Proxy(
  {},
  {
    get(_, property: keyof typeof firebaseApi) {
      const storage = store.getState().user ? firebaseApi : storageApi
      return storage[property]
    },
  }
) as typeof firebaseApi
export default API
