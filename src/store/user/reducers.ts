import { SET_USER } from './action-types'
import { UserActionTypes } from './actions'
import { User } from 'typings'

export const userReducer = (state: User = null, action: UserActionTypes) => {
  switch (action.type) {
    case SET_USER:
      return action.payload
    default:
      return state
  }
}
