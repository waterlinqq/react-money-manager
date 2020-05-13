import { SET_USER } from './action-types'
import { UserActionTypes } from './actions'

export const userReducer = (state = null, action: UserActionTypes) => {
  switch (action.type) {
    case SET_USER:
      return action.payload
    default:
      return state
  }
}
