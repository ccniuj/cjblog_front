import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'

export function list(state = [], action) {
  switch (action.type) {
    case types.GET_ARTICLES_LIST_SUCCESS:
      return Object.assign([], action.data)
    default:
      return state
  }
}

export function form(state = {}, action) {
  switch (action.type) {
    case types.GET_ARTICLES_SHOW_FORM_SUCCESS:
      return Object.assign({}, action.data, { type: 'show' })
    case types.SUBMIT_ARTICLES_FORM_SUCCESS:
      return state
    default:
      return state
  }
}

export default combineReducers({
  list,
  form
})
