import React, { FC } from 'react'
import { List, Progress } from 'antd-mobile'

import classes from './RecordItem.module.scss'

interface IProps {
  category: string
  amount: number
  ratio: number
  bar: number
}
const RecordItem: FC<IProps> = ({ category, amount, ratio, bar }) => {
  return (
    <List.Item style={{ padding: '0px' }}>
      <div className={classes.Wrapper}>
        <img src={require(`images/icons/${category}.svg`)} alt="" />
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

export default RecordItem
