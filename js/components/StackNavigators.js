import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import IndexContainer from './Index';
import About from './About';
import MineContainer from './Mine.js';
import CoffeeSettingsContainer from './CoffeeSettings';
import BeanCategoryContainer from './BeanCategory';
import DeviceScanContainer from './DeviceScan';
import HistoryDetailContainer from './HistoryDetail';
import HistoryContainer from './History';

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

module.exports = {
  Home: HomeStack,
  Mine: MineStack,
};

