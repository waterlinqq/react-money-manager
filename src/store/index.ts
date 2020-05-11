import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { recordReducer } from './record/reducers'
import { monthReducer } from './month/reducers'

const rootReducer = combineReducers({
  records: recordReducer,
  month: monthReducer,
})

export type AppState = ReturnType<typeof rootReducer> &
  ReturnType<typeof monthReducer>

export default function configureStore() {
  const middlewares = [thunkMiddleware]
  const middleWareEnhancer = applyMiddleware(...middlewares)

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  )

  return store
}
