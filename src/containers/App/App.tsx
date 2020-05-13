import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { getRecord } from 'store/record/actions'
import LogRecord from '../LogRecord/LogRecord'
import Main from '../Main/Main'
import Detail from '../Detail/Detail'
import Overview from '../Overview/Overview'
import { AppState } from 'store'

interface IProps {
  getRecord: typeof getRecord
  month: Date
}
class App extends Component<IProps> {
  public componentDidMount() {
    this.props.getRecord(this.props.month)
  }
  public componentDidUpdate = this.componentDidMount
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/log/" component={LogRecord} />
          <Route path="/log/:key" component={LogRecord} />
          <Route path="/detail/:key" component={Detail} />
          <Route path="/overview/:type" component={Overview} />
          <Route path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state: AppState) => ({ month: state.month })
export default connect(mapStateToProps, {
  getRecord,
})(App)
