import fetch from 'cross-fetch';

let HOST = "https://bs.ziipoo.com.cn/api/v2"
let API_VERSION = "v1"
let API_TOKEN_REFRESH = "/token/refresh"
let API_USER_UPDATE = "/user/update"
let API_WORK_STORE = "/work"
let API_WORK_LIST = "/work"
let API_WORK_SHOW = "/work/"
let API_WORK_DELETE = "/work/"
let API_OTA = "/device/ota/"
let API_DEVICE_ONLINE = "/device/online"

// let token = null;
let tokenExpireAt = null;

import *as wechat from 'react-native-wechat';


function checkUpgrade(model, version, token) {
  // if (!token) return;

	return function (dispatch) {
	  	return fetch(HOST + API_OTA + model,{
		    method: 'GET',
		    header: {
		      'content-type': 'application/json',
		      'Authorization': token
		    },
		    body: JSON.stringify({
				version: version,
			})
	  	})
	  	.then((response)=>response.json())
	    .then((responseData)=>{
	    	console.log(responseData)
	    })
	    .catch(err => {
			console.log(err.message)
		})
	}
}

module.exports = {
  checkUpgrade: checkUpgrade,
}