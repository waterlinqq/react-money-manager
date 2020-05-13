import * as firebaseApi from './firebase'
import * as storageApi from './storage'

const auth = false

// export default auth ? firebaseApi : storageApi
const api = auth ? firebaseApi : storageApi
export const reqAddRecord = api.reqAddRecord
export const reqDeleteRecord = api.reqDeleteRecord
export const reqGetRecord = api.reqGetRecord
export const reqUpdateRecord = api.reqUpdateRecord
