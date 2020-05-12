import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { getRecord } from 'store/record/actions'
import LogRecord from '../LogRecord/LogRecord'
import Main from '../Main/Main'
import Detail from '../Detail/Detail'
import Overview from '../Overview/Overview'

interface IProps {
  getRecord: typeof getRecord
}
class App extends Component<IProps> {
  public componentWillMount() {
    this.props.getRecord()
  }
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/log/" component={LogRecord} />
          <Route path="/log/:id" component={LogRecord} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/overview/:type" component={Overview} />
          <Route path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default connect(() => ({}), {
  getRecord,
})(App)
