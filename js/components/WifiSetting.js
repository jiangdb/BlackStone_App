import React from 'react';
import { connect } from 'react-redux'
import { Text, View ,StyleSheet, TextInput,TouchableWithoutFeedback } from 'react-native';

class WifiSetting extends React.Component {
  static navigationOptions = {
    title: '无线连接',
    tabBarVisible: false,
  };

  state= {
    wifiSSID: '',
    wifiPass: ''
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

  _connectWifi = () => {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={{flexDirection: 'column'}}>
        <View style={styles.currentWifi}>
          <Text style={{fontSize:17, color:'#232323'}}>{this._getConnectStatus()}</Text>
          <Text style={{fontSize:17, color:'#232323'}}>{this._getWifiSSID()}</Text>
        </View>

        <View style={{ flexDirection: 'column', marginTop: 12, backgroundColor: '#fff',}}>
          <View style={styles.choiceBar}>
            <Text style={styles.choiceTitle}>名称</Text>
            <TextInput
              style={styles.input}
              value={this.state.wifiSSID}
              onChangeText={(text) => this.setState({wifiSSID: text})}
              // onSubmitEditing={this._submitBeanWeight}
              // onBlur={this._submitBeanWeight}
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
              // onSubmitEditing={this._submitBeanWeight}
              // onBlur={this._submitBeanWeight}
              underlineColorAndroid='transparent'
              keyboardType='numeric'
            />
          </View>
        </View>

        <View style={styles.btnContainer}>
          <TouchableWithoutFeedback onPress={this._connectWifi()}>
            <View style={[styles.btn, this.props.bleInfo.wifiStatus === 'connected' && this.state.wifiPass !== '' && this.state.wifiSSID !== ''? : styles.btnDisabled]}>
              <Text style={[styles.btnText,this.props.bleInfo.wifiStatus === 'connected' && this.state.wifiPass !== '' && this.state.wifiSSID !== ''? : styles.btnDisabledText]}>连接</Text>
            </View>
          </TouchableWithoutFeedback>
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
  },
  btnDisabledText: {
    color: '#6a6a6a',
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