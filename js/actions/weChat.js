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

import { shareToSession, shareToTimeline } from '../services/wechatService.js'
import { validateWebToken, storeWork, checkUpgrade } from '../services/webService.js'


// export function getAndUpdateUserInfo() {
//   return function(dispatch) {
//     validateToken(dispatch, getUserInfo(dispatch))
//       .then((responseData) => updateUserInfo(dispatch, responseData))
//       .catch(err => console.log('getAndUpdateUserInfoErr:' + err.message))
//   }
// }

export function weChatShareToSession(work, index) {
  let shareUrl = work.shareUrl
  return function(dispatch) {
    if (shareUrl == null) {
      validateWebToken(dispatch, storeWork, work, index)
        .then(res => shareToSession(res))
        .catch(err => {
          console.log('weChatShareToSessionErr:' + err.message)
        })
    } else {
      shareToSession(shareUrl)
    }
  }
}

export function weChatShareToTimeline(work, index) {
  let shareUrl = work.shareUrl
  return function(dispatch) {
    if (shareUrl == null) {
      validateWebToken(dispatch, storeWork, work, index)
        .then(res => shareToTimeline(res))
        .catch(err => {
          console.log('weChatShareToSessionErr:' + err.message)
        })
    } else {
      shareToSession(shareUrl)
    }
  }
}