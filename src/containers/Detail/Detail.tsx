import React, { Component } from 'react'
import { WingBlank, List, WhiteSpace, Icon } from 'antd-mobile'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import { delRecord } from 'store/record/actions'
import { reqGetRecord } from 'api'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import Edit from 'components/Edit/Edit'
import Navbar from 'components/UI/Navbar/Navbar'

import classes from './Detail.module.scss'

const Item = List.Item

interface IProps {
  delRecord: typeof delRecord
}
class Detail extends Component<RouteComponentProps<{ id: string }> & IProps> {
  public state = {
    id: '',
    type: '',
    amount: 0,
    category: '',
    date: '',
    isLoading: true,
  }
  public async componentDidMount() {
    const { id } = this.props.match.params
    const [record] = await reqGetRecord('id', id)
    this.setState({
      type: record.type,
      amount: record.amount,
      category: record.category,
      date: record.date,
      isLoading: false,
    })
  }
  public deleteHandler = () => {
    if (!window.confirm('確定要刪除嗎')) {
      return
    }

    this.props.delRecord(this.state.id)
    this.props.history.go(-1)
  }
  public render() {
    if (this.state.isLoading) {
      return null
    }
    const { category, date, amount, type, id } = this.state
    const { go } = this.props.history
    const day =
      '週' + ['日', '一', '二', '三', '四', '五', '六'][dayjs(date).day()]
    return (
      <div className={classes.Detail}>
        <Navbar
          leftIcon={<Icon type={'left'} onClick={() => go(-1)} />}
          mainItem={<span>詳情</span>}
          rightIcon={
            <img
              src={require(`images/system/刪除.svg`)}
              alt="刪除"
              onClick={this.deleteHandler}
            />
          }
        />
        <WhiteSpace />
        <WingBlank>
          <div className={classes.Content}>
            <header>
              <img
                className={type === '支出' ? 'outgo-img' : 'income-img'}
                src={require(`images/icons/${category}.svg`)}
                alt={category}
              />
              <h2>{category}</h2>
            </header>
            <WhiteSpace />
            <List>
              <Item>
                <span className={classes.Title}>類別</span>
                <span className="content">{type}</span>
              </Item>
              <Item>
                <span className={classes.Title}>金額</span>
                <span className="content">{amount}</span>
              </Item>
              <Item>
                <span className={classes.Title}>日期</span>
                <span className="content">{`${date} ${day}`}</span>
              </Item>
              <Item>
                <span className={classes.Title}>備註</span>
                <span className="content">{'mark'}</span>
              </Item>
            </List>
            <Edit to={'/log/' + id} />
          </div>
        </WingBlank>
      </div>
    )
  }
}

export default withRouter(connect(() => ({}), { delRecord })(Detail))
