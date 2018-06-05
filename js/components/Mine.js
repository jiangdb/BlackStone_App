import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View , Image, TouchableOpacity, Alert } from 'react-native';
import { ChoiceBar, Divider } from './Templates';
import { addNavigationWithDebounce } from '../utils/util.js'
import *as wechat from 'react-native-wechat'
import ActionSheet from 'react-native-actionsheet'
import { weChatLogout, getAndUpdateUserInfo } from '../actions/weChat.js'
import { weChatLogin } from '../actions/loginActions.js'
import { webServerCheckUpgrade } from '../actions/webAction.js'

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

  constructor(props) {
    super(props);
    this.didFocusSubscription = null
    this.state = {
      navigation: null,
      toastVisible: false
    }
  }

  componentWillMount() {
  };

  componentDidMount() {
    this.setState({
      navigation: addNavigationWithDebounce(this.props.navigation)
    })
    // this.props.onWeChatLogout()

    //update userInfo when loading mine.js
    // if(this.props.webServer.token == null) return
    // this.props.onGetAndUpdateUserInfo()

    if ( !this.didFocusSubscription ) {
      this.didFocusSubscription = this.props.navigation.addListener(
        'didFocus',
        payload => {
          if (this.props.bleStatus.deviceReady) {
            let model = this.props.bleInfo.modelNum 
            let version = this.props.bleInfo.fwVersion
            //check if there is a new version of the device
            if(version == null) return
            this.props.onCheckUpgrade(model, version)
          }
        }
      );
    }
  }

  componentWillUnmount() {
    this.didFocusSubscription.remove()
  }

  componentWillReceiveProps(nextProps) {
  }

  _getNewVersionChoiceBar = () => {
    if(this.props.bleInfo.newVersion && this.props.bleStatus.deviceReady) {
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

  render() {
    return (
      <View style={{ flexDirection: 'column'}}>
        <View style={styles.userContainer}>
          <TouchableOpacity onPress={()=> this.ActionSheet.show()}>
            <Image style={styles.userHeader} source={this.props.weChat.userInfo == null || this.props.webServer.token == null ? require('../../images/user-header.png') : {uri:this.props.weChat.userInfo.headimgurl}} />
          </TouchableOpacity>
          <Text style={styles.userName}>{this.props.weChat.userInfo == null || this.props.webServer.token ==null ? ' 登录' : this.props.weChat.userInfo.nickname}</Text>
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
          options={[this.props.webServer.token == null? '微信登录' : '注销账号', '取消']}
          cancelButtonIndex={1}
          onPress={(index) => {
            if(index == 0 && this.props.webServer.token == null ) this.props.onWeChatLogin()
            if(index == 0 && this.props.webServer.token !== null ) this.props.onWeChatLogout()
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
    weChat: state.weChat,
    webServer: state.webServer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onWeChatLogin: () => {
      dispatch(weChatLogin())
    },
    onWeChatLogout: () => {
      dispatch(weChatLogout())
    },
    onCheckUpgrade: (model, version) => {
      dispatch(webServerCheckUpgrade(model, version))
    },
    // onGetAndUpdateUserInfo: () => {
    //   dispatch(getAndUpdateUserInfo())
    // },
  }
}

const MineContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Mine)

export default MineContainer
