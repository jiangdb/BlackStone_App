import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import IndexContainer from './Index';
import About from './About';
import MineContainer from './Mine.js';
import CoffeeSettingsContainer from './CoffeeSettings';
import BeanCategoryContainer from './BeanCategory';
import DeviceScanContainer from './DeviceScan';
import DeviceSettingContainer from './DeviceSetting';
import DeviceInfoContainer from './DeviceInfo';
import DeviceNameContainer from './DeviceName';
import DeviceUpgradeContainer from './DeviceUpgrade';
import WifiSettingContainer from './WifiSetting';

const HomeStack = StackNavigator({
  Home: { screen: IndexContainer },
  CoffeeSettings: { screen: CoffeeSettingsContainer },
  BeanCategory: { screen: BeanCategoryContainer },
},{
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'normal',
      color: 'white',
    },
  },
});

const MineStack = StackNavigator({
  Mine: { screen: MineContainer},
  About: { screen: About },
  DeviceScan: { screen: DeviceScanContainer },
  DeviceSetting: { screen: DeviceSettingContainer },
  DeviceInfo: { screen: DeviceInfoContainer },
  DeviceName: { screen: DeviceNameContainer },
  DeviceUpgrade: { screen: DeviceUpgradeContainer },
  WifiSetting: { screen: WifiSettingContainer },
},{
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'normal',
      color: 'white',
    },
  },
});

module.exports = {
  Home: HomeStack,
  Mine: MineStack,
};

