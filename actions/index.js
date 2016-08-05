import * as types from '../constants/ActionTypes'
import { browserHistory } from 'react-router'
import request from 'superagent'
import config from '../config'

export function serverRender() {
  return {
    type: types.SET_SERVER_RENDER_FLAG_TRUE
  }
}

export function clientRender() {
  return {
    type: types.SET_SERVER_RENDER_FLAG_FALSE
  }
}
