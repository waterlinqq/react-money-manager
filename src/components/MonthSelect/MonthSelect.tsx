import React, { useState, FC } from 'react'
import { DatePickerView } from 'antd-mobile'
import moment from 'moment'

import classes from './MonthSelect.module.scss'

interface IProps {
  month: Date
  monthChanged(month: Date): void
}
const MonthSelect: FC<IProps> = ({ month, monthChanged }) => {
  const [val, setVal] = useState(month)
  const [isShow, setIsShow] = useState(false)
  const confirmHandler = () => {
    setIsShow(false)
    monthChanged(val)
  }
  const isHidden = { display: isShow ? 'block' : 'none' }
  return (
    <div className={classes.MonthSelect}>
      <div onClick={() => setIsShow(!isShow)}>
        <span>{moment(month).format('YYYY年M月')}</span>
        <span className={classes.Dropdown} />
      </div>
      <div className={classes.Mask} style={isHidden} onClick={confirmHandler} />
      <div className={classes.Monthpicker}>
        {isShow ? (
          <DatePickerView
            mode={'month'}
            value={val}
            onChange={(value) => setVal(value)}
          />
        ) : null}
      </div>
    </div>
  )
}

export default MonthSelect
