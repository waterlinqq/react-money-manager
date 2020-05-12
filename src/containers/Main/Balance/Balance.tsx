import React, { FC } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import classes from './Balence.module.scss'

interface IProps {
  costTotal: number
  benefitTotal: number
  balance: number
}
const Balance: FC<IProps & RouteComponentProps> = ({
  costTotal,
  benefitTotal,
  balance,
  history,
}) => {
  const benefitClass = [classes.Benefit, classes.Number].join(' ')
  const costClass = [classes.Cost, classes.Number].join(' ')
  const balanceClass = [
    classes.Number,
    balance > 0 ? classes.Benefit : classes.Cost,
  ].join(' ')
  return (
    <div className={classes.Balance}>
      <div
        className={classes.Block}
        onClick={() => history.push('/overview/benefit')}
      >
        <span className={classes.Title}>收入</span>
        <span className={benefitClass}>{benefitTotal}</span>
      </div>
      <hr />
      <div
        className={classes.Block}
        onClick={() => history.push('/overview/cost')}
      >
        <span className={classes.Title}>支出</span>
        <span className={costClass}>{costTotal}</span>
      </div>
      <hr />
      <div className={classes.Block}>
        <span className={classes.Title}>結餘</span>
        <span className={balanceClass}>{balance}</span>
      </div>
    </div>
  )
}

export default withRouter(Balance)
