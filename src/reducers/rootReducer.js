import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { drizzleReducers } from 'drizzle'
import authReducer from './authReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  authorize: authReducer,
  ...drizzleReducers
})

export default rootReducer
