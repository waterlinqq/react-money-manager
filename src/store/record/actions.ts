import { ADD_RECORD, MOD_RECORD, DEL_RECORD, GET_RECORD } from './action-types'
import {
  reqAddRecord,
  reqUpdateRecord,
  reqDeleteRecord,
  reqGetRecord,
} from 'api'
import { IDbRecord, IRecord, IFbRecord, IFbRecords } from 'typings'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../index'

type ThunkResult<R> = ThunkAction<any, AppState, undefined, any>
interface IRecordAddAction {
  type: typeof ADD_RECORD
  payload: IFbRecord
}
const recordAdd = (record: IFbRecord): IRecordAddAction => ({
  type: ADD_RECORD,
  payload: record,
})
interface IRecordModAction {
  type: typeof MOD_RECORD
  payload: IFbRecord
}
const recordMod = (data: IFbRecord): IRecordModAction => ({
  type: MOD_RECORD,
  payload: data,
})
interface IRecordDelAction {
  type: typeof DEL_RECORD
  payload: string
}
const recordDel = (key: string): IRecordDelAction => ({
  type: DEL_RECORD,
  payload: key,
})
interface IRecordGetAction {
  type: typeof GET_RECORD
  payload: IFbRecords
}
const recordGet = (records: IFbRecords): IRecordGetAction => ({
  type: GET_RECORD,
  payload: records,
})
export const addRecord = (option: IRecord): ThunkResult<void> => async (
  dispatch
) => {
  const record = await reqAddRecord(option)
  dispatch(recordAdd(record as IFbRecord))
}

export const modRecord = (option: IDbRecord): ThunkResult<void> => async (
  dispatch
) => {
  const record = await reqUpdateRecord(option.id, option)
  dispatch(recordMod(record as IFbRecord))
}

export const delRecord = (key: string): ThunkResult<void> => async (
  dispatch
) => {
  await reqDeleteRecord(key)
  dispatch(recordDel(key))
}

export const getRecord = (filter: Date | string): ThunkResult<void> => async (
  dispatch
) => {
  const records = await reqGetRecord(filter)
  dispatch(recordGet(records as IFbRecords))
}

export type RecordActionTypes =
  | IRecordAddAction
  | IRecordDelAction
  | IRecordGetAction
  | IRecordModAction
