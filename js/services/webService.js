import fetch from 'cross-fetch';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import * as bleActions from '../actions/ble.js'
import { webServerStateChange } from '../actions/webAction.js'
import { saveShareUrl } from '../actions/saveRecord.js'

let HOST = "https://bs.ziipoo.com.cn/api/v2"
let API_VERSION = "v1"
let API_USER_UPDATE = "/user/update"
let API_USER_LOGIN = "/user/login"
let API_TOKEN_REFRESH = "/token/refresh"
let API_WORK_STORE = "/work"
let API_OTA = "/device/ota/"

let storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24 * 30, //30 days
  enableCache: true,
})

export function webServerLogin(dispatch, openId) {
  return fetch(HOST + API_USER_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        client: 'weChatApp',
        openId: openId,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      storage.save({
        key: 'webServerState',
        data: {
          token: 'Bearer ' + responseData.token,
          expireAt: responseData.expireAt,
          refreshExpireAt: responseData.refreshExpireAt
        }
      })

      dispatch(webServerStateChange({
        token: 'Bearer ' + responseData.token,
        expireAt: responseData.expireAt,
        refreshExpireAt: responseData.refreshExpireAt
      }))
      console.log('webServerLogin:' + responseData.status)
    })
  .catch(err => {
    console.log('webServerLoginErr:' + err.message)
  })
}

export function updateUserInfo(dispatch, userInfo) {
  return storage.load({
      key: 'webServerState',
    })
  .then(state => {
    return fetch(HOST + API_USER_UPDATE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': state.token
      },
      body: JSON.stringify({
        client: 'weChatApp',
        nickname: userInfo.nickname,
        gender: userInfo.sex,
        city: userInfo.city,
        province: userInfo.province,
        avatar_url: userInfo.headimgurl,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log('updateUserInfo:' + responseData.status)
    })
    .catch(err => {
        console.log('updateUserInfoErr:' + err.message)
      })
  })
}