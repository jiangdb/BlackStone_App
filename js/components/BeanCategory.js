import React from 'react';
import { Text, View } from 'react-native';
import { CoffeeSetting, Divider } from './Templates';

export default class BeanCategory extends React.Component {
  static navigationOptions = {
    title: '请选择咖啡豆种类',
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <CoffeeSetting title='咖啡豆'/>
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