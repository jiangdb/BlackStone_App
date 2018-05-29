const weChatLoginFail = error => ({
  type: 'WECHAT_LOGIN_FAIL',
  error
});

const weChatStateChange = info => ({
  type: 'WECHAT_STATE_CHANGE',
  info
});

import fetch from 'cross-fetch';
import *as wechat from 'react-native-wechat';

const appId = 'wx85d6b9dedc701086';
const secretId = '692442ff78837aa6e128df87e8184b4f';
let HOST = "https://bs.ziipoo.com.cn/api/v2"
let API_USER_UPDATE = "/user/update"
let API_USER_LOGIN = "/user/login"

function weChatLoginRequest() {
	let scope = 'snsapi_userinfo';
    let state = 'wechat_sdk_demo';

    return function (dispatch) {
    	wechat.sendAuthRequest(scope, state)
		.then(responseCode => {
			//返回code码，通过code获取access_token
			let AccessTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+appId+'&secret='+secretId+'&code='+responseCode.code+'&grant_type=authorization_code';

			return fetch(AccessTokenUrl,{
				      method:'GET',
				      timeout: 2000,
				      headers:{
				        'Content-Type':'application/json; charset=utf-8',
				      },
				    })
		})
		.then((response)=>response.json())
	    .then((responseData)=>{
	    	dispatch(weChatStateChange({
	    		refreshToken: responseData.refresh_token,
	    	}))
	      	//通过refresh_token刷新access_token
			let refreshTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid='+appId+'&grant_type=refresh_token&refresh_token='+responseData.refresh_token;

			return fetch(refreshTokenUrl,{
				      method:'GET',
				      timeout: 2000,
				      headers:{
				        'Content-Type':'application/json; charset=utf-8',
				      },
				    })
	    })
	    .then((response)=>response.json())
	    .then((responseData)=>{
	        //获取user_info
	        let getUserInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token='+responseData.access_token+'&openid='+responseData.openid;

	        return fetch(getUserInfoUrl,{
				      method:'GET',
				      timeout: 2000,
				      headers:{
				        'Content-Type':'application/json; charset=utf-8',
				      },
				    })
	    })
	    .then((response)=>response.json())
	    .then((responseData)=>{
	    	dispatch(weChatStateChange({
	    		logIn:true,
	    		userInfo:responseData
	    	}))

	    	//服务器登录
	    	return fetch(HOST + API_USER_LOGIN,{
				      method:'POST',
				      headers:{
				        'Content-Type':'application/json; charset=utf-8',
				      },
				      body: JSON.stringify({
					    client: 'weChatApp',
					    openId: responseData.openid,
					  })
				    })
	    })
	    .then((response)=>response.json())
	    .then((responseData)=>{
	    	dispatch(weChatStateChange({
	    		token: 'Bearer '+responseData.token,
			  	expireAt: responseData.expireAt,
			  	refreshExpireAt: responseData.refreshExpireAt
	    	}))
	    })
		.catch(err => {
			dispatch(weChatLoginFail(err))
		})
    }
};

function weChatLogout(store) {
	store.dispatch(weChatStateChange({
		logIn: false,
		error: null,
		userInfo: null,
		refreshToken: null,
		token: null,
		expireAt: null,
		refreshExpireAt: null
	}))
	console.log('weChatLogout')
}

function getAndUpdateUserInfo(store) {
	token = store.getState().weChat.token
	refresh_token = store.getState().weChat.refreshToken

	let refreshTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid='+appId+'&grant_type=refresh_token&refresh_token='+refresh_token;

	return fetch(refreshTokenUrl,{
		method:'GET',
		timeout: 2000,
		headers:{
			'Content-Type':'application/json; charset=utf-8',
		},
    })
    .then((response)=>response.json())
    .then((responseData)=>{
        //获取user_info
        let getUserInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token='+responseData.access_token+'&openid='+responseData.openid;

        return fetch(getUserInfoUrl,{
			method:'GET',
			timeout: 2000,
			headers:{
				'Content-Type':'application/json; charset=utf-8',
			},
		})
    })
    .then((response)=>response.json())
    .then((responseData)=>{
    	store.dispatch(weChatStateChange({userInfo:responseData}))

    	//服务器更新user_info
    	return fetch(HOST + API_USER_UPDATE,{
			      method:'PUT',
			      headers:{
			        'Content-Type':'application/json',
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
    .then((response)=>response.json())
    .then((responseData)=>{
    	console.log('getAndUpdateUserInfo:'+responseData)
    })
	.catch(err => {
		console.log('getAndUpdateUserInfoErr:'+err.message)
	})
}

module.exports = {
	weChatLoginFail:weChatLoginFail,
	weChatStateChange:weChatStateChange,
	weChatLoginRequest: weChatLoginRequest,
  	weChatLogout: weChatLogout,
  	getAndUpdateUserInfo: getAndUpdateUserInfo,
}


