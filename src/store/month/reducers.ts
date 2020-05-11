import { SET_MONTH } from './action-types'
import { MonthActionTypes } from './actions'

export const monthReducer = (state = new Date(), action: MonthActionTypes) => {
  switch (action.type) {
    case SET_MONTH:
      return action.payload
    default:
      return state
  }
}
