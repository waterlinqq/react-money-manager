import MoneyRecord from '../model/money-record'
import { IRecord, IFbRecords } from 'typings'
import * as firebase from 'firebase/app'
import 'firebase/database'
import dayjs from 'dayjs'
import { equal } from 'assert'

const firebaseRecord = firebase.database().ref('record')
;(window as any).a = firebaseRecord
export const reqGetRecord = async (filter: Date | string) => {
  let snapShot
  if (filter instanceof Date) {
    const startAt = dayjs(filter).format('YYYY-MM-01')
    const endAt = dayjs(filter).format('YYYY-MM-31')
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

  // return MoneyRecord.find(...args)
}

export const reqAddRecord = async (option: IRecord) => {
  const ref = await firebaseRecord.push(option)
  const snapShot = await ref.once('value')
  return { key: ref.key, value: snapShot.val() }
  // return new MoneyRecord(option).save()
}

export const reqUpdateRecord = async (
  key: string,
  config: Partial<IRecord>
) => {
  const ref = firebaseRecord.child(key)
  await ref.update(config)
  const snapShot = await ref.once('value')
  return { key: ref.key, value: snapShot.val() }
  // const [record] = await MoneyRecord.find('id', id)
  // const newRecord = Object.assign(record, config)
  // return newRecord.save()
}

export const reqDeleteRecord = async (key: string) => {
  const ref = firebaseRecord.child(key)
  await ref.remove()
  return true
  // return MoneyRecord.delete(id)
}
