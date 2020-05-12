import { Spending, IRecord } from 'typings'

export const trans = (type: Spending) => (type === 'cost' ? '支出' : '收入')
export const reverse = (type: Spending): Spending =>
  type === 'cost' ? 'benefit' : 'cost'
export const proxyR = (records: IRecord[]) => {
  const costRecords = records.filter((item) => item.type === 'cost')
  const benefitRecords = records.filter((item) => item.type === 'benefit')
  const costTotal = costRecords.reduce((accu, item) => accu + item.amount, 0)
  const benefitTotal = benefitRecords.reduce(
    (accu, item) => accu + item.amount,
    0
  )
  const balance = benefitTotal - costTotal
  return {
    records,
    costRecords,
    benefitRecords,
    benefitTotal,
    costTotal,
    balance,
  }
}
