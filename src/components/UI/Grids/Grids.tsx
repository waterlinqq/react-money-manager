import React, { FC } from 'react'

import Grid from './Grid/Grid'
import { IIcon } from 'typings'

import classes from './Grids.module.scss'
interface IProps {
  icons: IIcon[]
  clicked(cate: string): void
}
const Grids: FC<IProps> = ({ icons, clicked }) => {
  return (
    <div className={classes.Grids}>
      {icons.map((icon, i) => {
        return (
          <Grid key={i} text={icon.text} url={icon.url} clicked={clicked} />
        )
      })}
    </div>
  )
}

export default Grids
