import MoneyRecord from '../model/money-record'

export const reqGetRecord = () => {
  return MoneyRecord.find()
}

export const reqAddRecord = (
  ...args: ConstructorParameters<typeof MoneyRecord>
) => {
  return new MoneyRecord(...args).save()
}

export const reqUpdateRecord = (id: string, config: Partial<MoneyRecord>) => {
  const [record] = MoneyRecord.find('id', id)
  const newRecord = Object.assign(record, config)
  newRecord.save()
}

export const reqDeleteRecord = (id: string) => {
  MoneyRecord.delete(id)
}
