const initialState = {
  userInfo: null,
  expireAt: null,
  accessToken: null,
  refreshToken: null,
} 
import type { Action } from "../actions/types";

function weChat(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  } 
  switch (action.type) {

    case "WECHAT_LOGIN_FAIL":
      return Object.assign({}, state, {
        error: action.error
      })

    case "WECHAT_STATE_CHANGE":
      return Object.assign({}, state, action.info)

    case "WECHAT_LOGOUT":
      return Object.assign({}, state, initialState)
    console.log(state)


    default:
      return state;
  }
}

module.exports = weChat;