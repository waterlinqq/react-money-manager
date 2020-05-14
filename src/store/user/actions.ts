import { SET_USER } from './action-types'
import { User } from 'typings'

interface IUserSetAction {
  type: typeof SET_USER
  payload: User
}
export const userSet = (user: User): IUserSetAction => ({
  type: SET_USER,
  payload: user,
})

export type UserActionTypes = IUserSetAction
