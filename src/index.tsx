import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './model/firebase'

import App from 'containers/App/App'
import configureStore from 'store'

import './scss/index.scss'

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
