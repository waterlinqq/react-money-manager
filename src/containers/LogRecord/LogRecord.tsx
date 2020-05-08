import React, { Component } from 'react'

import Navbar from 'components/UI/Navbar/Navbar'
import Grids from 'components/UI/Grids/Grids'
import TypeSelect from 'components/TypeSelect/TypeSelect'
import Inputs from 'components/Inputs/Inputs'

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

interface IState {
  type: Spending
  amount: number
  mark: string
  category: any
}
class LogRecord extends Component<any, IState> {
  public state = {
    type: 'cost' as Spending,
    amount: 0,
    mark: '',
    category: '',
  }
  public changeTypeHandler = (changeType: Spending) =>
    this.setState({ type: changeType })
  public gridClickHandler = (category: string) => {
    this.setState({
      category,
    })
  }
  public amountChangeHandler = (amount: number) => this.setState({ amount })
  public markChangeHandler = (mark: string) => this.setState({ mark })
  public render() {
    const { type, amount, category, mark } = this.state
    const iconsWithImg: IIcon[] = icons
      .filter((item) => item.type === type)
      .map((item) => ({
        ...item,
        url: require(`../../../assets/images/icons/${item.text}.svg`),
      }))
    return (
      <div>
        <Navbar
          leftIcon={<h1>123</h1>}
          mainItem={<TypeSelect type={type} changed={this.changeTypeHandler} />}
        />
        <Grids icons={iconsWithImg} clicked={this.gridClickHandler} />
        <Inputs
          amount={amount}
          mark={mark}
          category={category}
          amountChanged={this.amountChangeHandler}
          markChanged={this.markChangeHandler}
        />
      </div>
    )
  }
}

export default LogRecord
