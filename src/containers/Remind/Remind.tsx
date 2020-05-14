import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Icon, List, Switch } from 'antd-mobile'
// import TimePicker from 'react-time-picker'
import { TimePicker } from 'antd'
import 'antd/es/time-picker/style/css'
import Navbar from 'components/UI/Navbar/Navbar'
import CustomIcon from 'components/UI/CustomIcon/CustomIcon'
import momnet, { Moment } from 'moment'

const Item = List.Item

class Remind extends Component<RouteComponentProps> {
  public state = {
    isOpen: false,
    value: momnet(),
  }
  public changeHandler = (value: Moment | null) => {
    this.setState({
      isOpen: false,
      value,
    })
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
    const go = this.props.history.go
    return (
      <div className="Setting">
        <Navbar
          leftIcon={<Icon type={'left'} onClick={() => go(-1)} />}
          mainItem={<h3>智能提醒</h3>}
        />
        <List>
          <Item
            thumb={<Icon type="cross" onClick={() => alert('刪除')} />}
            extra={<Switch />}
          >
            <input type="time" />
          </Item>
          <Item
            thumb={<CustomIcon type={require('images/icons/交通.svg')} />}
            onClick={this.clickAddHandler}
          >
            <span>創建提醒</span>
            <TimePicker
              value={value}
              onChange={this.changeHandler}
              open={isOpen}
            />
          </Item>
        </List>
      </div>
    )
  }
}
export default withRouter(Remind)
