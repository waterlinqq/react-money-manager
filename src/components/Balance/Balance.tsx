import React, { useContext, FC } from 'react'
// import { navigate } from '@reach/router'
import { withRouter, Link } from 'react-router-dom'

import classes from './Balence.module.scss'

interface IProps {
  costTotal: number
  benefitTotal: number
  balance: number
}
const Balance: FC<IProps> = ({ costTotal, benefitTotal, balance }) => {
  const benefitClass = [classes.Benefit, classes.Number].join(' ')
  const costClass = [classes.Cost, classes.Number].join(' ')
  const balanceClass = [
    classes.Number,
    balance > 0 ? classes.Benefit : classes.Cost,
  ].join(' ')

  return (
    <div className={classes.Balance}>
      <Link to="/overview/income">
        <div className={classes.Block}>
          <span className={classes.Title}>收入</span>
          <span className={benefitClass}>{benefitTotal}</span>
        </div>
      </Link>
      <hr />
      <Link to="/overview/outgo">
        <div className={classes.Block}>
          <span className={classes.Title}>支出</span>
          <span className={costClass}>{costTotal}</span>
        </div>
      </Link>
      <hr />
      <div className={classes.Block}>
        <span className={classes.Title}>結餘</span>
        <span className={balanceClass}>{balance}</span>
      </div>
    </div>
  )
}

// export default withRouter(Balance)
export default Balance
