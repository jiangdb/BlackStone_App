import React from 'react';
import { connect } from 'react-redux'
import { Text, View } from 'react-native';
import { ChoiceBar, Divider } from './Templates';
import bleService from '../services/bleServiceFaker.js'

class DeviceSetting extends React.Component {
  static navigationOptions = {
    title: '机器设置',
    tabBarVisible: false,
  };

  state = {
    alarm: false;
    keySound: false;
    keyVibrate: false;
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', marginTop: 12}}>
        <View style={{flexDirection: 'column', backgroundColor:'#fff', marginBottom: 12}}>
	      	<ChoiceBar title='名称' value='蓝牙未连接'/>
          <Divider/>
	      	<ChoiceBar title='无线连接' value='蓝牙未连接' onPress={() => this.props.navigation.navigate('WifiSetting')}/>
      	</View>
      	<View style={{flexDirection: 'column', backgroundColor:'#fff', marginBottom: 12}}>
	      	<ChoiceBar
            title='报警提示'
            icon='switch'
            switchValue={this.state.alarm}
            toggleSwitch={this.setState({alarm: !this.state.alarm})}
          />
	      	<ChoiceBar
            title='按键声音'
            icon='switch'
            switchValue={this.state.keySound}
            toggleSwitch={this.setState({alarm: !this.state.keySound})}
          />
	      	<ChoiceBar
            title='按键振动'
            icon='switch'
            switchValue={this.state.keyVibrate}
            toggleSwitch={this.setState({alarm: !this.state.keyVibrate})}
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