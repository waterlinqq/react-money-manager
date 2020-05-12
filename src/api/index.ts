import MoneyRecord from '../model/money-record'
import { IRecord } from 'typings'

export const reqGetRecord = (...args: Parameters<typeof MoneyRecord.find>) => {
  return MoneyRecord.find(...args)
}

export const reqAddRecord = async (option: IRecord) => {
  return new MoneyRecord(option).save()
}

export const reqUpdateRecord = async (id: string, config: Partial<IRecord>) => {
  const [record] = await MoneyRecord.find('id', id)
  const newRecord = Object.assign(record, config)
  return newRecord.save()
}

export const reqDeleteRecord = (id: string) => {
  return MoneyRecord.delete(id)
}
