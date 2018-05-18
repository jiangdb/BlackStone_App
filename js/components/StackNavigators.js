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
import HistoryDetailContainer from './HistoryDetail';
import HistoryContainer from './History';
import SaveRecordContainer from './SaveRecord';
import FlavorSelectContainer from './FlavorSelect';
import AccessoriesSelectContainer from './AccessoriesSelect';
import FailedContainer from './getStart/Failed';
import Step1Container from './getStart/Step1';
import Step2Container from './getStart/Step2';
import Step3Container from './getStart/Step3';
import Step4Container from './getStart/Step4';

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
  HistoryDetail: { screen: HistoryDetailContainer },
  History: { screen: HistoryContainer },
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

const GetStartStack = StackNavigator({
  Step1: { screen: Step1Container },
  Step2: { screen: Step2Container },
  Step3: { screen: Step3Container },
  Step4: { screen: Step4Container },
  Failed: { screen: FailedContainer },
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
  GetStartStack: GetStartStack,
};

