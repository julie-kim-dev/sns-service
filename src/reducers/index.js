import { combineReducers } from 'redux'
import config from './config'
import layouts from './layouts'
import auth from './auth'

//각각의 리듀서가 createStore 넘길 수 있는 하나의 리듀싱 함수로 바꿔준다
const rootReducer = combineReducers({ 
  config,
  layouts,
  auth
})

export default rootReducer