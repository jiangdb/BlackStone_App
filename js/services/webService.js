import fetch from 'cross-fetch';
import Storage from 'react-native-storage';
import { Alert, AsyncStorage } from 'react-native';
import * as bleActions from '../actions/ble.js'
import { webServerStateChange } from '../actions/webAction.js'
import { saveShareUrl } from '../actions/saveRecord.js'
import { weChatStateChange, weChatLogout } from '../actions/weChat.js'

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
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log('updateUserInfo:' + responseData.status)
    })
    .catch(err => {
      console.log('updateUserInfoErr:' + err.message)
    })
}

export function checkUpgrade(dispatch, model, version) {
  return storage.load({
      key: 'webServerState',
    })
    .then(state => {
      return fetch(HOST + API_OTA + model + '?version=' + version, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': state.token
        }
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.status == 'success') {
        dispatch(bleActions.bleOnDeviceInfoChange({
          downloadUrl: responseData.download_url,
          newVersion: responseData.version,
          description: responseData.description,
        }))
      } else {
        dispatch(bleActions.bleOnDeviceInfoChange({
          newVersion: null
        }))
      }
      console.log('checkUpgrade:' + responseData.status)
    })
    .catch(err => {
      console.log('checkUpgradeErr:' + err.message)
    })
}

export function storeWork(dispatch, work, index) {

  let formatChartDatas = [];
  let length = work.chartDatas.length;
  for (let i = 0; i < length; i++) {
    let extract = work.chartDatas[i].extract
    let total = work.chartDatas[i].total
    formatChartDatas.push([
      work.chartDatas[i].time * 1000,
      extract == null ? null : work.chartDatas[i].extract.toFixed(1),
      total == null ? null : work.chartDatas[i].total.toFixed(1),
    ])
  }
  let formData = new FormData();
  formData.append("device", work.device);
  formData.append("bean_category", work.category);
  formData.append("bean_weight", work.beanWeight);
  formData.append("water_ratio", work.ratioWater);
  formData.append("water_weight", work.waterWeight);
  formData.append("grand_size", work.grandSize);
  formData.append("temperature", work.temperature);
  formData.append("work_time", work.totalSeconds);
  formData.append("rating", work.starCount);
  formData.append("flavor", work.flavor.toString());
  formData.append("accessories", work.accessories.toString());
  formData.append("feeling", work.comment);
  formData.append("data", JSON.stringify(formatChartDatas));
  formData.append("started_at", work.date);

  return storage.load({
      key: 'webServerState',
    })
    .then(state => {
      return fetch(HOST + API_WORK_STORE, {
        method: 'POST',
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': state.token
        },
        body: formData
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      dispatch(saveShareUrl({
        index: index,
        id: responseData.id,
        shareUrl: responseData.shareUrl
      }))
      console.log('storeWork:' + responseData.status)
      return Promise.resolve(responseData.shareUrl)
    })
    .catch(err => {
      console.log('storeWorkErr:' + err.message)
    })
}

export function updateWebToken(dispatch, callback, param1, param2) {
  let refreshExpireAt = null
  return storage.load({
      key: 'webServerState',
    })
    .then(state => {
      refreshExpireAt = state.refreshExpireAt
      return fetch(HOST + API_TOKEN_REFRESH, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': state.token
        },
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      storage.save({
        key: 'webServerState',
        data: {
          token: 'Bearer ' + responseData.token,
          expireAt: responseData.expireAt,
          refreshExpireAt: refreshExpireAt
        }
      })
      dispatch(weChatStateChange({
        token: 'Bearer ' + responseData.token,
        expireAt: responseData.expireAt,
      }))
      console.log('updateWebToken:' + responseData.status)
      return callback(dispatch, param1, param2)
    })
    .catch(err => {
      console.log('updateWebTokenErr:' + err.message)
    })
}

export function validateWebToken(dispatch, callback, param1, param2) {
  return storage.load({
      key: 'webServerState',
    })
    .then(state => {
      let now = Math.floor(Date.now() / 1000)

      if (now < state.expireAt) {
        return callback(dispatch, param1, param2)
      } else if (now < state.refreshExpireAt) {
        return updateWebToken(dispatch, callback, param1, param2)
      } else {
        dispatch(weChatLogout())
        if (callback == storeWork) {
          Alert.alert('未登录', '请先登录再进行分享', [
            { text: '确定' }
          ])
        }
        return Promise.reject('reject')
      }
    })
}