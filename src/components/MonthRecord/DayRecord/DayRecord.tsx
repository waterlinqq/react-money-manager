import React, { FC } from 'react'
import dayjs from 'dayjs'
import { List } from 'antd-mobile'
import { Link } from 'react-router-dom'

import classes from './DayRecord.module.scss'
import { IRecord } from 'typings'

interface IProps {
  dayData: IRecord[]
}

const Item = List.Item
const DayRecord: FC<IProps> = ({ dayData }) => {
  const [{ date }] = dayData
  const { cost, benefit } = dayData.reduce(
    (accu, item) => {
      accu[item.type] += item.amount
      return accu
    },
    { cost: 0, benefit: 0 }
  )
  const day =
    '週' + ['日', '一', '二', '三', '四', '五', '六'][dayjs(date).day()]
  const formatDate = dayjs(date).format('MM/DD')
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
        {dayData.map((item) => (
          <Link key={item.id} to={`/detail/${item.id}`}>
            <Item
              thumb={require(`images/icons/${item.category}.svg`)}
              extra={(item.type === 'cost' ? '-' : '') + item.amount}
            >
              {item.category}
            </Item>
          </Link>
        ))}
      </List>
    </div>
  )
}
export default DayRecord
