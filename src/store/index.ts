import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { recordReducer } from './record/reducers'
import { monthReducer } from './month/reducers'
import { userReducer } from './user/reducers'

const rootReducer = combineReducers({
  records: recordReducer,
  month: monthReducer,
  user: userReducer,
})

export type AppState = ReturnType<typeof rootReducer> &
  ReturnType<typeof monthReducer> &
  ReturnType<typeof userReducer>

const middlewares = [thunkMiddleware]
const middleWareEnhancer = applyMiddleware(...middlewares)

const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer))

export default store
