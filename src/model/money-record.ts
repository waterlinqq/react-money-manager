import BaseModel from './base-model'
import { IRecord } from 'typings'
import moment from 'moment'

const MONEYRECORD = 'MONEYRECORD'
interface IMoneyRecords {
  [key: string]: MoneyRecord
}

class MoneyRecord extends BaseModel {
  public type: string
  public amount: number
  public date: string
  public category: string
  public mark: string
  public constructor({ type, amount, date, category, mark }: IRecord) {
    super()
    this.type = type
    this.amount = amount
    this.date = date
    this.category = category
    this.mark = mark
  }
  public static data: IMoneyRecords = JSON.parse(
    localStorage.getItem(MONEYRECORD) || '{}'
  )
  public save() {
    return new Promise((resolve, reject) => {
      const key = Date.now() + ' ' + Math.random()
      MoneyRecord.data[key] = this
      localStorage.setItem(MONEYRECORD, JSON.stringify(MoneyRecord.data))
      resolve({ key, value: this })
    })
  }
  public delete() {
    return new Promise((resolve, reject) => {
      const data = MoneyRecord.data
      Object.keys(data).some((key) => {
        if (data[key] === this) {
          return delete data[key]
        }
        return false
      })
      localStorage.setItem(MONEYRECORD, JSON.stringify(MoneyRecord.data))
      resolve(true)
    })
  }
  public update(config: Partial<IRecord>) {
    return new Promise((resolve, reject) => {
      Object.assign(this, config)
      localStorage.setItem(MONEYRECORD, JSON.stringify(MoneyRecord.data))
      resolve(true)
    })
  }

  public static update(key: string, config: Partial<IRecord>) {
    return new Promise<boolean>((resolve, reject) => {
      Object.assign(this.data[key], config)
      localStorage.setItem(MONEYRECORD, JSON.stringify(MoneyRecord.data))
      resolve(true)
    })
  }
  public static delete(key: string) {
    return new Promise<boolean>((resolve, reject) => {
      delete MoneyRecord.data[key]
      localStorage.setItem(MONEYRECORD, JSON.stringify(MoneyRecord.data))
      resolve(true)
    })
  }
  public static find(filter?: string | Date): Promise<IMoneyRecords> {
    return new Promise((resolve, reject) => {
      if (filter instanceof Date) {
        const result = {} as IMoneyRecords
        const startAt = moment(filter).format('YYYY-MM-01')
        const endAt = moment(filter).format('YYYY-MM-31')
        for (const [key, record] of Object.entries(this.data)) {
          if (record.date >= startAt && record.date <= endAt) {
            result[key] = record
          }
        }
        resolve(result)
      } else if (typeof filter === 'string') {
        resolve({ [filter]: this.data[filter] })
      } else {
        resolve(this.data)
      }
    })
  }
}

export default MoneyRecord
