import React from 'react';
import { Text, View } from 'react-native';
import { CoffeeSetting } from './Templates';

export default class CoffeeSettings extends React.Component {
  static navigationOptions = {
    title: '设置参数',
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <CoffeeSetting title='咖啡豆' component='choiceBar'/>
        <CoffeeSetting title='粉重（g）'/>
        <CoffeeSetting title='粉液比（1：N）'/>
        <CoffeeSetting title='萃取量（g）' component='input'/>
        <CoffeeSetting title='时间设置（分：秒）'/>
        <CoffeeSetting title='水温（℃）' component='input'/>
        <CoffeeSetting title='研磨度' component='input'/>
      </View>
    );
  }
}