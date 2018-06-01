const initialState = {
  token: null,
  expireAt: null,
  refreshExpireAt: null
}
 
import type { Action } from "../actions/types";

function webServer(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "WEB_SERVER_STATE_CHANGE":
      return Object.assign({}, state, action.info)

    case "WECHAT_LOGOUT":
      return Object.assign({}, state, initialState)

    default:
      return state;
  }
}

module.exports = webServer;
