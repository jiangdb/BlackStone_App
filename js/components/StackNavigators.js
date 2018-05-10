import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import IndexContainer from './Index';
import About from './About';
import MineContainer from './Mine.js';
import CoffeeSettingsContainer from './CoffeeSettings';
import BeanCategoryContainer from './BeanCategory';
import CoffeeBuilderContainer from './CoffeeBuilder';
import DeviceScanContainer from './DeviceScan';
import DeviceSettingContainer from './DeviceSetting';
import DeviceInfoContainer from './DeviceInfo';
import DeviceName from './DeviceName';
import DeviceUpgradeContainer from './DeviceUpgrade';
import WifiSettingContainer from './WifiSetting';
import SaveRecordContainer from './SaveRecord';
import FlavorSelectContainer from './FlavorSelect';
import AccessoriesSelectContainer from './AccessoriesSelect';

const HomeStack = StackNavigator({
  Home: { screen: IndexContainer },
  CoffeeSettings: { screen: CoffeeSettingsContainer },
  BeanCategory: { screen: BeanCategoryContainer },
  CoffeeBuilder: { screen: CoffeeBuilderContainer },
  SaveRecord: { screen: SaveRecordContainer },
  FlavorSelect: { screen: FlavorSelectContainer },
  AccessoriesSelect: { screen: AccessoriesSelectContainer },
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
  DeviceName: { screen: DeviceName },
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

