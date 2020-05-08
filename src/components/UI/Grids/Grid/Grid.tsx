import React, { FC } from 'react'
import classes from './Grid.module.scss'
interface IProps {
  url: string
  text: string
  clicked(cate: string): void
}
const Grid: FC<IProps> = ({ url, text, clicked }) => {
  return (
    <div className={classes.Grid} onClick={() => clicked(text)}>
      <img src={url} alt={text} />
      <span>{text}</span>
    </div>
  )
}

export default Grid
