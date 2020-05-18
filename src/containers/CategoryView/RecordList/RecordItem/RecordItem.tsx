import React, { FC } from 'react'
import { List, Progress } from 'antd-mobile'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import classes from './RecordItem.module.scss'
import { Spending, IRecord } from 'typings'

interface IProps {
  record: IRecord
  ratio: number
  bar: number
  id: string
  type: Spending
}
const RecordItem: FC<RouteComponentProps & IProps> = ({
  record,
  ratio,
  bar,
  id,
  history,
  type,
}) => {
  return (
    <List.Item
      style={{ padding: '0px' }}
      onClick={() => history.push(`/detail/${id}`)}
    >
      <div className={classes.Wrapper}>
        <div data-img className={`${type}-img ${record.category}`} />
        <div className={classes.Info}>
          <span className={classes.Title}>{record.category}</span>
          <span className={classes.Amount}>{record.amount}</span>
          <span className={classes.Ratio}>{ratio}%</span>
          <div>
            <Progress
              percent={bar}
              position={'normal'}
              barStyle={{ borderColor: '#ffda44' }}
              unfilled={false}
            />
          </div>
          <span className={classes.Date}>{record.date}</span>
        </div>
      </div>
    </List.Item>
  )
}

export default withRouter(RecordItem)
