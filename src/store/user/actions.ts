import { SET_USER } from './action-types'
import { User } from 'typings'

export const userSet = (user: User) => ({ type: SET_USER, payload: user })

export type UserActionTypes = ReturnType<typeof userSet>
