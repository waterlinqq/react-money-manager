import {
  ADD_REMINDER,
  MOD_REMINDER,
  DEL_REMINDER,
  GET_REMINDER,
} from './action-types'
import { ReminderActionTypes } from './actions'
import { IFbReminders } from 'typings'

const initialState = {} as IFbReminders

export const reminderReducer = (
  state = initialState,
  action: ReminderActionTypes
): IFbReminders => {
  switch (action.type) {
    case ADD_REMINDER: {
      const { key, value } = action.payload
      return { ...state, [key]: value }
    }
    case DEL_REMINDER: {
      delete state[action.payload]
      return { ...state }
    }
    case MOD_REMINDER: {
      const { key, value } = action.payload
      state[key] = Object.assign(state[key], value)
      return { ...state }
    }
    case GET_REMINDER: {
      return action.payload
    }
    default: {
      return state
    }
  }
}
