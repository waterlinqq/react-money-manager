import React, { useState, FC } from 'react'
import classes from './TypeSelect.module.scss'

import { trans } from 'utils/other'
import { Spending } from 'typings'

interface IOptionProps {
  text: string
  clicked(): void
  active: boolean
}

const Option: FC<IOptionProps> = ({ text, clicked, active }) => {
  const classNames = [classes.Option]
  if (active) {
    classNames.push(classes.Active)
  }
  return (
    <div className={classNames.join(' ')} onClick={clicked}>
      {text}
    </div>
  )
}
interface IProps {
  type: Spending
  changed(type: Spending): void
}
const TypeSelect: FC<IProps> = ({ changed, type }) => {
  const [isShow, setIsShow] = useState(false)
  const clickHandlerWith = (changeType: Spending) => () => {
    if (changeType !== type) {
      changed(changeType)
    }
    setIsShow(false)
  }

  return (
    <div className={classes.TypeSelect}>
      <div
        className={classes.Mask}
        style={{ display: isShow ? 'block' : 'none' }}
        onClick={() => setIsShow(false)}
      />
      <div className={classes.Main} onClick={() => setIsShow(!isShow)}>
        <span>{trans(type)}</span>
        <span className={classes.dropdown} />
      </div>
      <div
        className={classes.Pop}
        style={{ display: isShow ? 'block' : 'none' }}
      >
        <Option
          text="支出"
          active={type === 'cost'}
          clicked={clickHandlerWith('cost')}
        />
        <Option
          text="收益"
          active={type === 'benefit'}
          clicked={clickHandlerWith('benefit')}
        />
      </div>
    </div>
  )
}
export default TypeSelect
