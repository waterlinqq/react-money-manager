import * as firebase from 'firebase/app'
import { IRecord, IFbRecords } from 'typings'
import 'firebase/database'
import moment from 'moment'

const firebaseRecord = firebase.database().ref('record')

export const reqGetRecord = async (filter: Date | string) => {
  let snapShot
  if (filter instanceof Date) {
    const startAt = moment(filter).format('YYYY-MM-01')
    const endAt = moment(filter).format('YYYY-MM-31')
    snapShot = await firebaseRecord
      .orderByChild('date')
      .startAt(startAt)
      .endAt(endAt)
      .once('value')
  } else if (typeof filter === 'string') {
    snapShot = await firebaseRecord.orderByKey().equalTo(filter).once('value')
  } else {
    snapShot = await firebaseRecord.once('value')
  }
  return (snapShot.val() as IFbRecords) || {}
}

export const reqAddRecord = async (option: IRecord) => {
  const ref = await firebaseRecord.push(option)
  const snapShot = await ref.once('value')
  return { key: ref.key, value: snapShot.val() }
}

export const reqUpdateRecord = async (
  key: string,
  config: Partial<IRecord>
) => {
  const ref = firebaseRecord.child(key)
  await ref.update(config)
  const snapShot = await ref.once('value')
  return { key: ref.key, value: snapShot.val() }
}

export const reqDeleteRecord = async (key: string) => {
  const ref = firebaseRecord.child(key)
  await ref.remove()
  return true
}
