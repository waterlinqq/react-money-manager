import React from 'react'
import { Link } from 'react-router-dom'

import classes from './Add.module.scss'
const Add = () => {
  return (
    <Link to="/log">
      <div className={classes.Add}>+</div>
    </Link>
  )
}
export default Add
