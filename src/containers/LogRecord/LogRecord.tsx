import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Icon } from 'antd-mobile'
import moment from 'moment'

import Navbar from 'components/UI/Navbar/Navbar'
import Grids from 'components/UI/Grids/Grids'
import TypeSelect from 'components/TypeSelect/TypeSelect'
import Inputs from 'components/Inputs/Inputs'
import DateSelect from 'components/DateSelect/DateSelect'
import { addRecord, modRecord } from 'store/record/actions'
import API from 'api'

import classes from './LogRecord.module.scss'

import { IIcon, Spending } from 'typings'

const icons: IIcon[] = [
  { type: 'cost', text: '水電費' },
  { type: 'cost', text: '交通' },
  { type: 'cost', text: '家' },
  { type: 'cost', text: '車' },
  { type: 'cost', text: '娛樂' },
  { type: 'cost', text: '服裝' },
  { type: 'cost', text: '保險' },
  { type: 'cost', text: '税' },
  { type: 'cost', text: '電話費' },
  { type: 'cost', text: '香煙' },
  { type: 'cost', text: '健康' },
  { type: 'cost', text: '運動' },
  { type: 'cost', text: '孩子' },
  { type: 'cost', text: '寵物' },
  { type: 'cost', text: '美容' },
  { type: 'cost', text: '電子產品' },
  { type: 'cost', text: '漢堡包' },
  { type: 'cost', text: '酒類' },
  { type: 'cost', text: '蔬菜' },
  { type: 'cost', text: '小吃' },
  { type: 'cost', text: '禮品' },
  { type: 'cost', text: '社交' },
  { type: 'cost', text: '旅行' },
  { type: 'cost', text: '教育' },
  { type: 'cost', text: '水果' },
  { type: 'cost', text: '辦公' },
  { type: 'cost', text: '書' },
  { type: 'cost', text: '吧' },
  { type: 'cost', text: '購物' },
  { type: 'cost', text: '其他' },
  { type: 'cost', text: '餐飲' },
  { type: 'cost', text: '其他' },
  { type: 'benefit', text: '薪水' },
  { type: 'benefit', text: '獎金' },
  { type: 'benefit', text: '捐贈' },
  { type: 'benefit', text: '買賣' },
  { type: 'benefit', text: '出租' },
  { type: 'benefit', text: '退款' },
  { type: 'benefit', text: '優惠卷' },
  { type: 'benefit', text: '彩票' },
  { type: 'benefit', text: '股息' },
  { type: 'benefit', text: '投資' },
  { type: 'benefit', text: '其他' },
]
interface IProps {
  addRecord: typeof addRecord
  modRecord: typeof modRecord
}
interface IState {
  type: Spending
  amount: number
  mark: string
  category: any
  date: string
}
class LogRecord extends Component<
  RouteComponentProps<{ key?: string }> & IProps,
  IState
> {
  public state = {
    type: 'cost' as Spending,
    amount: 0,
    mark: '',
    category: '',
    date: moment().format('YYYY-MM-DD'),
  }
  public async componentWillMount() {
    const { key } = this.props.match.params
    if (key == null) {
      return
    }
    const records = await API.reqGetRecord(key)
    const record = records[key]
    this.setState({
      type: record.type as Spending,
      amount: record.amount,
      category: record.category,
      date: record.date,
      mark: record.mark,
    })
  }
  public gridClickHandler = (category: string) => {
    this.setState({
      category,
    })
  }
  public typeChangeHandler = (type: Spending) => this.setState({ type })
  public amountChangeHandler = (amount: number) => this.setState({ amount })
  public markChangeHandler = (mark: string) => this.setState({ mark })
  public dateChangeHandler = (date: string) => this.setState({ date })
  public submitHandler = async () => {
    const { type, amount, category, date, mark } = this.state
    const { key } = this.props.match.params
    const option = { type, amount, category, date, mark }
    if (category === '') {
      alert('請選擇類別')
      return
    }
    if (key != null) {
      await this.props.modRecord(key, option)
    } else {
      await this.props.addRecord(option)
    }
    this.props.history.go(-1)
  }
  public render() {
    const { type, amount, category, mark, date } = this.state
    const showIcons = icons.filter((item) => item.type === type)
    // const iconsWithImg: IIcon[] = icons
    //   .filter((item) => item.type === type)
    //   .map((item) => ({
    //     ...item,
    //     url: require(`images/icons/${item.text}.svg`),
    //   }))
    return (
      <div className={classes.LogRecord}>
        <Navbar
          leftIcon={
            <Icon type="left" onClick={() => this.props.history.go(-1)} />
          }
          mainItem={<TypeSelect type={type} changed={this.typeChangeHandler} />}
          rightIcon={
            <DateSelect date={date} dateChanged={this.dateChangeHandler} />
          }
        />
        <Grids type={type} icons={showIcons} clicked={this.gridClickHandler} />
        <Inputs
          type={type}
          amount={amount}
          mark={mark}
          category={category}
          amountChanged={this.amountChangeHandler}
          markChanged={this.markChangeHandler}
          submit={this.submitHandler}
        />
      </div>
    )
  }
}

export default withRouter(
  connect(() => ({}), { addRecord, modRecord })(LogRecord)
)
