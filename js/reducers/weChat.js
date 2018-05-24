const initialState = {
  error: null,
  userInfo: null,
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

    case "WECHAT_LOGIN_SUCCESS":
      return Object.assign({}, state, {
        userInfo: action.userInfo
      })

    default:
      return state;
  }
}

module.exports = weChat;
