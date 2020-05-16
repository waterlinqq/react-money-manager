import React, { FC } from 'react'
import { List, WhiteSpace } from 'antd-mobile'

import RecordItem from './RecordItem/RecordItem'
import { trans } from 'utils/other'

import classes from './RecordList.module.scss'

import { Spending } from 'typings'

interface IProps {
  categories: Array<[string, number]>
  total: number
  type: Spending
}
const RecordList: FC<IProps> = ({ categories, total, type }) => {
  return (
    <div className={classes.RecordList}>
      <span className={classes.Title}>{trans(type)}列表</span>
      <WhiteSpace />
      <List>
        {categories.map((item, i) => {
          const bar = +((item[1] / categories[0][1]) * 100).toFixed(1)
          const ratio = +((item[1] / total) * 100).toFixed(1)
          return (
            <RecordItem
              key={i}
              category={item[0]}
              amount={item[1]}
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
