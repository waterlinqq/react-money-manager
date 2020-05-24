import { ThunkAction } from 'redux-thunk'

import { SET_MONTH } from './action-types'
import { getRecord } from '../record/actions'
import { AppState } from 'store'

const monthSet = (month: Date) => ({ type: SET_MONTH, payload: month })

export const setMonth = (
  month: Date
): ThunkAction<any, AppState, undefined, any> => (dispatch) => {
  dispatch(monthSet(month))
  // whenever month update, records should be correspondent to the month.
  dispatch(getRecord(month))
}

export type MonthActionTypes = ReturnType<typeof monthSet>
