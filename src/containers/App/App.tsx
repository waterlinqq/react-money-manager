import React, { Component } from 'react'
import { Route, Switch, BrowserRouter, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import { getRecord } from 'store/record/actions'
import { getReminder } from 'store/reminder/actions'
import LogRecord from '../LogRecord/LogRecord'
import Main from '../Main/Main'
import Detail from '../Detail/Detail'
import Overview from '../Overview/Overview'
import Setting from '../Setting/Setting'
import Remind from '../Remind/Remind'
import CategoryView from '../CategoryView/CategoryView'
import Start from './Start/Start'
import ReminderTimer from './ReminderTimer/ReminderTimer'
import { listenAuth } from 'utils/auth'

import './App.scss'
const ANIMATION_MAP = {
  PUSH: 'forward',
  POP: 'back',
}
const Routes = withRouter(({ location, history }) => (
  <TransitionGroup
    childFactory={(child) =>
      React.cloneElement(child, {
        classNames: ANIMATION_MAP[history.action as 'PUSH' | 'POP'],
      })
    }
  >
    <CSSTransition timeout={400} classNames={'fade'} key={location.pathname}>
      <Switch location={location}>
        <Route path="/log/:key" component={LogRecord} />
        <Route path="/log/" component={LogRecord} />
        <Route path="/overview/:type" component={Overview} />
        <Route path="/remind/" component={Remind} />
        <Route path="/setting/" component={Setting} />
        <Route path="/category-view/" component={CategoryView} />
        <Route path="/detail/:key" component={Detail} />
        <Route path="/" component={Main} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
))

interface IProps {
  getRecord: typeof getRecord
  getReminder: typeof getReminder
}

class App extends Component<IProps> {
  public componentDidMount() {
    listenAuth()
    this.props.getRecord(new Date())
    this.props.getReminder()
  }
  public render() {
    console.count('render app')
    return (
      <div>
        <Start />
        <ReminderTimer />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(() => ({}), {
  getRecord,
  getReminder,
})(App)
