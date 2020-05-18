import React, { FC } from 'react'

import Grid from './Grid/Grid'
import { IIcon, Spending } from 'typings'

import classes from './Grids.module.scss'
interface IProps {
  icons: IIcon[]
  type: Spending
  clicked(cate: string): void
}
const Grids: FC<IProps> = ({ icons, clicked, type }) => {
  return (
    <div className={classes.Grids}>
      {icons.map((icon, i) => {
        return (
          <Grid key={i} category={icon.text} type={type} clicked={clicked} />
        )
      })}
    </div>
  )
}

export default Grids
