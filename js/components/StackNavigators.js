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
import FailedContainer from './Failed';
import Step0 from './Step0';
import Step1Container from './Step1';
import Step2Container from './Step2';
import Step3Container from './Step3';
import Step4Container from './Step4';

const HomeStack = StackNavigator({
  Home: { screen: IndexContainer },
  CoffeeSettings: { screen: CoffeeSettingsContainer },
  BeanCategory: { screen: BeanCategoryContainer },
  Step0: { screen: Step0 },
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

const StepStack = StackNavigator({
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
  Step: StepStack,
};

