export type Spending = 'cost' | 'benefit'
export interface IIcon {
  type: Spending
  text: string
  url: string
}

export interface IRecord {
  id?: string
  amount: number
  category: string
  type: Spending
  date: string
  mark: string
}
