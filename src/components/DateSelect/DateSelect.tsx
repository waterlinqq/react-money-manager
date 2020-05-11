import React, { useState, FC } from 'react'
import { Calendar } from 'antd-mobile'
import dayjs from 'dayjs'

import classes from './DateSelect.module.scss'

interface IProps {
  date: string
  dateChanged: (date: string) => void
}
const DateSelect: FC<IProps> = ({ date, dateChanged }) => {
  const [isShow, setIsShow] = useState(false)
  const togglerHandler = (show: boolean) => () => setIsShow(show)
  const confirmHandler = (day?: Date) => {
    dateChanged(dayjs(day).format('YYYY-MM-DD'))
    setIsShow(false)
  }
  return (
    <div className={classes.DateSelect}>
      <div className={classes.Toggle} onClick={togglerHandler(true)}>
        <span>日期：{dayjs(date).format('MM/DD')}</span>
        <span className={classes.Dropdown} />
      </div>
      <Calendar
        visible={isShow}
        type={'one'}
        onCancel={togglerHandler(false)}
        onConfirm={confirmHandler}
        // onSelectHasDisableDate={this.onSelectHasDisableDate}
        // getDateExtra={this.getDateExtra}
        defaultTimeValue={new Date()}
      />
    </div>
  )
}

export default DateSelect
