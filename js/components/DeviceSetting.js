import React from 'react';
import { Text, View } from 'react-native';
import { ChoiceBar } from './Templates';

export default class DeviceSetting extends React.Component {
  static navigationOptions = {
    title: '机器设置',
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', marginTop: 25}}>
        <View style={{flexDirection: 'column', backgroundColor:'#fff', marginBottom: 25}}>
	      	<ChoiceBar title='名称' value='蓝牙未连接'/>
	      	<ChoiceBar title='无线连接' value='蓝牙未连接'/>
      	</View>
      	<View style={{flexDirection: 'column', backgroundColor:'#fff', marginBottom: 25}}>
	      	<ChoiceBar title='报警提示' icon='switch'/>
	      	<ChoiceBar title='按键声音' icon='switch'/>
	      	<ChoiceBar title='按键振动' icon='switch'/>
      	</View>
      	<View style={{backgroundColor:'#fff'}}>
	      	<ChoiceBar title='关于机器'/>
      	</View>
      </View>

    );
  }
}