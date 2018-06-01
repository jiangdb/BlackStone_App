export const weChatLoginFail = error => ({
  type: 'WECHAT_LOGIN_FAIL',
  error
});

export const weChatStateChange = info => ({
  type: 'WECHAT_STATE_CHANGE',
  info
});

export const weChatLogout = () => ({
  type: 'WECHAT_LOGOUT'
});

import { validateToken, getUserInfo } from '../services/wechatService.js'
import { updateUserInfo } from '../services/webService.js'

export function getAndUpdateUserInfo() {
  return function(dispatch) {
    validateToken(dispatch, getUserInfo(dispatch))
      .then((responseData) => updateUserInfo(dispatch, responseData))
      .catch(err => console.log('getAndUpdateUserInfoErr:' + err.message))
  }
}