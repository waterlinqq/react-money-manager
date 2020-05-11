import { ADD_RECORD, MOD_RECORD, DEL_RECORD, GET_RECORD } from './action-types'
import { RecordActionTypes } from './actions'
import { IRecord } from 'typings'

const initialState: IRecord[] = []

export const recordReducer = (
  state = initialState,
  action: RecordActionTypes
): IRecord[] => {
  switch (action.type) {
    case ADD_RECORD: {
      return [action.payload, ...state]
    }
    case DEL_RECORD: {
      const idx = state.findIndex((rec) => rec.id === action.payload)
      return state.splice(idx, 1).slice()
    }
    case MOD_RECORD: {
      const idx = state.findIndex((rec) => rec.id === action.payload.id)
      state[idx] = action.payload
      return state.slice()
    }
    case GET_RECORD: {
      return action.payload.slice()
    }
    default: {
      return state
    }
  }
}
