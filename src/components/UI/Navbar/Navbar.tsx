import React, { FC, ComponentType } from 'react'

import classes from './Navbar.module.scss'
interface IProps {
  leftIcon?: ComponentType | JSX.Element
  mainItem?: ComponentType | JSX.Element
  rightIcon?: ComponentType | JSX.Element
}
const Navbar: FC<IProps> = ({ leftIcon, mainItem, rightIcon }) => {
  return (
    <div className={classes.Navbar}>
      <nav>
        {leftIcon || null}
        {mainItem || null}
        {rightIcon || null}
      </nav>
    </div>
  )
}

export default Navbar
