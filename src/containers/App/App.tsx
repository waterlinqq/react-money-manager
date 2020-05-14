import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { getRecord } from 'store/record/actions'
import LogRecord from '../LogRecord/LogRecord'
import Main from '../Main/Main'
import Detail from '../Detail/Detail'
import Overview from '../Overview/Overview'
import Setting from '../Setting/Setting'
import Remind from '../Remind/Remind'
import { AppState } from 'store'
import { listenAuth } from 'utils/auth'
import { User } from 'typings'

interface IProps {
  getRecord: typeof getRecord
  month: Date
  user: User
}
class App extends Component<IProps> {
  public componentDidMount() {
    this.props.getRecord(this.props.month)
    listenAuth()
  }
  public componentDidUpdate() {
    this.props.getRecord(this.props.month)
  }
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/log/:key" component={LogRecord} />
          <Route path="/log/" component={LogRecord} />
          <Route path="/detail/:key" component={Detail} />
          <Route path="/overview/:type" component={Overview} />
          <Route path="/remind/" component={Remind} />
          <Route path="/setting/" component={Setting} />
          <Route path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  month: state.month,
  user: state.user,
})
export default connect(mapStateToProps, {
  getRecord,
})(App)
