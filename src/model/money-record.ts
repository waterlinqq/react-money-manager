import BaseModel from './base-model'
import { IRecord } from 'typings'

const MONEYRECORD = 'MONEYRECORD'

class MoneyRecord extends BaseModel {
  public readonly id = Date.now() + ' ' + Math.random()
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
  public static data: MoneyRecord[] = JSON.parse(
    localStorage.getItem(MONEYRECORD) || '[]'
  ).map((item: any) => Object.setPrototypeOf(item, MoneyRecord.prototype))
  public save() {
    return new Promise<MoneyRecord>((resolve, reject) => {
      if (!MoneyRecord.data.includes(this)) {
        MoneyRecord.data.push(this)
      }
      localStorage.setItem(MONEYRECORD, JSON.stringify(MoneyRecord.data))
      resolve(this)
    })
  }
  public delete() {
    return new Promise<boolean>((resolve, reject) => {
      const data = MoneyRecord.data
      const idx = data.findIndex((item) => item.id === this.id)
      if (idx === -1) {
        reject(false)
      }
      data.splice(idx, 1)
      localStorage.setItem(MONEYRECORD, JSON.stringify(data))
      resolve(true)
    })
  }
  public static delete(id: string) {
    return new Promise<boolean>((resolve, reject) => {
      const data = MoneyRecord.data
      const idx = data.findIndex((item) => item.id === id)
      if (idx === -1) {
        reject(false)
      }
      data.splice(idx, 1)
      localStorage.setItem(MONEYRECORD, JSON.stringify(data))
      resolve(true)
    })
  }
  public static find(
    key?: keyof MoneyRecord,
    value?: string | number
  ): Promise<MoneyRecord[]> {
    return new Promise((resolve, reject) => {
      if (key == null) {
        return resolve(this.data)
      }
      resolve(this.data.filter((item) => item[key] === value))
    })
  }
}

export default MoneyRecord
