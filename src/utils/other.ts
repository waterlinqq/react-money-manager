import { Spending, IFbRecords } from 'typings'

export const trans = (type: Spending) => (type === 'cost' ? '支出' : '收入')
export const reverse = (type: Spending): Spending =>
  type === 'cost' ? 'benefit' : 'cost'
export const proxyR = (records: IFbRecords) => {
  const costRecords = {} as IFbRecords
  const benefitRecords = {} as IFbRecords
  let costTotal = 0
  let benefitTotal = 0
  let balance = 0
  Object.entries(records).forEach(([key, record]) => {
    if (record.type === 'cost') {
      costRecords[key] = record
      costTotal += record.amount
    } else {
      benefitRecords[key] = record
      benefitTotal += record.amount
    }
  })
  balance = benefitTotal - costTotal
  return {
    records,
    costRecords,
    benefitRecords,
    benefitTotal,
    costTotal,
    balance,
  }
}
