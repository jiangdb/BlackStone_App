import React from 'react';
import { connect } from 'react-redux'
import { Text, View } from 'react-native';
import { ChoiceBar, Divider } from './Templates';
import * as bleService from '../services/bleServiceFaker.js'

class DeviceSetting extends React.Component {
  static navigationOptions = {
    title: '机器设置',
    tabBarVisible: false,
  };

  state = {
    alarm: false,
    keySound: false,
    keyVibrate: false,
  };

  _toggleAlarm = () => {
    this.setState({alarm: !this.state.alarm});
    bleService.setAlarmEnable(this.state.alarm);
  };

  _toggleKeySound = () => {
    this.setState({keySound: !this.state.keySound});
    bleService.setKeySound(this.state.keySound);
  };

  _toggleKeyVibrate = () => {
    this.setState({keyVibrate: !this.state.keyVibrate});
    bleService.setKeyVibrate(this.state.keyVibrate);
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', marginTop: 12}}>
        {/*<Message/>*/}
        <View style={{flexDirection: 'column', backgroundColor:'#fff', marginBottom: 12}}>
          <ChoiceBar
            title='名称'
            value={this.props.bleStatus.deviceReady? this.props.bleInfo.displayName: '蓝牙未连接'}
            icon={this.props.bleStatus.deviceReady? 'more' : ''}
            onPress={() => this.props.navigation.navigate('DeviceName')}
          />
          <Divider/>
          <ChoiceBar
            title='无线连接'
            value={this.props.bleStatus.deviceReady? '未设置': '蓝牙未连接'}
            icon={this.props.bleStatus.deviceReady? 'more' : ''}
            onPress={() => this.props.navigation.navigate('WifiSetting')}
          />
      	</View>
      	<View style={{flexDirection: 'column', backgroundColor:'#fff', marginBottom: 12}}>
	      	<ChoiceBar
            title='报警提示'
            icon='switch'
            switchValue={this.state.alarm}
            toggleSwitch={this._toggleAlarm}
          />
	      	<ChoiceBar
            title='按键声音'
            icon='switch'
            switchValue={this.state.keySound}
            toggleSwitch={this._toggleKeySound}
          />
	      	<ChoiceBar
            title='按键振动'
            icon='switch'
            switchValue={this.state.keyVibrate}
            toggleSwitch={this._toggleKeyVibrate}
          />
      	</View>
      	<View style={{backgroundColor:'#fff'}}>
	      	<ChoiceBar title='关于机器' onPress={() => this.props.navigation.navigate('DeviceInfo')}/>
      	</View>
      </View>

    );
  }
}

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

const DeviceSettingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceSetting)

export default DeviceSettingContainer