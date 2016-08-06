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

export function getList(resource, cookie) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      if (cookie) {
        headers['cookie'] = cookie
      }
      request.
        get(`${config.domain}/${resource}.json`).
        withCredentials().
        set(headers).
        end((err, res) => {
          if (!err) {
            let data = JSON.parse(res.text)
            resolve({
              type: `GET_${resource.toUpperCase()}_LIST_SUCCESS`,
              data
            })
          } else {
            reject(err)
          }
        })
    })
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response
}
