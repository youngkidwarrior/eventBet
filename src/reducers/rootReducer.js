import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { drizzleReducers } from 'drizzle'
import authReducer from './authReducer';
import eventsReducer from  './eventsReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  authorize: authReducer,
  eventLog: eventsReducer,
  ...drizzleReducers
})

export default rootReducer
