import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'antd-mobile'

import classes from './Edit.module.scss'
const Edit: FC<{ to: string }> = ({ to }) => {
  return (
    <Link to={to}>
      <div className={classes.Edit}>
        <Icon type={'ellipsis'} />
      </div>
    </Link>
  )
}
export default Edit
