import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './firebase.ts'

import App from 'containers/App/App'
import store from 'store'

import './scss/index.scss'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
