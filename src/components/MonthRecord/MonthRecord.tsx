import React, { FC, Fragment } from 'react'

import DayRecord from './DayRecord/DayRecord'
import { IFbRecords } from 'typings.js'

interface IProps {
  monthData: IFbRecords
}
interface IMonthDataByDate {
  [date: string]: IFbRecords
}

const indexByDate = (monthData: IFbRecords) => {
  return Object.entries(monthData).reduce((obj, [key, record]) => {
    const date = record.date
    if (!obj[date]) {
      obj[date] = {} as IFbRecords
    }
    obj[date][key] = record
    return obj
  }, {} as IMonthDataByDate)
}
const MonthRecord: FC<IProps> = ({ monthData }) => {
  // debugger
  const monthDataByDate = indexByDate(monthData)
  const sortedMonthData = Object.entries(monthDataByDate)
    .sort((a, b) => (a[0] > b[0] ? -1 : 1))
    .map((entry) => entry[1])
  // descended by date

  return (
    <Fragment>
      {sortedMonthData.map((dayData, i) => (
        <DayRecord dayData={dayData} key={i} />
      ))}
    </Fragment>
  )
}

export default MonthRecord
