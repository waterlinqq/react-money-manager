import React, { Component } from 'react'
import { WingBlank, NoticeBar, Icon, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'

import Balance from 'components/Balance/Balance'
import Add from 'components/Add/Add'
import Navbar from 'components/UI/Navbar/Navbar'
import MonthSelect from 'components/MonthSelect/MonthSelect'
import MonthRecord from 'components/MonthRecord/MonthRecord'
import { AppState } from 'store'
import { monthSet } from 'store/month/actions'

import classes from './Main.module.scss'

import { IRecord } from 'typings'

interface IState {
  isShowSidebar: boolean
}
interface IProps {
  records: IRecord[]
  month: Date
  monthSet: typeof monthSet
}
class Main extends Component<IProps, IState> {
  public state = {
    isShowSidebar: false,
  }
  public clickSidebarHandler = () => {
    this.setState({ isShowSidebar: !this.state.isShowSidebar })
  }
  public monthChangedHandler = (date: Date) => {
    this.props.monthSet(date)
  }
  public render() {
    const monthData = this.props.records
    return (
      <div className={classes.Main}>
        {/* <Sidebar isShowSidebar={isShowSidebar} setIsShowSidebar={setIsShowSidebar} /> */}
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
          <Balance costTotal={123} benefitTotal={21414} balance={123} />
          <WhiteSpace />
          <NoticeBar
            mode="closable"
            className={classes.Notice}
            icon={<Icon type="check-circle-o" size="xxs" />}
          >
            請儘快登入，避免丟失數據
          </NoticeBar>
          <WhiteSpace />
          <MonthRecord monthData={monthData} />
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
