import BaseModel from './base-model'
import { IReminder } from 'typings'
const REMINDER = 'REMINDER'
interface IReminders {
  [key: string]: Reminder
}

class Reminder extends BaseModel {
  public on = true
  public constructor(public time: string) {
    super()
  }
  public static data: IReminders = JSON.parse(
    localStorage.getItem(REMINDER) || '{}'
  )
  public save() {
    return new Promise((resolve, reject) => {
      const key = Date.now() + ' ' + Math.random()
      Reminder.data[key] = this
      localStorage.setItem(REMINDER, JSON.stringify(Reminder.data))
      resolve({ key, value: this })
    })
  }
  public delete() {
    return new Promise((resolve, reject) => {
      const data = Reminder.data
      Object.keys(data).some((key) => {
        if (data[key] === this) {
          return delete data[key]
        }
        return false
      })
      localStorage.setItem(REMINDER, JSON.stringify(Reminder.data))
      resolve(true)
    })
  }
  public update(config: Partial<IReminder>) {
    return new Promise((resolve, reject) => {
      Object.assign(this, config)
      localStorage.setItem(REMINDER, JSON.stringify(Reminder.data))
      resolve(true)
    })
  }

  public static update(key: string, config: Partial<IReminder>) {
    return new Promise<boolean>((resolve, reject) => {
      Object.assign(this.data[key], config)
      localStorage.setItem(REMINDER, JSON.stringify(Reminder.data))
      resolve(true)
    })
  }
  public static delete(key: string) {
    return new Promise<boolean>((resolve, reject) => {
      delete Reminder.data[key]
      localStorage.setItem(REMINDER, JSON.stringify(Reminder.data))
      resolve(true)
    })
  }
  public static find() {
    return new Promise((resolve, reject) => {
      resolve(this.data)
    })
  }
}

export default Reminder
