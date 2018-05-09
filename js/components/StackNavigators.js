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
import Step0 from './Step0';
import Step1Container from './Step1';
import Step2Container from './Step2';
import Step3Container from './Step3';
import Step4Container from './Step4';
import SaveRecordContainer from './SaveRecord';
import FlavorSelectContainer from './FlavorSelect';
import AccessoriesSelectContainer from './AccessoriesSelect';

const HomeStack = StackNavigator({
  Home: { screen: IndexContainer },
  CoffeeSettings: { screen: CoffeeSettingsContainer },
  BeanCategory: { screen: BeanCategoryContainer },
  Step0: { screen: Step0 },
  Step1: { screen: Step1Container },
  Step2: { screen: Step2Container },
  Step3: { screen: Step3Container },
  Step4: { screen: Step4Container },
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

