import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import articles from './articles'
import * as types from '../constants/ActionTypes'

function serverRender(state=false, action) {
  switch (action.type) {
    case types.SET_SERVER_RENDER_FLAG_TRUE:
      return true
    case types.SET_SERVER_RENDER_FLAG_FALSE:
      return false
    default:
      return state
  }
}

export default combineReducers({
  articles,
  serverRender,
  routing
})
