import React, { FC } from 'react'
import { List, Progress } from 'antd-mobile'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { Spending } from 'typings'

import classes from './RecordItem.module.scss'

interface IProps {
  category: string
  amount: number
  ratio: number
  bar: number
  type: Spending
}
const RecordItem: FC<RouteComponentProps & IProps> = ({
  category,
  amount,
  ratio,
  bar,
  history,
  type,
}) => {
  return (
    <List.Item
      style={{ padding: '0px' }}
      onClick={() =>
        history.push(`/category-view/?type=${type}&category=${category}`)
      }
    >
      <div className={classes.Wrapper}>
        <div data-img className={`${type}-img ${category}`} />
        <div className={classes.Info}>
          <span className={classes.Title}>{category}</span>
          <span className={classes.Amount}>{amount}</span>
          <span className={classes.Ratio}>{ratio}%</span>
          <div>
            <Progress
              percent={bar}
              position={'normal'}
              barStyle={{ borderColor: '#ffda44' }}
              unfilled={false}
            />
          </div>
        </div>
      </div>
    </List.Item>
  )
}

export default withRouter(RecordItem)
