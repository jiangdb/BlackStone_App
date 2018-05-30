const weChatLoginFail = error => ({
  type: 'WECHAT_LOGIN_FAIL',
  error
});

const weChatStateChange = info => ({
  type: 'WECHAT_STATE_CHANGE',
  info
});

const weChatLogout = () => ({
  type: 'WECHAT_LOGOUT'
});

import fetch from 'cross-fetch';
import * as wechat from 'react-native-wechat';
import { Alert } from 'react-native';

const appId = 'wx85d6b9dedc701086';
const secretId = '692442ff78837aa6e128df87e8184b4f';
let HOST = "https://bs.ziipoo.com.cn/api/v2"
let API_USER_UPDATE = "/user/update"
let API_USER_LOGIN = "/user/login"

let token = null
let scope = 'snsapi_userinfo'
let state = 'wechat_sdk_demo'
let accessToken = null
let openId = null

function weChatLogin() {
  return function(dispatch) {
    //判断微信是否安装
    wechat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          dispatch(weChatLoginRequest())
        } else {
          Alert.alert('没有安装微信', '请先安装微信客户端再进行登录', [
            { text: '确定' }
          ])
        }
      })
  }
}

function weChatLoginRequest() {
  return function(dispatch) {
    wechat.sendAuthRequest(scope, state)
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
        dispatch(weChatStateChange({
          refreshToken: responseData.refresh_token,
        }))
        //通过refresh_token刷新access_token
        let refreshTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=' + appId + '&grant_type=refresh_token&refresh_token=' + responseData.refresh_token;

        return fetch(refreshTokenUrl, {
          method: 'GET',
          timeout: 2000,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        accessToken = responseData.access_token
        openId = responseData.openid

        //服务器登录
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
      })
      .then((response) => response.json())
      .then((responseData) => {
        dispatch(weChatStateChange({
          token: 'Bearer ' + responseData.token,
          expireAt: responseData.expireAt,
          refreshExpireAt: responseData.refreshExpireAt
        }))

        //获取user_info
        let getUserInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + accessToken + '&openid=' + openId;

        return fetch(getUserInfoUrl, {
          method: 'GET',
          timeout: 2000,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        dispatch(weChatStateChange({
          logIn: true,
          userInfo: responseData
        }))
      })
      .catch(err => {
        dispatch(weChatLoginFail(err))
      })
  }
};

function getAndUpdateUserInfo(token, refreshToken) {
  return function(dispatch) {
    let refreshTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=' + appId + '&grant_type=refresh_token&refresh_token=' + refreshToken;

    return fetch(refreshTokenUrl, {
        method: 'GET',
        timeout: 2000,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then((response) => response.json())
      .then((responseData) => {
        //获取user_info
        let getUserInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + responseData.access_token + '&openid=' + responseData.openid;

        return fetch(getUserInfoUrl, {
          method: 'GET',
          timeout: 2000,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        dispatch(weChatStateChange({ userInfo: responseData }))

        //服务器更新user_info
        return fetch(HOST + API_USER_UPDATE, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({
            client: 'weChatApp',
            nickname: responseData.nickname,
            gender: responseData.sex,
            city: responseData.city,
            province: responseData.province,
            avatar_url: responseData.headimgurl,
          })
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('getAndUpdateUserInfo:' + responseData.status)
      })
      .catch(err => {
        console.log('getAndUpdateUserInfoErr:' + err.message)
      })
  }
}

module.exports = {
  weChatLogin: weChatLogin,
  weChatLoginFail: weChatLoginFail,
  weChatStateChange: weChatStateChange,
  weChatLoginRequest: weChatLoginRequest,
  weChatLogout: weChatLogout,
  getAndUpdateUserInfo: getAndUpdateUserInfo,
}