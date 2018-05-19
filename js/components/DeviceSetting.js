import React from 'react';
import { connect } from 'react-redux'
import { Text, View } from 'react-native';
import { ChoiceBar, Divider } from './Templates';
import * as bleService from '../services/bleService.js'
import BleMessageContainer from './common/BleWarning.js'
import { addNavigationWithDebounce } from '../utils/util.js'
import { bleOnSaveDeviceSetting } from '../actions/ble.js'

class DeviceSetting extends React.Component {
  static navigationOptions = {
    title: '机器设置',
    tabBarVisible: false,
  };

  state = {
    navigation: null,
  };

  componentDidMount() {
    this.setState({
      navigation: addNavigationWithDebounce(this.props.navigation)
    })
  }

  _toggleAlarm = () => {
    this.props.bleOnSaveDeviceSetting({
      alarm: !this.props.deviceSetting.alarm
    })
    bleService.setAlarmEnable(!this.props.deviceSetting.alarm);
  };

  _toggleKeySound = () => {
    this.props.bleOnSaveDeviceSetting({
      keySound: !this.props.deviceSetting.keySound
    })
    bleService.setKeySound(!this.props.deviceSetting.keySound);
  };

  _toggleKeyVibrate = () => {
    this.props.bleOnSaveDeviceSetting({
      keyVibrate: !this.props.deviceSetting.keyVibrate
    })
    bleService.setKeyVibrate(!this.props.deviceSetting.keyVibrate);
  };

  _getWifiChoiceBarValue = () => {
    if(!this.props.bleStatus.deviceReady) {
      return '蓝牙未连接'
    } else if (this.props.bleInfo.wifiStatus == 'connected') {
      return '已连接 '+this.props.bleInfo.wifiSSID
    } else {
      return '未设置'
    }
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', marginTop: 12}}>
        <BleMessageContainer/>
        <View style={{flexDirection: 'column', marginBottom: 12}}>
          <ChoiceBar
            title='名称'
            value={this.props.bleStatus.deviceReady? this.props.bleInfo.displayName: '蓝牙未连接'}
            icon={this.props.bleStatus.deviceReady? 'more' : ''}
            onPress={() => {
              if (!this.props.bleStatus.deviceReady) return
              this.state.navigation.navigateWithDebounce('DeviceName')
            }}
          />
          <Divider/>
          <ChoiceBar
            title='无线连接'
            value={this._getWifiChoiceBarValue()}
            icon={this.props.bleStatus.deviceReady? 'more' : ''}
            onPress={() => {
              if (!this.props.bleStatus.deviceReady) return
              this.state.navigation.navigateWithDebounce('WifiSetting')
            }}
          />
      	</View>
      	<View style={{flexDirection: 'column', marginBottom: 12}}>
	      	<ChoiceBar
            title='报警提示'
            icon='switch'
            switchValue={this.props.deviceSetting.alarm}
            toggleSwitch={this._toggleAlarm}
          />
	      	<ChoiceBar
            title='按键声音'
            icon='switch'
            switchValue={this.props.deviceSetting.keySound}
            toggleSwitch={this._toggleKeySound}
          />
	      	<ChoiceBar
            title='按键振动'
            icon='switch'
            switchValue={this.props.deviceSetting.keyVibrate}
            toggleSwitch={this._toggleKeyVibrate}
          />
      	</View>
      	<ChoiceBar title='关于机器' onPress={() => {
          if (!this.props.bleStatus.deviceReady) return
          this.state.navigation.navigateWithDebounce('DeviceInfo')
        }}/>
      </View>

    );
  }
}

const mapStateToProps = state => {
  return {
    bleStatus: state.bleStatus,
    bleInfo: state.bleInfo,
    deviceSetting: state.deviceSetting
  }
}

const mapDispatchToProps = dispatch => {
  return {
    bleOnSaveDeviceSetting: settings => {
      dispatch(bleOnSaveDeviceSetting(settings))
    }
  }
}

const DeviceSettingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceSetting)

export default DeviceSettingContainer
