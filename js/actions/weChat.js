export const weChatLoginFail = error => ({
  type: 'WECHAT_LOGIN_FAIL',
  error
});

export const weChatLoginSuccess = userInfo => ({
  type: 'WECHAT_LOGIN_SUCCESS',
  userInfo
});

import fetch from 'cross-fetch';
import *as wechat from 'react-native-wechat';

export function weChatLoginRequest() {

	const appId = 'wx85d6b9dedc701086';
	const secretId = '692442ff78837aa6e128df87e8184b4f';
	let scope = 'snsapi_userinfo';
    let state = 'wechat_sdk_demo';

    console.log('login')

    return function (dispatch) {
    	console.log('return')
    	wechat.sendAuthRequest(scope, state)
		.then(responseCode => {
			//返回code码，通过code获取access_token
			let AccessTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+appId+'&secret='+secretId+'&code='+responseCode.code+'&grant_type=authorization_code';

			console.log('AccessTokenUrl')

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
	      	//获取refresh_token
			let getRefreshTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid='+appId+'&grant_type=refresh_token&refresh_token='+responseData.refresh_token;

			console.log('getRefreshTokenUrl')

			return fetch(getRefreshTokenUrl,{
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

			console.log('getUserInfoUrl')

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
	    	dispatch(weChatLoginSuccess(responseData))
	    })
		.catch(err => {
			dispatch(weChatLoginFail(err))
		})
    }
};


