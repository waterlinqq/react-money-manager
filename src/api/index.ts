import MoneyRecord from '../model/money-record'

export const reqGetRecord = (...args: Parameters<typeof MoneyRecord.find>) => {
  return MoneyRecord.find(...args)
}

export const reqAddRecord = (
  ...args: ConstructorParameters<typeof MoneyRecord>
) => {
  return new MoneyRecord(...args).save()
}

export const reqUpdateRecord = async (
  id: string,
  config: Partial<MoneyRecord>
) => {
  const [record] = await MoneyRecord.find('id', id)
  const newRecord = Object.assign(record, config)
  return newRecord.save()
}

export const reqDeleteRecord = (id: string) => {
  return MoneyRecord.delete(id)
}
