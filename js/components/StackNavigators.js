import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import IndexContainer from './Index';
import About from './About';
import Mine from './Mine.js';
import CoffeeSettingsContainer from './CoffeeSettings';
import BeanCategoryContainer from './BeanCategory';
import DeviceScanContainer from './DeviceScan';

const HomeStack = StackNavigator({
  Home: { screen: IndexContainer },
  CoffeeSettings: { screen: CoffeeSettingsContainer },
  BeanCategory: { screen: BeanCategoryContainer },
});

const MineStack = StackNavigator({
  Mine: { screen: Mine},
  About: { screen: About },
  DeviceScan: { screen: DeviceScanContainer },
});

module.exports = {
  Home: HomeStack,
  Mine: MineStack,
};
