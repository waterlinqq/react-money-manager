import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { recordReducer } from './record/reducers'
import { monthReducer } from './month/reducers'
import { userReducer } from './user/reducers'
import { reminderReducer } from './reminder/reducers'

const rootReducer = combineReducers({
  records: recordReducer,
  month: monthReducer,
  user: userReducer,
  reminders: reminderReducer,
})

export type AppState = ReturnType<typeof rootReducer>

const middlewares = [thunkMiddleware]
const middleWareEnhancer = applyMiddleware(...middlewares)

const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer))

export default store
