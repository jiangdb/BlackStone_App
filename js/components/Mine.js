import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View , Image, TouchableOpacity, Alert } from 'react-native';
import { ChoiceBar, Divider } from './Templates';
import { addNavigationWithDebounce } from '../utils/util.js'
import *as wechat from 'react-native-wechat'
import ActionSheet from 'react-native-actionsheet'
import { weChatLoginRequest } from '../actions/weChat.js'
import {checkUpgrade} from '../actions/webAction.js'

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
    newVersion: false,
    navigation: null,
    toastVisible: false 
  };

  componentWillMount() {
    //check if there is a new version of the device
    if(!this.props.weChat.logIn) return
      
    let model = this.props.bleInfo.modelNum 
    let version = this.props.bleInfo.fwVersion
    this.props.onCheckUpgrade(model, version)
  };

  componentDidMount() {
    this.setState({
      navigation: addNavigationWithDebounce(this.props.navigation)
    })
    wechat.registerApp(appId)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.bleInfo.fwVersion != nextProps.bleInfo.fwVersion && nextProps.bleInfo.fwVersion != 'undefined'){
      this.setState({newVersion: true})
    } else {
      this.setState({newVersion: false})
    }
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
        this.props.onWeChatLoginRequest();
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

  render() {
    return (
      <View style={{ flexDirection: 'column'}}>
        <View style={styles.userContainer}>
          <TouchableOpacity onPress={()=> this.ActionSheet.show()}>
            <Image style={styles.userHeader} source={this.props.weChat.userInfo == null ? require('../../images/user-header.png') : {uri:this.props.weChat.userInfo.headimgurl}} />
          </TouchableOpacity>
          <Text style={styles.userName}>{this.props.weChat.userInfo == null ? ' 登录' : this.props.weChat.userInfo.nickname}</Text>
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
          options={['微信登录', '取消']}
          cancelButtonIndex={1}
          onPress={(index) => {
            if(index == 0 ) this._WXLogin()
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
    onWeChatLoginRequest: () => {
      dispatch(weChatLoginRequest())
    },
    onCheckUpgrade: (model, version) => {
      dispatch(checkUpgrade(model, version))
    },
  }
}

const MineContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Mine)

export default MineContainer
