import React from 'react';
import { Text, View } from 'react-native';
import { ChoiceBar } from './Templates';

export default class DeviceInfo extends React.Component {
  static navigationOptions = {
    title: '关于机器',
  };

  render() {
    return (
      <View style={{ flexDirection: 'column', marginTop: 25,backgroundColor: '#fff'}}>
	      	<ChoiceBar title='Model' value=''/>
	      	<ChoiceBar title='序列号' value='' />
	      	<ChoiceBar title='固件版本' value='' />
      </View>

    );
  }
}