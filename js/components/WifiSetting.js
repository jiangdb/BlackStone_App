import React from 'react';
import { connect } from 'react-redux'
import { Text, View ,StyleSheet, TextInput,TouchableOpacity, Keyboard } from 'react-native';
import * as bleService from '../services/bleServiceFaker.js'
import Toast from 'react-native-root-toast';
import { toUTF8Array } from '../utils/util.js'

class WifiSetting extends React.Component {
  static navigationOptions = {
    title: '无线连接',
    tabBarVisible: false,
  };

  state= {
    wifiSSID: '',
    wifiPass: '',
    wifiSSIDReady: false,
    wifiPassReady: false,
  };

  //listen to hiding keyboard action
  componentDidMount () {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidHideListener.remove();
  }

  _lengthCheck = (value) => {
    if (value !== '') {
      let utf8Name = toUTF8Array(value)
      if (utf8Name.length > 20) {
        switch (value) {
          case this.state.wifiSSID:
            let toast1 = Toast.show('WIFI名字太长啦', {
              duration: Toast.durations.SHORT,
              position: Toast.positions.CENTER,
              shadow: false,
              animation: false,
              hideOnPress: true,
            });
            this.setState({wifiSSIDReady: false})
            break;
          case this.state.wifiPass:
            let toast2 = Toast.show('WIFI密码太长啦', {
              duration: Toast.durations.SHORT,
              position: Toast.positions.CENTER,
              shadow: false,
              animation: false,
              hideOnPress: true,
            });
            this.setState({wifiPassReady: false})
            break;
          default:
            break;
        }
      } else {
        switch (value) {
          case this.state.wifiSSID:
            this.setState({wifiSSIDReady: true})
            break;
          case this.state.wifiPass:
            this.setState({wifiPassReady: true})
            break;
          default:
            break;
        }
      }
    }
  };

  _keyboardDidHide = () => {
    this._lengthCheck(this.state.wifiSSID)
    this._lengthCheck(this.state.wifiPass)
  };

  _getConnectStatus = () => {
    if(this.props.bleStatus.deviceReady) {
      if(this.props.bleInfo.wifiStatus==='connected') {
        return '已连接';
      } else {
        return '未连接';
      }
    } else {
      return '设备未连接';
    }
  };

  _getWifiSSID = () => {
    if(this.props.bleStatus.deviceReady) {
      if(this.props.bleInfo.wifiStatus==='connected') {
        return this.props.bleInfo.wifiSSID;
      } else {
        return '未连接';
      }
    } else {
      return '设备未连接';
    }
  };

  _connectWifi = (ssid, pass) => {
    bleService.setWifi(ssid, pass);
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={{flexDirection: 'column'}}>
        <View style={styles.currentWifi}>
          <Text style={{fontSize:17, color:'#232323'}}>{this._getConnectStatus()}</Text>
          <Text style={{fontSize:17, color:'#878787'}}>{this._getWifiSSID()}</Text>
        </View>

        <View style={{ flexDirection: 'column', marginTop: 12, backgroundColor: '#fff',}}>
          <View style={styles.choiceBar}>
            <Text style={styles.choiceTitle}>名称</Text>
            <TextInput
              style={styles.input}
              value={this.state.wifiSSID}
              onChangeText={(text) => this.setState({wifiSSID: text})}
              onBlur={() => this._lengthCheck(this.state.wifiSSID)}
              onSubmitEditing={() => this._lengthCheck(this.state.wifiSSID)}
              onKeyPress={() => this._lengthCheck(this.state.wifiSSID)}
              placeholder='请输入WiFi名称'
              underlineColorAndroid='transparent'
            />
          </View>
          <View style={styles.choiceBar}>
            <Text style={styles.choiceTitle}>密码</Text>
            <TextInput
              style={styles.input}
              value={this.state.wifiPass}
              onChangeText={(text) => this.setState({wifiPass: text})}
              onBlur={() => this._lengthCheck(this.state.wifiPass)}
              onSubmitEditing={() => this._lengthCheck(this.state.wifiPass)}
              onKeyPress={() => this._lengthCheck(this.state.wifiPass)}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity 
            onPress={() => {
              if(!this.props.bleStatus.deviceReady || !this.state.wifiSSIDReady || !this.state.wifiSSIDReady) return
                this._connectWifi(this.state.wifiSSID, this.state.wifiPass)
            }}
            activeOpacity={1}
          >
            <View style={this.props.bleStatus.deviceReady && this.state.wifiSSIDReady && this.state.wifiPassReady ? styles.btn : styles.btnDisabled}>
              <Text style={this.props.bleStatus.deviceReady && this.state.wifiSSIDReady && this.state.wifiPassReady ? styles.btnText : styles.btnDisabledText}>连接</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  currentWifi: {
    flexDirection: 'row',
    marginTop: 12,
    backgroundColor: '#fff',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 18,
  },
  btnContainer: {
    marginTop:200,
    flexDirection:'row',
    justifyContent: 'center'
  },
  btn: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#383838',
    height: 35,
    width:152.5,
    borderRadius: 5,
  },
  btnText: {
    color:'#FFFFFF',
    fontSize: 16,
  },
  btnDisabled: {
    backgroundColor: '#cacaca',
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
    height: 35,
    width:152.5,
    borderRadius: 5,
  },
  btnDisabledText: {
    color: '#6a6a6a',
    fontSize: 16,
  },
  choiceBar: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 18,
  },
  choiceTitle: {
    fontSize:17,
    color:'#232323',
    marginLeft:20,
  },
  input:{
    width:250,
    fontSize:17,
    color:'#878787',
    marginLeft: 25
  }
});

const mapStateToProps = state => {
  return {
    bleStatus: state.bleStatus,
    bleInfo: state.bleInfo,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const WifiSettingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WifiSetting)

export default WifiSettingContainer