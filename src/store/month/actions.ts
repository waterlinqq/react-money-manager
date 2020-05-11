import { SET_MONTH } from './action-types'

export const monthSet = (month: Date) => ({ type: SET_MONTH, payload: month })

export type MonthActionTypes = ReturnType<typeof monthSet>
