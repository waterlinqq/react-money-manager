import React, { Component, createRef } from 'react'
import { WingBlank, WhiteSpace, Icon } from 'antd-mobile'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import MonthSelect from 'components/MonthSelect/MonthSelect'
import Navbar from 'components/UI/Navbar/Navbar'
import Chart from './Chart/Chart'
import RecortList from './RecordList/RecordList'
import { monthSet } from 'store/month/actions'
import { AppState } from 'store'
import { proxyR } from 'utils/other'

import { Spending, IDbRecord } from 'typings.js'

interface IProps {
  type: Spending
  records: IDbRecord[]
  month: Date
  monthSet: typeof monthSet
}
class Overview extends Component<
  RouteComponentProps<{ type: Spending }> & IProps
> {
  public canvas = createRef<HTMLCanvasElement>()
  public sortedCategories: Array<[string, number]> = []
  public proxyRecords = {} as ReturnType<typeof proxyR>

  public render() {
    const { type } = this.props.match.params
    const { records, history, month, monthSet } = this.props
    const proxyRecords = (this.proxyRecords = proxyR(records))
    const showRecords =
      proxyRecords[type === 'benefit' ? 'benefitRecords' : 'costRecords']
    const showTotal =
      proxyRecords[type === 'benefit' ? 'benefitTotal' : 'costTotal']

    const categoriesMap = showRecords.reduce((obj, item) => {
      const cate = item.category
      if (!obj[cate]) {
        obj[cate] = 0
      }
      obj[cate] += item.amount
      return obj
    }, {} as { [c: string]: number })

    this.sortedCategories = Object.entries(categoriesMap).sort(
      (a, b) => b[1] - a[1]
    )

    return (
      <div>
        <Navbar
          leftIcon={<Icon type="left" onClick={() => history.go(-1)} />}
          mainItem={<MonthSelect month={month} monthChanged={monthSet} />}
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
export default withRouter(connect(mapStateToProps, { monthSet })(Overview))
