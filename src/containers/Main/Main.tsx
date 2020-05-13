import React, { Component } from 'react'
import { WingBlank, NoticeBar, Icon, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'

import Balance from './Balance/Balance'
import Add from 'components/Add/Add'
import Navbar from 'components/UI/Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'
import MonthSelect from 'components/MonthSelect/MonthSelect'
import MonthRecord from 'components/MonthRecord/MonthRecord'
import { AppState } from 'store'
import { monthSet } from 'store/month/actions'
import { proxyR } from 'utils/other'

import classes from './Main.module.scss'

import { IFbRecords } from 'typings'

interface IState {
  isShowSidebar: boolean
}
interface IProps {
  records: IFbRecords
  month: Date
  monthSet: typeof monthSet
}
class Main extends Component<IProps, IState> {
  public state = {
    isShowSidebar: false,
  }
  public leftSidebarHandler = () => {
    this.setState({ isShowSidebar: false })
  }
  public clickSidebarHandler = () => {
    this.setState({ isShowSidebar: !this.state.isShowSidebar })
  }
  public monthChangedHandler = (date: Date) => {
    this.props.monthSet(date)
  }
  public render() {
    const { records } = this.props
    const proxyRecords = proxyR(records)
    return (
      <div className={classes.Main}>
        <Sidebar
          show={this.state.isShowSidebar}
          onLeft={this.leftSidebarHandler}
        />
        <Navbar
          leftIcon={<Icon type="ellipsis" onClick={this.clickSidebarHandler} />}
          mainItem={
            <MonthSelect
              month={this.props.month}
              monthChanged={this.monthChangedHandler}
            />
          }
        />
        <WingBlank>
          <WhiteSpace />
          <Balance
            costTotal={proxyRecords.costTotal}
            benefitTotal={proxyRecords.benefitTotal}
            balance={proxyRecords.balance}
          />
          <WhiteSpace />
          <NoticeBar
            mode="closable"
            className={classes.Notice}
            icon={<Icon type="check-circle-o" size="xxs" />}
          >
            請儘快登入，避免丟失數據
          </NoticeBar>
          <WhiteSpace />
          <MonthRecord monthData={records} />
        </WingBlank>
        <Add />
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  records: state.records,
  month: state.month,
})

export default connect(mapStateToProps, { monthSet })(Main)
