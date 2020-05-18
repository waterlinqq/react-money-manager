import React, { FC } from 'react'
import { List, WhiteSpace } from 'antd-mobile'

import RecordItem from './RecordItem/RecordItem'
import { trans } from 'utils/other'

import classes from './RecordList.module.scss'

import { Spending, IRecord } from 'typings'

interface IProps {
  records: Array<[string, IRecord]>
  total: number
  type: Spending
}
const RecordList: FC<IProps> = ({ records, total, type }) => {
  return (
    <div className={classes.RecordList}>
      <span className={classes.Title}>{trans(type)}列表</span>
      <WhiteSpace />
      <List>
        {records.map(([key, record]) => {
          const bar = +((record.amount / records[0][1].amount) * 100).toFixed(1)
          const ratio = +((record.amount / total) * 100).toFixed(1)
          return (
            <RecordItem
              key={key}
              record={record}
              id={key}
              ratio={ratio}
              bar={bar}
              type={type}
            />
          )
        })}
      </List>
    </div>
  )
}
export default RecordList
