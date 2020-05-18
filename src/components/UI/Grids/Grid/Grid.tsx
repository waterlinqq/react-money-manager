import React, { FC } from 'react'
import classes from './Grid.module.scss'
import { Spending } from 'typings'
interface IProps {
  category: string
  type: Spending
  clicked(cate: string): void
}
const Grid: FC<IProps> = ({ category, type, clicked }) => {
  return (
    <div className={classes.Grid} onClick={() => clicked(category)}>
      {/* <img src={url} alt={text} /> */}
      <div className={`${type}-img ${category}`} />
      <span>{category}</span>
    </div>
  )
}

export default Grid
