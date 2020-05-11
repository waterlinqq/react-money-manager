import { ADD_RECORD, MOD_RECORD, DEL_RECORD, GET_RECORD } from './action-types'
import {
  reqAddRecord,
  reqUpdateRecord,
  reqDeleteRecord,
  reqGetRecord,
} from 'api'
import { IRecord } from 'typings'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../index'

type ThunkResult<R> = ThunkAction<any, AppState, undefined, any>
interface IRecordAddAction {
  type: typeof ADD_RECORD
  payload: IRecord
}
const recordAdd = (record: IRecord): IRecordAddAction => ({
  type: ADD_RECORD,
  payload: record,
})
interface IRecordModAction {
  type: typeof MOD_RECORD
  payload: IRecord
}
const recordMod = (record: IRecord): IRecordModAction => ({
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
  payload: IRecord[]
}
const recordGet = (records: IRecord[]): IRecordGetAction => ({
  type: GET_RECORD,
  payload: records,
})

export const addRecord = ({
  type,
  amount,
  category,
  date,
  mark,
}: IRecord): ThunkResult<void> => async (dispatch) => {
  const record = (await reqAddRecord(
    type,
    amount,
    date,
    category,
    mark
  )) as IRecord
  dispatch(recordAdd(record))
}

export const modRecord = ({
  id,
  type,
  amount,
  category,
  date,
  mark,
}: Required<IRecord>): ThunkResult<void> => async (dispatch) => {
  const record = (await reqUpdateRecord(id, {
    type,
    amount,
    category,
    date,
    mark,
  })) as IRecord
  dispatch(recordMod(record))
}

export const delRecord = (id: string): ThunkResult<void> => async (
  dispatch
) => {
  await reqDeleteRecord(id)
  dispatch(recordDel(id))
}

export const getRecord = (): ThunkResult<void> => async (dispatch) => {
  const records = (await reqGetRecord()) as IRecord[]
  dispatch(recordGet(records))
}

export type RecordActionTypes =
  | IRecordAddAction
  | IRecordDelAction
  | IRecordGetAction
  | IRecordModAction
