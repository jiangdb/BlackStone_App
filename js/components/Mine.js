import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View , Image, TouchableOpacity, Alert } from 'react-native';
import { ChoiceBar, Divider } from './Templates';
import { addNavigationWithDebounce } from '../utils/util.js'
import *as wechat from 'react-native-wechat'
import ActionSheet from 'react-native-actionsheet'
import { saveWechatUserInfo } from '../actions/weChat.js'

const appId = 'wx85d6b9dedc701086'
const secretId = '692442ff78837aa6e128df87e8184b4f'

class Mine extends React.Component {
  static navigationOptions = {
    title: 'TIMEMORE Labs',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      alignSelf: 'center',
      fontWeight: 'normal',
    }
  };

  state = {
    newVersion: true,
    navigation: null,
    toastVisible: false 
  };

  componentWillMount() {
    //check if there is a new version of the device
  };

  componentDidMount() {
    this.setState({
      navigation: addNavigationWithDebounce(this.props.navigation)
    })

    wechat.registerApp(appId)
  }

  _getNewVersionChoiceBar = () => {
    if(this.state.newVersion) {
      return (
        <View style={{flexDirection: 'column'}}>
        <ChoiceBar
          title='机器升级'
          icon='more'
          onPress={() => this.state.navigation.navigateWithDebounce('DeviceUpgrade')}
        />
        <Divider/>
        </View>
      );
    } else {
      return;
    }
  };

  _WXLogin = () => {
    let scope = 'snsapi_userinfo';
    let state = 'wechat_sdk_demo';

    //判断微信是否安装
    wechat.isWXAppInstalled()
    .then((isInstalled) => {
      if (isInstalled) {
        //发送授权请求
        wechat.sendAuthRequest(scope, state)
          .then(responseCode => {
            //返回code码，通过code获取access_token
            this._getAccessToken(responseCode.code);
          })
          .catch(err => {
            Alert.alert('登录授权发生错误：', err.message, [
              {text: '确定'}
            ]);
          })
      } else {
        Platform.OS == 'ios' ?
        Alert.alert('没有安装微信', '是否安装微信？', [
          {text: '取消'},
          {text: '确定', onPress: () => this.installWechat()}
        ]) :
        Alert.alert('没有安装微信', '请先安装微信客户端在进行登录', [
          {text: '确定'}
        ])
      }
    })
  };

  _getAccessToken = (responseCode) => {
    let AccessTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+appId+'&secret='+secretId+'&code='+responseCode+'&grant_type=authorization_code';

    console.log(AccessTokenUrl)

    fetch(AccessTokenUrl,{
      method:'GET',
      timeout: 2000,
      headers:{
        'Content-Type':'application/json; charset=utf-8',
      },
    })
    .then((response)=>response.json())
    .then((responseData)=>{
      console.log('responseData.refresh_token=',responseData);
      this._getRefreshToken(responseData.refresh_token);
    })
    .catch((error)=>{
      if(error){
        console.log('error=',error);
      }
    })
  };

  _getRefreshToken = (refreshtoken) => {
    let getRefreshTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid='+appId+'&grant_type=refresh_token&refresh_token='+refreshtoken;

    fetch(getRefreshTokenUrl,{
      method:'GET',
      timeout: 2000,
      headers:{
        'Content-Type':'application/json; charset=utf-8',
      },
    })
    .then((response)=>response.json())
    .then((responseData)=>{
        console.log('responseData.accesstoken=',responseData);
        this._getUserInfo(responseData);
    })
    .catch((error)=>{
      if(error){
          console.log('error=',error);
      }
    })
  };

  _getUserInfo = (responseData) => {
    // console.log(responseData);
    let getUserInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token='+responseData.access_token+'&openid='+responseData.openid;
    // console.log('getUserInfoUrl=',getUserInfoUrl);

    fetch(getUserInfoUrl,{
      method:'GET',
      timeout: 2000,
      headers:{
        'Content-Type':'application/json; charset=utf-8',
      },
    })
    .then((response)=>response.json())
    .then((responseData)=>{
        console.log('getUserInfo=',responseData);
      this.props.onSaveWechatUserInfo(responseData)

    })
    .catch((error)=>{
      if(error){
        console.log('error=',error);
      }
    })
  }

  async  _shareToSession() {
    try {
      let result = await wechat.shareToSession({
        type: 'imageUrl',
        title: 'web image',
        description: 'share web image to time line',
        mediaTagName: 'email signature',
        messageAction: undefined,
        messageExt: undefined,
        imageUrl: 'http://www.ncloud.hk/email-signature-262x100.png'
      });
      console.log('share image url to time line successful:', result);
    } catch (e) {
      console.log('error:'+e)
      // if (e instanceof wechat.WechatError) {
      //   console.error(e.stack);
      // } else {
      //   throw e;
      // }
    }
  }

  render() {
    return (
      <View style={{ flexDirection: 'column'}}>
        <View style={styles.userContainer}>
          <TouchableOpacity onPress={()=> this.ActionSheet.show()}>
            <Image style={styles.userHeader} source={this.props.weChat.userInfo.headimgurl == ''? require('../../images/user-header.png') : {uri:this.props.weChat.userInfo.headimgurl}} />
          </TouchableOpacity>
          <Text style={styles.userName}>{this.props.weChat.userInfo.nickname}</Text>
        </View>
        <View style={{ marginBottom: 12}}>
          <ChoiceBar
            title='连接设备'
            value={this.props.bleStatus.deviceReady ? this.props.bleInfo.displayName : '未连接'}
            icon='more'
            onPress={() => this.state.navigation.navigateWithDebounce('DeviceScan')}
          />
        </View>
        <View style={{flexDirection: 'column'}}>
          <ChoiceBar
            title='冲煮记录'
            icon='more'
            onPress={() => this.state.navigation.navigateWithDebounce('History')}
          />
          <Divider/>
          <ChoiceBar
            title='机器设置'
            icon='more'
            onPress={() => this.state.navigation.navigateWithDebounce('DeviceSetting')}
          />
          <Divider/>
          {this._getNewVersionChoiceBar()}
          <ChoiceBar
            title='关于我们'
            icon='more'
            onPress={() => this.state.navigation.navigateWithDebounce('About')}
          />
        </View>

        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={['微信登录', '取消', '分享']}
          cancelButtonIndex={1}
          destructiveButtonIndex={0}
          onPress={(index) => {
            if(index == 0 ) this._WXLogin()
            if(index == 2)  {
              try{
                this._shareToSession()
              }
              catch(e) {
                console.log('error2:'+e)
              }
            }
         }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  withBorder: {
    borderColor :'#E0DEDE',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  userContainer: {
    height:140,
    flexDirection: 'column',
    backgroundColor:'#fff',
    marginBottom: 12,
    justifyContent:'center',
    alignItems:'center',
  },
  userHeader: {
    width:55,
    height:55,
    marginTop:18,
    borderRadius:28,
    resizeMode: 'cover',
  },
  userName: {
    marginTop:2,
    height:25,
    fontSize:18,
    color:'#232323',
  }
});

const mapStateToProps = state => {
  return {
    deviceScan: state.deviceScan,
    bleStatus: state.bleStatus,
    bleInfo: state.bleInfo,
    weChat: state.weChat
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSaveWechatUserInfo: userInfo => {
      dispatch(saveWechatUserInfo(userInfo))
    }
  }
}

const MineContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Mine)

export default MineContainer
