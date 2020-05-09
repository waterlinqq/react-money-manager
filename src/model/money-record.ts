import BaseModel from './base-model'

const MONEYRECORD = 'MONEYRECORD'

class MoneyRecord extends BaseModel {
  public readonly id = Date.now() + ' ' + Math.random()
  public constructor(
    public type: string,
    public amount: number,
    public date: string,
    public category: string
  ) {
    super()
  }
  public static data: MoneyRecord[] = JSON.parse(
    localStorage.getItem(MONEYRECORD) || '[]'
  ).map((item: any) => Object.setPrototypeOf(item, MoneyRecord.prototype))
  public save() {
    if (!MoneyRecord.data.includes(this)) {
      MoneyRecord.data.push(this)
    }
    localStorage.setItem(MONEYRECORD, JSON.stringify(MoneyRecord.data))
  }
  public delete() {
    const data = MoneyRecord.data
    const idx = data.findIndex((item) => item.id === this.id)
    data.splice(idx, 1)
    localStorage.setItem(MONEYRECORD, JSON.stringify(data))
  }
  public static delete(id: string) {
    const data = MoneyRecord.data
    const idx = data.findIndex((item) => item.id === id)
    if (idx === -1) {
      return
    }
    data.splice(idx, 1)
    localStorage.setItem(MONEYRECORD, JSON.stringify(data))
  }
  public static find(key?: keyof MoneyRecord, value?: string | number) {
    if (key == null) {
      return this.data
    }
    return this.data.filter((item) => item[key] === value)
  }
}

export default MoneyRecord
