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
            dispatch({
              type: `GET_${resource.toUpperCase()}_LIST_SUCCESS`,
              data
            })
            resolve()
          } else {
            dispatch({
              type: `GET_${resource.toUpperCase()}_LIST_FAILURE`
            })
            reject(err)
          }
        })
    })
  }
}

export function getForm(type, resource, id='', cookie) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (type=='new') {
        dispatch({
          type: `GET_${resource.toUpperCase()}_${type.toUpperCase()}_FORM_SUCCESS`,
          resource
        })
      } else {
        dispatch({
          type: `GET_${resource.toUpperCase()}_${type.toUpperCase()}_FORM_REQUEST`
        })
        let headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
        if (cookie) {
          headers['cookie'] = cookie
        }
        request.
          get(`${config.domain}/${resource}/${id}.json`).
          withCredentials().
          set(headers).
          end((err, res) => {
            if (!err) {
              let data = JSON.parse(res.text)
              dispatch({
                type: `GET_${resource.toUpperCase()}_${type.toUpperCase()}_FORM_SUCCESS`,
                resource,
                data
              })
              resolve()
            } else {
              dispatch({
                type: `GET_${resource.toUpperCase()}_${type.toUpperCase()}_FORM_FAILURE`
              })
              reject(err)
            }
          })
      }
    })
  }
}
