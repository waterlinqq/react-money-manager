import {
  ADD_REMINDER,
  DEL_REMINDER,
  GET_REMINDER,
  MOD_REMINDER,
} from './action-types'
import API from 'api'
import { IFbReminder, IFbReminders, IReminder } from 'typings'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../index'

type ThunkResult<R> = ThunkAction<any, AppState, undefined, any>
interface IReminderAddAction {
  type: typeof ADD_REMINDER
  payload: IFbReminder
}
const reminderAdd = (reminder: IFbReminder): IReminderAddAction => ({
  type: ADD_REMINDER,
  payload: reminder,
})

interface IReminderDelAction {
  type: typeof DEL_REMINDER
  payload: string
}
const reminderDel = (key: string): IReminderDelAction => ({
  type: DEL_REMINDER,
  payload: key,
})

interface IReminderModAction {
  type: typeof MOD_REMINDER
  payload: { key: string; value: Partial<IReminder> }
}
const reminderMod = (data: {
  key: string
  value: Partial<IReminder>
}): IReminderModAction => ({
  type: MOD_REMINDER,
  payload: data,
})

interface IReminderGetAction {
  type: typeof GET_REMINDER
  payload: IFbReminders
}
const reminderGet = (reminders: IFbReminders): IReminderGetAction => ({
  type: GET_REMINDER,
  payload: reminders,
})

export const addReminder = (time: string): ThunkResult<void> => async (
  dispatch
) => {
  const reminder = await API.reqAddReminder(time)
  dispatch(reminderAdd(reminder as IFbReminder))
}

export const modReminder = (
  key: string,
  option: Partial<IReminder>
): ThunkResult<void> => async (dispatch) => {
  await API.reqModReminder(key, option)
  dispatch(reminderMod({ key, value: option }))
}

export const delReminder = (key: string): ThunkResult<void> => async (
  dispatch
) => {
  await API.reqDelReminder(key)
  dispatch(reminderDel(key))
}

export const getReminder = (): ThunkResult<void> => async (dispatch) => {
  const reminders = await API.reqGetReminder()
  dispatch(reminderGet(reminders as IFbReminders))
}

export type ReminderActionTypes =
  | IReminderAddAction
  | IReminderDelAction
  | IReminderGetAction
  | IReminderModAction
