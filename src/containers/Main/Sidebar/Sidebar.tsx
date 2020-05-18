import React, { useState, FC } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { List } from 'antd-mobile'
import { connect } from 'react-redux'

import Modal from 'components/UI/Modal/Modal'
import Mask from 'components/UI/Mask/Mask'
import Review from './Review/Review'
import About from './About/About'
import { login, logout } from 'utils/auth'
import { AppState } from 'store'
import { exportData } from './ExportData'

import classes from './Sidebar.module.scss'

import { IFbRecords, User } from 'typings'

const Item = List.Item

const path = (filename: string) =>
  require(`../../../images/system/${filename}.svg`)

interface IProps {
  show: boolean
  onLeft(): void
  records: IFbRecords
  user: User
}
const Sidebar: FC<IProps & RouteComponentProps> = ({
  show,
  onLeft,
  history,
  records,
  user,
}) => {
  const [ShowModal, setShowModal] = useState<JSX.Element | null>(null)
  const showModal = (modal: JSX.Element) => () => {
    setShowModal(modal)
    onLeft()
  }
  const listClassName = [classes.List]
    .concat(show ? classes.Active : '')
    .join(' ')
  return (
    <div className={classes.Sidebar}>
      <Modal show={!!ShowModal} onLeft={() => setShowModal(null)}>
        {ShowModal}
      </Modal>

      <div className={listClassName}>
        <div className={classes.Avatar} onClick={user ? logout : login}>
          <div>
            <img src={user?.photoURL || path('登入')} alt="" />
            <span>{user?.displayName || ''}</span>
          </div>
          <p className={classes.Log}>{user ? '登出' : '登入'}</p>
        </div>
        <List>
          <Item
            className={classes.Item}
            thumb={path('圖表')}
            onClick={() => history.push('/overview/income')}
          >
            <span>圖表</span>
          </Item>
          <hr />
          <Item
            className={classes.Item}
            thumb={path('類別')}
            onClick={() => history.push('/category')}
          >
            <span>類別</span>
          </Item>
          <Item
            className={classes.Item}
            thumb={path('導出')}
            onClick={() => exportData(records)}
          >
            <span>導出</span>
          </Item>
          <Item
            className={classes.Item}
            thumb={path('設置')}
            onClick={() => history.push('/setting')}
          >
            <span>設置</span>
          </Item>
          <Item
            className={classes.Item}
            thumb={path('評價我們')}
            onClick={showModal(<Review />)}
          >
            評價我們
          </Item>

          <Item
            className={classes.Item}
            onClick={showModal(<About />)}
            thumb={path('關於')}
          >
            <span>關於</span>
          </Item>
        </List>
      </div>

      <Mask show={show} clicked={onLeft} />
    </div>
  )
}
const mapStateToProps = (state: AppState) => ({
  records: state.records,
  user: state.user,
})
export default withRouter(connect(mapStateToProps)(Sidebar))
