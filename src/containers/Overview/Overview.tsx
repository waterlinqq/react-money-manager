import React, { Component, createRef } from 'react'
import { WingBlank, WhiteSpace, Icon } from 'antd-mobile'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import MonthSelect from 'components/MonthSelect/MonthSelect'
import Navbar from 'components/UI/Navbar/Navbar'
import Chart from './Chart/Chart'
import RecortList from './RecordList/RecordList'
import { setMonth } from 'store/month/actions'
import { AppState } from 'store'
import { proxyR } from 'utils/other'

import classes from './Overview.module.scss'

import { Spending, IFbRecords } from 'typings.js'

interface IProps {
  type: Spending
  records: IFbRecords
  month: Date
  setMonth: typeof setMonth
}
class Overview extends Component<
  RouteComponentProps<{ type: Spending }> & IProps
> {
  public canvas = createRef<HTMLCanvasElement>()
  public sortedCategories: Array<[string, number]> = []
  public proxyRecords = {} as ReturnType<typeof proxyR>
  public shouldComponentUpdate(nextProps: IProps) {
    return nextProps.records !== this.props.records
  }
  public render() {
    const { type } = this.props.match.params
    const { records, history, month, setMonth } = this.props
    const proxyRecords = (this.proxyRecords = proxyR(records))
    const showRecords =
      proxyRecords[type === 'benefit' ? 'benefitRecords' : 'costRecords']
    const showTotal =
      proxyRecords[type === 'benefit' ? 'benefitTotal' : 'costTotal']

    const categoriesMap = Object.values(showRecords).reduce((obj, record) => {
      const cate = record.category
      if (!obj[cate]) {
        obj[cate] = 0
      }
      obj[cate] += record.amount
      return obj
    }, {} as { [c: string]: number })

    this.sortedCategories = Object.entries(categoriesMap).sort(
      (a, b) => b[1] - a[1]
    )

    return (
      <div className={classes.Overview}>
        <Navbar
          leftIcon={<Icon type="left" onClick={() => history.go(-1)} />}
          mainItem={<MonthSelect month={month} monthChanged={setMonth} />}
        />
        <WhiteSpace />
        <WingBlank>
          <Chart
            type={type}
            categories={this.sortedCategories}
            total={showTotal}
          />
          <RecortList
            type={type}
            categories={this.sortedCategories}
            total={showTotal}
          />
        </WingBlank>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  records: state.records,
  month: state.month,
})
export default withRouter(connect(mapStateToProps, { setMonth })(Overview))
