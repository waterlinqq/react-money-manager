import React, { Component, createRef } from 'react'
import moment from 'moment'
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

import { Spending, IFbRecords, IFbRecord, IRecord } from 'typings.js'

import classes from './CategoryView.module.scss'

interface IProps extends RouteComponentProps {
  type: Spending
  category: string
  records: IFbRecords
  month: Date
  monthSet: typeof monthSet
}
class Overview extends Component<IProps> {
  public canvas = createRef<HTMLCanvasElement>()
  public sortedRecords: Array<[string, IRecord]> = []
  public proxyRecords = {} as ReturnType<typeof proxyR>
  public shouldComponentUpdate(nextProps: IProps) {
    return nextProps.records !== this.props.records
  }
  private getAmountIndexedByDate(records: IFbRecords): { [d: number]: number } {
    const monthArr = Array(moment(this.props.month).daysInMonth() + 1).fill(0)
    const monthAmountArr = Object.entries(records).reduce(
      (arr, [key, record]) => {
        const day = moment(record.date).date()
        arr[day] += record.amount
        return arr
      },
      monthArr
    )
    const amountIndexedByDate = { ...monthAmountArr }
    delete amountIndexedByDate[1]
    return amountIndexedByDate
  }
  public render() {
    const { records, history, month, monthSet } = this.props
    const query = new URLSearchParams(this.props.location.search)
    const type = query.get('type') as Spending
    const category = query.get('category') as string
    const categoryRecords = {} as IFbRecords
    for (const [key, record] of Object.entries(records)) {
      if (record.category === category) {
        categoryRecords[key] = record
      }
    }
    const proxyRecords = (this.proxyRecords = proxyR(categoryRecords))
    const showRecords =
      proxyRecords[type === 'benefit' ? 'benefitRecords' : 'costRecords']
    const showTotal =
      proxyRecords[type === 'benefit' ? 'benefitTotal' : 'costTotal']

    this.sortedRecords = Object.entries(showRecords).sort(
      (a, b) => b[1].amount - a[1].amount
    )
    return (
      <div className={classes.CategoryView}>
        <Navbar
          leftIcon={<Icon type="left" onClick={() => history.go(-1)} />}
          mainItem={<MonthSelect month={month} monthChanged={monthSet} />}
        />
        <WhiteSpace />
        <WingBlank>
          <Chart
            monthData={this.getAmountIndexedByDate(showRecords)}
            total={showTotal}
          />
          <RecortList
            type={type}
            records={this.sortedRecords}
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
