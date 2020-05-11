import React, { useRef, useEffect, FC } from 'react'
import { InputItem } from 'antd-mobile'
import classes from './Inputs.module.scss'

interface IProps {
  category: string
  amount: number
  mark: string
  markChanged(v: string): any
  amountChanged(v: number): any
  submit(): void
}
const Inputs: FC<IProps> = ({
  category,
  amount,
  markChanged,
  mark,
  amountChanged,
  submit,
}) => {
  const numberInput = useRef(null)
  useEffect(() => {
    ;(numberInput.current as any).focus()
  }, [category])
  return (
    <div className={classes.Inputs}>
      {category ? (
        <img
          className={classes.Icon}
          src={require(`images/icons/${category}.svg`)}
          alt={category}
        />
      ) : null}
      <div className={classes.Input}>
        <InputItem
          type={'text'}
          onChange={markChanged}
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
