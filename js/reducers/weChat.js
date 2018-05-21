const initialState = {
  userInfo: { 
    openid: '',
    nickname: '用户名',
    sex: null,
    language: '',
    city: '',
    province: '',
    country: '',
    headimgurl: '',
    privilege: [],
    unionid: '' 
  },
}
 
import type { Action } from "../actions/types";

function weChat(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "SAVE_WECHAT_USER_INFO":
      return Object.assign({}, state, {
        userInfo: action.userInfo
      })

    default:
      return state;
  }
}

module.exports = weChat;
