export const webServerStateChange = info => ({
  type: 'WEB_SERVER_STATE_CHANGE',
  info
});

import fetch from 'cross-fetch';
import * as bleActions from './ble.js'
// import { getUserInfo, weChatLogout, weChatStateChange } from './weChat.js'
// import { saveShareUrl } from './saveRecord.js'

let HOST = "https://bs.ziipoo.com.cn/api/v2"
// let API_VERSION = "v1"
// let API_USER_UPDATE = "/user/update"
// let API_USER_LOGIN = "/user/login"
// let API_TOKEN_REFRESH = "/token/refresh"
// let API_WORK_STORE = "/work"
let API_OTA = "/device/ota/"

// let token = null
// let tokenExpireAt = null
// let refreshExpireAt = null

// export function webInit(webServerState) {
//   let now = Math.floor(Date.now() / 1000)
//   token = webServerState.token //web token
//   tokenExpireAt = webServerState.expireAt //web token 
//   refreshExpireAt = webServerState.refreshExpireAt //web refresh token

//   return function(dispatch) {
//     if (token == null) {
//       return
//     } else if (now < tokenExpireAt) {
//       dispatch(getUserInfo())
//       // console.log('webInit getUserInfo')
//     } else if (now < refreshExpireAt) {
//       dispatch(updateWebToken())
//       // console.log('webInit updateWebToken')
//     } else {
//       dispatch(weChatLogout())
//       // console.log('webInit weChatLogout')
//     }
//   }
// }



export function checkUpgrade(model, version,token) {
  return function(dispatch) {
    return fetch(HOST + API_OTA + model + '?version=' + version, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': token
        }
      })
      .then((response) => response.json())
      .then((responseData) => {
        dispatch(bleActions.bleOnDeviceInfoChange({
          downloadUrl: responseData.download_url,
          fwVersion: responseData.version,
          description: responseData.description,
        }))
        console.log('checkUpgrade:' + responseData.status)
      })
      .catch(err => {
        console.log('checkUpgradeErr:' + err.message)
      })
  }
}

// export function storeWork(work, currentToken, index) {
//   let formatChartDatas = [];
//   let length = work.chartDatas.length;
//   for (let i = 0; i < length; i++) {
//     formatChartDatas.push([
//       i * 100,
//       work.chartDatas[i].extract.toFixed(1),
//       work.chartDatas[i].total.toFixed(1),
//     ])
//   }
//   let formData = new FormData();
//   formData.append("device", work.device);
//   formData.append("bean_category", work.category);
//   formData.append("bean_weight", work.beanWeight);
//   formData.append("water_ratio", work.ratioWater);
//   formData.append("water_weight", work.waterWeight);
//   formData.append("grand_size", work.grandSize);
//   formData.append("temperature", work.temperature);
//   formData.append("work_time", work.totalSeconds);
//   formData.append("rating", work.starCount);
//   formData.append("flavor", work.flavor.toString());
//   formData.append("accessories", work.accessories.toString());
//   formData.append("feeling", work.comment);
//   formData.append("data", JSON.stringify(formatChartDatas));
//   formData.append("started_at", work.date);

//   return function(dispatch) {
//     return fetch(HOST + API_WORK_STORE, {
//         method: 'POST',
//         headers: {
//           'content-type': 'multipart/form-data',
//           'Authorization': currentToken
//         },
//         body: formData
//       })
//       .then((response) => response.json())
//       .then((responseData) => {
//         dispatch(saveShareUrl({
//           index: index,
//           id: responseData.id,
//           shareUrl: responseData.shareUrl
//         }))
//         console.log('storeWork:' + responseData.status)
//       })
//       .catch(err => {
//         console.log('storeWorkErr:' + err.message)
//       })
//   }
// }

// export function updateWebToken() {
//   return function(dispatch) {
//     return fetch(HOST + API_TOKEN_REFRESH, {
//         method: 'GET',
//         headers: {
//           'content-type': 'application/json',
//           'Authorization': token
//         },
//       })
//       .then((response) => response.json())
//       .then((responseData) => {
//         token = 'Bearer ' + responseData.token
//         dispatch(weChatStateChange({
//           token: token,
//           expireAt: responseData.expireAt,
//         }))
//         console.log('updateWebToken:' + responseData.status)
//         // dispatch(getUserInfo())
//       })
//       .then((response) => console.log(response))
//       .catch(err => {
//         console.log('updateWebTokenErr:' + err.message)
//       })
//   }
// }