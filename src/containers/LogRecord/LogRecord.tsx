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

const icons: Array<Omit<IIcon, 'url'>> = [
  { type: 'cost', text: '食物' },
  { type: 'cost', text: '交通' },
  { type: 'cost', text: '購物' },
  { type: 'cost', text: '電話' },
  { type: 'cost', text: '住宿' },
  { type: 'cost', text: '醫療' },
  { type: 'cost', text: '寵物' },
  { type: 'benefit', text: '寵物' },
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
    const iconsWithImg: IIcon[] = icons
      .filter((item) => item.type === type)
      .map((item) => ({
        ...item,
        url: require(`images/icons/${item.text}.svg`),
      }))
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
        <Grids icons={iconsWithImg} clicked={this.gridClickHandler} />
        <Inputs
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
