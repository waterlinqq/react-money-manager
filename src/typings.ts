export type Spending = 'cost' | 'benefit'
export interface IIcon {
  type: Spending
  text: string
  url: string
}

export interface IRecord {
  type: Spending
  amount: number
  date: string
  category: string
  mark: string
}

export interface IDbRecord extends IRecord {
  readonly id: string
}

export interface IFbRecords {
  [key: string]: IRecord
}

export interface IFbRecord {
  key: string
  value: IRecord
}

export type User = null | {
  displayName: string | null
  email: string | null
  photoURL: string | null
  uid: string
}
