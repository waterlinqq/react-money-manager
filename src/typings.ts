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
