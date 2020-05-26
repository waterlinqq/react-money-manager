import { FC } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import { AppState } from 'store'
import { IFbReminders } from 'typings'

let timer: number

const getClosestTime = (reminders: IFbReminders) => {
  const today = moment().format('YYYY-MM-DD')
  const cloestTime = Object.values(reminders)
    // filter out closed reminders
    .filter((time) => time.on)
    // map into specific datetime
    .map((time) => `${today} ${time.time}`)
    // map into timecode
    .map(Date.parse)
    // take account of the next day reminders
    .flatMap((time) => [time, time + 24 * 60 * 60 * 1000])
    // filter out the past time
    .filter((time) => time > Date.now())
    // map into remining time
    .map((time) => time - Date.now())
    // sort in ascending order
    .sort()
    // get the first(smallest) one
    .shift()
  return cloestTime
}
const toRemind = (reminders: IFbReminders) => {
  const remainTime = getClosestTime(reminders)
  clearTimeout(timer)
  if (remainTime) {
    timer = window.setTimeout(() => {
      // ServiceWorkerRegistration.showNotification('記得記帳喔!!')
      const notice = new Notification('記得記帳喔!!')
      notice.onshow = () => setTimeout(() => notice.close(), 5000)
      toRemind(reminders)
    }, remainTime)
  }
}

interface IProps {
  reminders: IFbReminders
}
const ReminderTimer: FC<IProps> = ({ reminders }) => {
  toRemind(reminders)
  return null
}
const mapStateToProps = (state: AppState) => ({ reminders: state.reminders })
export default connect(mapStateToProps)(ReminderTimer)
