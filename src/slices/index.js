import { combineReducers } from 'redux'

import apiReducer from './apiSlice'

const rootReducer = combineReducers({
  data: apiReducer,
})

export default rootReducer