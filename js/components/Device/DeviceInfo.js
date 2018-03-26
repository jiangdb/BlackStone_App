import React from 'react';
import { Text, View } from 'react-native';
import { ChoiceBar,Divider } from '../Templates';

export default class DeviceInfo extends React.Component {
  static navigationOptions = {
    title: '关于机器',
  };

  render() {
    return (
      <View style={{ flexDirection: 'column', marginTop: 12,backgroundColor: '#fff'}}>
	      	<ChoiceBar title='Model' value=''/>
          <Divider/>
	      	<ChoiceBar title='序列号' value='' />
          <Divider/>
	      	<ChoiceBar title='固件版本' value='' />
      </View>

    );
  }
}