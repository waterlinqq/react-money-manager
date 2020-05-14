import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Icon, List } from 'antd-mobile'

import Navbar from 'components/UI/Navbar/Navbar'

const Item = List.Item
const Brief = Item.Brief
class Setting extends Component<RouteComponentProps> {
  public render() {
    const history = this.props.history

    return (
      <div className="Setting">
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
            智能提醒 <Brief>在以下時間提醒</Brief>
          </Item>
        </List>
      </div>
    )
  }
}
export default withRouter(Setting)
