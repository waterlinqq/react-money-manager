import React, { FC, Fragment } from 'react'

import DayRecord from './DayRecord/DayRecord'
import { IDbRecord } from 'typings.js'

interface IProps {
  monthData: IDbRecord[]
}
interface IMonthDataByDate {
  [date: string]: IDbRecord[]
}

const indexByDate = (monthData: IDbRecord[]) => {
  return monthData.reduce((obj, item) => {
    const date = item.date
    if (!obj[date]) {
      obj[date] = []
    }
    obj[date].push(item)
    return obj
  }, {} as IMonthDataByDate)
}
const MonthRecord: FC<IProps> = ({ monthData }) => {
  const monthDataByDate = indexByDate(monthData)
  const sortedMonthData = Object.values(monthDataByDate).sort((a, b) =>
    a[0].date > b[0].date ? -1 : 1
  ) // descended by date

  return (
    <Fragment>
      {sortedMonthData.map((dayData, i) => (
        <DayRecord dayData={dayData} key={i} />
      ))}
    </Fragment>
  )
}

export default MonthRecord
