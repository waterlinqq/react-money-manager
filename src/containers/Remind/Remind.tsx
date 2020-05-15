import React, { Component } from 'react'
import momnet, { Moment } from 'moment'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { Icon, List, Switch } from 'antd-mobile'
import { TimePicker } from 'antd'

import Navbar from 'components/UI/Navbar/Navbar'
import CustomIcon from 'components/UI/CustomIcon/CustomIcon'
import { AppState } from 'store'
import { delReminder, modReminder, addReminder } from 'store/reminder/actions'

import 'antd/es/time-picker/style/css'
import { IFbReminders } from 'typings'

const Item = List.Item

interface IProps {
  delReminder: typeof delReminder
  modReminder: typeof modReminder
  addReminder: typeof addReminder
  reminders: IFbReminders
}

class Remind extends Component<RouteComponentProps & IProps> {
  public state = {
    isOpen: false,
    value: momnet(),
  }
  public pickerChangeHandler = (value: Moment | null) => {
    if (value) {
      this.props.addReminder(value.format('HH:mm'))
    }
    this.setState({
      isOpen: false,
      value,
    })
  }
  public timeChangerHandler = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const time = e.target.value
    if (time === '') {
      this.props.delReminder(key)
    }
    this.props.modReminder(key, { time })
  }
  public clickAddHandler = () => {
    // to avoid repeated trigger open when click Ok button
    if (this.state.isOpen) {
      return
    }
    this.setState({ isOpen: true })
  }
  public componentDidMount() {
    if (typeof Notification === 'undefined') {
      alert('該瀏覽器不支持推播')
      return
    }
    if (Notification.permission !== 'granted') {
      Notification.requestPermission()
    }
    // ServiceWorkerRegistration.showNotification('記得記帳喔!!')
    // const notice = new Notification('記得記帳喔!!')
    // notice.onshow = () => setTimeout(() => notice.close(), 5000)
  }
  public render() {
    const { value, isOpen } = this.state
    const { reminders, delReminder, modReminder } = this.props
    const go = this.props.history.go

    return (
      <div className="Setting">
        <Navbar
          leftIcon={<Icon type={'left'} onClick={() => go(-1)} />}
          mainItem={<h3>智能提醒</h3>}
        />
        <List>
          {Object.entries(reminders).map(([key, reminder]) => (
            <Item
              key={key}
              thumb={<Icon type="cross" onClick={() => delReminder(key)} />}
              extra={
                <Switch
                  checked={reminder.on}
                  onChange={(on) => modReminder(key, { on })}
                />
              }
            >
              <input
                type="time"
                value={reminder.time}
                onChange={this.timeChangerHandler(key)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
              />
            </Item>
          ))}
          <Item
            thumb={<CustomIcon type={require('images/icons/交通.svg')} />}
            onClick={this.clickAddHandler}
          >
            <span>創建提醒 </span>
            <TimePicker
              value={value}
              onChange={this.pickerChangeHandler}
              open={isOpen}
              format={'HH:mm'}
            />
          </Item>
        </List>
      </div>
    )
  }
}
const mapStateToProps = (state: AppState) => ({ reminders: state.reminders })
export default withRouter(
  connect(mapStateToProps, { delReminder, modReminder, addReminder })(Remind)
)
