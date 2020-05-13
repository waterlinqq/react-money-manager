import { ADD_RECORD, MOD_RECORD, DEL_RECORD, GET_RECORD } from './action-types'
import { RecordActionTypes } from './actions'
import { IFbRecords } from 'typings'

const initialState = {} as IFbRecords

export const recordReducer = (
  state = initialState,
  action: RecordActionTypes
): IFbRecords => {
  switch (action.type) {
    case ADD_RECORD: {
      const { key, value } = action.payload
      return { [key]: value, ...state }
    }
    case DEL_RECORD: {
      delete state[action.payload]
      return { ...state }
    }
    case MOD_RECORD: {
      const { key, value } = action.payload
      state[key] = value
      return { ...state }
    }
    case GET_RECORD: {
      return action.payload
    }
    default: {
      return state
    }
  }
}
