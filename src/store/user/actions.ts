import { ThunkAction } from 'redux-thunk'

import store, { AppState } from 'store'
import { SET_USER } from './action-types'
import { User } from 'typings'
import { getRecord } from 'store/record/actions'
import { getReminder } from 'store/reminder/actions'

interface IUserSetAction {
  type: typeof SET_USER
  payload: User
}
const userSet = (user: User): IUserSetAction => ({
  type: SET_USER,
  payload: user,
})
export const SetUser = (
  user: User
): ThunkAction<any, AppState, undefined, any> => (dispatch) => {
  // when user changed, recors and reminders should be updated.
  // dispatching reminder and record action  must be after user updated since API method is called according to user state.
  dispatch(userSet(user))
  dispatch(getReminder())
  dispatch(getRecord(store.getState().month))
}

export type UserActionTypes = IUserSetAction
