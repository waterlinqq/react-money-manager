import { ADD_RECORD, MOD_RECORD, DEL_RECORD, GET_RECORD } from './action-types'
import {
  reqAddRecord,
  reqUpdateRecord,
  reqDeleteRecord,
  reqGetRecord,
} from 'api'
import { IDbRecord, IRecord } from 'typings'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../index'

type ThunkResult<R> = ThunkAction<any, AppState, undefined, any>
interface IRecordAddAction {
  type: typeof ADD_RECORD
  payload: IDbRecord
}
const recordAdd = (record: IDbRecord): IRecordAddAction => ({
  type: ADD_RECORD,
  payload: record,
})
interface IRecordModAction {
  type: typeof MOD_RECORD
  payload: IDbRecord
}
const recordMod = (record: IDbRecord): IRecordModAction => ({
  type: MOD_RECORD,
  payload: record,
})
interface IRecordDelAction {
  type: typeof DEL_RECORD
  payload: string
}
const recordDel = (id: string): IRecordDelAction => ({
  type: DEL_RECORD,
  payload: id,
})
interface IRecordGetAction {
  type: typeof GET_RECORD
  payload: IDbRecord[]
}
const recordGet = (records: IDbRecord[]): IRecordGetAction => ({
  type: GET_RECORD,
  payload: records,
})
export const addRecord = (option: IRecord): ThunkResult<void> => async (
  dispatch
) => {
  const record = await reqAddRecord(option)
  dispatch(recordAdd(record as IDbRecord))
}

export const modRecord = (option: IDbRecord): ThunkResult<void> => async (
  dispatch
) => {
  const record = (await reqUpdateRecord(option.id, option)) as IDbRecord
  dispatch(recordMod(record))
}

export const delRecord = (id: string): ThunkResult<void> => async (
  dispatch
) => {
  await reqDeleteRecord(id)
  dispatch(recordDel(id))
}

export const getRecord = (): ThunkResult<void> => async (dispatch) => {
  const records = (await reqGetRecord()) as IDbRecord[]
  dispatch(recordGet(records))
}

export type RecordActionTypes =
  | IRecordAddAction
  | IRecordDelAction
  | IRecordGetAction
  | IRecordModAction
