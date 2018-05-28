import fetch from 'cross-fetch';
import * as bleActions from '../actions/ble.js'
import * as weChat from './weChat.js'

let HOST = "https://bs.ziipoo.com.cn/api/v2"
let API_VERSION = "v1"
let API_TOKEN_REFRESH = "/token/refresh"
let API_WORK_STORE = "/work"
let API_WORK_LIST = "/work"
let API_WORK_SHOW = "/work/"
let API_WORK_DELETE = "/work/"
let API_OTA = "/device/ota/"
let API_DEVICE_ONLINE = "/device/online"

let token = null
let tokenExpireAt = null

function init(store) {
	let weChatState = store.getState().weChat
	let now = Math.floor(Date.now() / 1000)
	token = weChatState.token
	tokenExpireAt = weChatState.expireAt
	refreshExpireAt = weChatState.refreshExpireAt

	if(!weChatState.logIn) {
		return
    } else if (now < tokenExpireAt) {
      	weChat.getAndUpdateUserInfo(store)
    } else if (now < refreshExpireAt) {
    	updateWebToken(store)
    } else {
    	weChat.weChatLogout(store)
		// console.log('weChatLogout')
    }
}

function checkUpgrade(model, version) {

	return function (dispatch) {
	  	return fetch(HOST + API_OTA + model + '?version=' + version,{
		    method: 'GET',
		    headers: {
		      'content-type': 'application/json',
		      'Authorization': token
		    }
	  	})
	  	.then((response)=>response.json())
	    .then((responseData)=>{
	    	dispatch(bleActions.bleOnDeviceInfoChange({
	    		downloadUrl: responseData.download_url,
	          	fwVersion: responseData.version,
	          	description: responseData.description,
	        }))
	    })
	    .catch(err => {
			console.log('checkUpgrade:'+err.message)
		})
	}
}

function storeWork(work) {
  // if (!token) return;
	return function (dispatch) {
		console.log(work)
	  	return fetch(HOST + API_WORK_STORE,{
		    method: 'POST',
		    headers: {
		      'content-type': 'application/json',
		      'Authorization': token
		    },
		    body: JSON.stringify({
				device: work.device,
      			bean_category: work.category,
				bean_weight: work.beanWeight,
				water_ratio: work.ratioWater,
				water_weight: work.waterWeight,	
				grand_size: work.grandSize,
				temperature: work.temperature,
				work_time: work.totalSeconds,
				rating: work.starCount,
				flavor: work.flavor,
				accessories: work.accessories,
				feeling:  work.comment,
				data: work.chartDatas,
				started_at: work.date,
			})
	  	})
	  	// .then((response)=>console.log(response))
	  	.then((response)=>response.json())
	    .then((responseData)=>{
	    	console.log('storeWork:'+responseData.status)
	    })
	    .catch(err => {
			console.log('storeWork:'+err.message)
		})
	}
}

function updateWebToken(store) {
  	return fetch(HOST + API_TOKEN_REFRESH,{
	    method: 'GET',
	    headers: {
	      'content-type': 'application/json',
	      'Authorization': token
	    },
  	})
  	.then((response)=>response.json())
    .then((responseData)=>{
    	store.dispatch(weChat.weChatStateChange({
    		token: 'Bearer '+responseData.token,
    		expireAt: responseData.expireAt,
    	}))
		console.log('updateWebToken:'+responseData.status)
    	
      	weChat.getAndUpdateUserInfo(store)
    })
    .catch(err => {
		console.log('updateWebToken:'+err.message)
	})
}

module.exports = {
	init: init,
  	checkUpgrade: checkUpgrade,
	storeWork: storeWork,
}