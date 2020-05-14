import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Icon, List } from 'antd-mobile'
import { connect } from 'react-redux'

import Navbar from 'components/UI/Navbar/Navbar'
import { AppState } from 'store'
import { IFbReminders } from 'typings'

const Item = List.Item
const Brief = Item.Brief

interface IProps {
  reminders: IFbReminders
}

class Setting extends Component<RouteComponentProps & IProps> {
  private getReminderTimes = () => {
    return Object.values(this.props.reminders)
      .filter((item) => item.on)
      .map((item) => item.time)
      .join('、')
  }
  public render() {
    const history = this.props.history
    const times = this.getReminderTimes()
    return (
      <div>
        <Navbar
          leftIcon={<Icon type={'left'} onClick={() => history.go(-1)} />}
          mainItem={<h3>設置</h3>}
        />
        <List>
          <Item
            arrow="horizontal"
            multipleLine={true}
            onClick={() => history.push('remind')}
          >
            智能提醒 <Brief>在以下時間提醒 {times}</Brief>
          </Item>
        </List>
      </div>
    )
  }
}
export default withRouter(
  connect((state: AppState) => ({ reminders: state.reminders }))(Setting)
)
