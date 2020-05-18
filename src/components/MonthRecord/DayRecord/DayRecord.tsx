import React, { FC } from 'react'
import moment from 'moment'
import { List } from 'antd-mobile'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import classes from './DayRecord.module.scss'
import { IFbRecords } from 'typings'

interface IProps {
  dayData: IFbRecords
}

const DayRecord: FC<IProps & RouteComponentProps> = ({ dayData, history }) => {
  const entries = Object.entries(dayData)
  const { date } = entries[0][1]
  const { cost, benefit } = entries.reduce(
    (accu, [_, record]) => {
      accu[record.type] += record.amount
      return accu
    },
    { cost: 0, benefit: 0 }
  )
  const day =
    '週' + ['日', '一', '二', '三', '四', '五', '六'][moment(date).day()]
  const formatDate = moment(date).format('MM/DD')
  return (
    <div className={classes.DayRecord}>
      <div className={classes.Info}>
        <div>{`${formatDate} ${day}`}</div>
        <div className={classes.Total}>
          {benefit === 0 ? null : <span>收入: {benefit}</span>}
          {cost === 0 ? null : <span>支出: {cost}</span>}
        </div>
      </div>
      <List>
        {entries.map(([key, record]) => (
          <div
            key={key}
            onClick={() => history.push(`/detail/${key}`)}
            className={classes.Item}
          >
            <div className={`${record.type}-img ${record.category}`} />
            <span className={classes.Title}>{record.category}</span>
            <span className={classes.Amount}>
              {(record.type === 'cost' ? '-' : '') + record.amount}
            </span>
          </div>
        ))}
      </List>
    </div>
  )
}
export default withRouter(DayRecord)
