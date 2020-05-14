import MoneyRecord from 'model/money-record'
import Reminder from 'model/reminder'
import { IRecord, IReminder } from 'typings'

export const reqGetRecord = async (filter: Date | string) => {
  return MoneyRecord.find(filter)
}

export const reqAddRecord = async (option: IRecord) => {
  return new MoneyRecord(option).save()
}

export const reqUpdateRecord = async (
  key: string,
  config: Partial<IRecord>
) => {
  return MoneyRecord.update(key, config)
}

export const reqDeleteRecord = async (key: string) => {
  return MoneyRecord.delete(key)
}

export const reqGetReminder = async () => {
  return Reminder.find()
}

export const reqAddReminder = async (time: string) => {
  return new Reminder(time).save()
}

export const reqModReminder = async (
  key: string,
  config: Partial<IReminder>
) => {
  return Reminder.update(key, config)
}

export const reqDelReminder = async (key: string) => {
  return Reminder.delete(key)
}
