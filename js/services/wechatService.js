import fetch from 'cross-fetch';
import * as wechat from 'react-native-wechat';
import Storage from 'react-native-storage';
import { Alert, AsyncStorage } from 'react-native';
import { weChatStateChange } from '../actions/weChat.js'
import { saveShareUrl } from '../actions/saveRecord.js'

const appId = 'wx0d8e7be20d93a1af';
const secretId = '9fc24f0f0b2fa323762763cb23bf10b7';
let HOST = "https://bs.ziipoo.com.cn/api/v2"
let API_USER_UPDATE = "/user/update"
let API_USER_LOGIN = "/user/login"

let scope = 'snsapi_userinfo'
let state = 'wechat_sdk_demo'
let storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24 * 30, //30 days
  enableCache: true,
})

export function weChatLoginRequest(dispatch) {
  wechat.registerApp(appId)
  //判断微信是否安装
  return wechat.isWXAppInstalled()
    .then((isInstalled) => {
      if (isInstalled) {
        return wechat.sendAuthRequest(scope, state)
          .then(responseCode => {
            //返回code码，通过code获取access_token
            let AccessTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appId + '&secret=' + secretId + '&code=' + responseCode.code + '&grant_type=authorization_code';

            return fetch(AccessTokenUrl, {
              method: 'GET',
              timeout: 2000,
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
            })
          })
          .then((response) => response.json())
          .then((responseData) => {
            storage.save({
              key: 'weChatState',
              data: {
                accessToken: responseData.access_token,
                expireAt: Math.floor(Date.now() / 1000) + responseData.expires_in,
                refreshToken: responseData.refresh_token,
                openId: responseData.openid
              }
            })

            dispatch(weChatStateChange({
              accessToken: responseData.access_token,
              expireAt: Math.floor(Date.now() / 1000) + responseData.expires_in,
              refreshToken: responseData.refresh_token,
            }))
            return Promise.resolve(responseData.openid);
          })
          .catch(err => {
            console.log('weChatLoginRequestErr:' + err.message)
          })
      } else {
        Alert.alert('没有安装微信', '请先安装微信客户端再进行登录', [
          { text: '确定' }
        ])
        return Promise.reject(new Error('WXApp is not Installed'));
      }
    })
}

//获取user_info
export function getUserInfo(dispatch) {
  return storage.load({
      key: 'weChatState',
    })
    .then(state => {
      let getUserInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + state.accessToken + '&openid=' + state.openId;

      return fetch(getUserInfoUrl, {
          method: 'GET',
          timeout: 2000,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        })
        .then((response) => response.json())
        .then((responseData) => {
          storage.save({
            key: 'userInfo',
            data: {
              userInfo: responseData,
            }
          })
          dispatch(weChatStateChange({ userInfo: responseData }))
          return Promise.resolve(responseData);
          console.log('getUserInfo: success')
        })
        .catch(err => {
          console.log('getUserInfoErr:' + err.message)
        })
    })

}

export function refreshAccessToken(dispatch) {
  return storage.load({
      key: 'weChatState',
    })
    .then(state => {
      let refreshTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=' + appId + '&grant_type=refresh_token&refresh_token=' + state.refreshToken

      return fetch(refreshTokenUrl, {
          method: 'GET',
          timeout: 2000,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        })
        .then((response) => response.json())
        .then((responseData) => {
          storage.save({
            key: 'weChatState',
            data: {
              accessToken: responseData.access_token,
              expireAt: Math.floor(Date.now() / 1000) + responseData.expires_in,
              refreshToken: responseData.refresh_token,
              openId: responseData.openid
            }
          })
          dispatch(weChatStateChange({
            accessToken: responseData.access_token,
            expireAt: Math.floor(Date.now() / 1000) + responseData.expires_in,
            refreshToken: responseData.refresh_token,
          }))
          console.log('refreshAccessToken: success')
        })
        .catch(err => {
          console.log('refreshAccessTokenErr:' + err.message)
        })
    })
}

export function validateToken(dispatch, callback) {
  return storage.load({
      key: 'weChatState',
    })
    .then(state => {
      let now = Math.floor(Date.now() / 1000)
      if (now > state.expireqAt) { refreshAccessToken(dispatch) }
      return callback
    })
}

export function shareToSession(shareUrl) {
  wechat.registerApp(appId)
  return wechat.shareToSession({
      type: 'news',
      title: 'web page',
      description: 'share web page to session',
      thumbImage: 'http://thirdwx.qlogo.cn/mmopen/vi_32/UAsGAa5kruXicNFukE9dYuricROuumKR00HuFvVGSb4CUd03U21m50icOOCLVicAjaXb4yJYIXyUGMBG8OzbtwGmuQ/132',
      webpageUrl: shareUrl
    })
    .catch(err => {
      console.log('shareToSessionErr:' + err.message)
    })
}

export function shareToTimeline(shareUrl) {
  wechat.registerApp(appId)
  return wechat.shareToTimeline({
      type: 'news',
      title: 'web page',
      description: 'share web page to time line',
      thumbImage: 'http://thirdwx.qlogo.cn/mmopen/vi_32/UAsGAa5kruXicNFukE9dYuricROuumKR00HuFvVGSb4CUd03U21m50icOOCLVicAjaXb4yJYIXyUGMBG8OzbtwGmuQ/132',
      webpageUrl: shareUrl
    })
    .catch(err => {
      console.log('shareToTimelineErr:' + err.message)
    })
}