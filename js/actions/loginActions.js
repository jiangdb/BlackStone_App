import { weChatLoginRequest, getUserInfo } from '../services/wechatService.js'
import { webServerLogin, updateUserInfo } from '../services/webService.js'

export function weChatLogin() {
  return function(dispatch) {
    weChatLoginRequest(dispatch)
      .then((openId) => webServerLogin(dispatch, openId))
      .then(() => getUserInfo(dispatch))
      // .then((userInfo) => updateUserInfo(dispatch, userInfo))
      .catch(err => console.log('weChatLoginErr:' + err.message))
  }
}