import { Spending } from 'typings'

export const trans = (type: Spending) => (type === 'cost' ? '支出' : '收益')
