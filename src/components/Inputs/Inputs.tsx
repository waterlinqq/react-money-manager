import React, { useRef, useEffect, FC } from 'react'
import { InputItem } from 'antd-mobile'
import classes from './Inputs.module.scss'
import { Spending } from 'typings'

interface IProps {
  type: Spending
  category: string
  amount: number
  mark: string
  markChanged(v: string): any
  amountChanged(v: number): any
  submit(): void
}
const Inputs: FC<IProps> = ({
  type,
  category,
  amount,
  markChanged,
  mark,
  amountChanged,
  submit,
}) => {
  const numberInput = useRef(null)
  const focusNumberInput = () => {
    // Delay focus to prevent subsequent out-of-focus event triggered by clicking grid
    setTimeout(() => (numberInput.current as any).focus(), 100)
  }
  useEffect(focusNumberInput, [category])
  return (
    <div className={classes.Inputs}>
      {category ? (
        // data-img custom attribute is an attribute selector to scss file
        <div data-img className={`${type}-img ${category} `} />
      ) : null}
      <div className={classes.Input}>
        <InputItem
          type={'text'}
          onChange={markChanged}
          onBlur={focusNumberInput}
          value={mark}
          placeholder="備註"
        />
      </div>
      <div className={classes.Input}>
        <InputItem
          ref={numberInput}
          type={'money'}
          onChange={(val) => amountChanged(Number(val))}
          onVirtualKeyboardConfirm={submit}
          value={String(amount)}
        />
      </div>
    </div>
  )
}

export default Inputs
