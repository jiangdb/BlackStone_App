import fetch from 'cross-fetch';
import * as bleActions from './ble.js'
import * as weChat from './weChat.js'
import { saveShareUrl } from './saveRecord.js'

let HOST = "https://bs.ziipoo.com.cn/api/v2"
let API_VERSION = "v1"
let API_TOKEN_REFRESH = "/token/refresh"
let API_WORK_STORE = "/work"
let API_WORK_LIST = "/work"
let API_WORK_SHOW = "/work/"
let API_WORK_DELETE = "/work/"
let API_OTA = "/device/ota/"

let token = null
let tokenExpireAt = null

function init(store) {
	let weChatState = store.getState().weChat
	let now = Math.floor(Date.now() / 1000)
	token = weChatState.token //web token
	tokenExpireAt = weChatState.expireAt //web token 
	refreshExpireAt = weChatState.refreshExpireAt //web refresh token

	if(!weChatState.logIn) {
		return
    } else if (now < tokenExpireAt) {
      	weChat.getAndUpdateUserInfo(store)
    } else if (now < refreshExpireAt) {
    	updateWebToken(store)
    } else {
    	weChat.weChatLogout(store)
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
			console.log('checkUpgradeErr:'+err.message)
		})
	}
}

function storeWork(work,currentToken,index) {
	let formatChartDatas = [];
	let length = work.chartDatas.length;
	for( let i = 0; i<length; i++) {
      	formatChartDatas.push([
      		i*100,
      		work.chartDatas[i].extract.toFixed(1),
      		work.chartDatas[i].total.toFixed(1),
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

	return function (dispatch) {
	  	return fetch(HOST + API_WORK_STORE,{
		    method: 'POST',
		    headers: {
		      'content-type': 'multipart/form-data',
		      'Authorization': currentToken
		    },
		    body: formData
	  	})
	  	.then((response)=>response.json())
	    .then((responseData)=>{
	    	dispatch(saveShareUrl({
	    		index: index,
	    		id:responseData.id,
	    		shareUrl: responseData.shareUrl
	    	}))
	    })
	    .catch(err => {
			console.log('storeWorkErr:'+err.message)
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
      	weChat.getAndUpdateUserInfo(store)
    })
    .catch(err => {
		console.log('updateWebTokenErr:'+err.message)
	})
}

module.exports = {
	init: init,
  	checkUpgrade: checkUpgrade,
	storeWork: storeWork,
}