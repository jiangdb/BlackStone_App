import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Index from './Index';
import About from './About';
import Mine from './Mine';
import CoffeeSettings from './CoffeeSettings';
import DeviceSetting from './Device/DeviceSetting';
import DeviceInfo from './Device/DeviceInfo';
import BeanCategory from './BeanCategory';

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}

const HomeStack = StackNavigator({
  Home: { screen: Index },
  CoffeeSettings: { screen: CoffeeSettings },
  BeanCategory: { screen: BeanCategory },
});

const MineStack = StackNavigator({
  Mine: { screen: Mine},
  About: { screen: About },
  DeviceSetting: { screen: DeviceSetting },
  DeviceInfo: { screen: DeviceInfo },
});

module.exports = {
  Home: HomeStack,
  Mine: MineStack,
};