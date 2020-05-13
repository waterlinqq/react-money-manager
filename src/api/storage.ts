import MoneyRecord from 'model/money-record'
import { IRecord } from 'typings'

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
