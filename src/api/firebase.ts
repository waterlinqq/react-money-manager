import * as firebase from 'firebase/app'
import 'firebase/database'
import moment from 'moment'

import store from 'store'

import { IRecord, IFbRecords, IReminder, IFbReminders } from 'typings'

const getUid = () => store.getState().user!.uid
const firebaseRecord = firebase.database().ref('record')
const firebaseRemind = firebase.database().ref('remind')

export const reqGetRecord = async (filter: Date | string) => {
  const userRecord = firebaseRecord.child(getUid())
  let snapShot
  if (filter instanceof Date) {
    const startAt = moment(filter).format('YYYY-MM-01')
    const endAt = moment(filter).format('YYYY-MM-31')
    snapShot = await userRecord
      .orderByChild('date')
      .startAt(startAt)
      .endAt(endAt)
      .once('value')
  } else if (typeof filter === 'string') {
    snapShot = await userRecord.orderByKey().equalTo(filter).once('value')
  } else {
    snapShot = await userRecord.once('value')
  }
  return (snapShot.val() as IFbRecords) || {}
}

export const reqAddRecord = async (option: IRecord) => {
  const userRecord = firebaseRecord.child(getUid())
  const ref = await userRecord.push(option)
  const snapShot = await ref.once('value')
  return { key: ref.key, value: snapShot.val() }
}

export const reqUpdateRecord = async (
  key: string,
  config: Partial<IRecord>
) => {
  const userRecord = firebaseRecord.child(getUid())
  const ref = userRecord.child(key)
  await ref.update(config)
  const snapShot = await ref.once('value')
  return { key: ref.key, value: snapShot.val() }
}

export const reqDeleteRecord = async (key: string) => {
  const userRecord = firebaseRecord.child(getUid())
  const ref = userRecord.child(key)
  await ref.remove()
  return true
}

export const reqAddReminder = async (time: string) => {
  const userRemind = firebaseRemind.child(getUid())
  const ref = await userRemind.push({ time, on: true })
  const snapShot = await ref.once('value')
  return { key: ref.key, value: snapShot.val() }
}

export const reqDelReminder = async (key: string) => {
  const userRemind = firebaseRemind.child(getUid())
  const ref = userRemind.child(key)
  await ref.remove()
  return true
}

export const reqGetReminder = async () => {
  const userRemind = firebaseRemind.child(getUid())
  const snapShot = await userRemind.once('value')
  return (snapShot.val() as IFbReminders) || {}
}

export const reqModReminder = async (
  key: string,
  config: Partial<IReminder>
) => {
  const userRemind = firebaseRemind.child(getUid())
  const ref = userRemind.child(key)
  await ref.update(config)
  const snapShot = await ref.once('value')
  return { key: ref.key, value: snapShot.val() }
}
