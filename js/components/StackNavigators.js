import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Index from './Index';
import About from './About';
import Mine from './Mine.js';
import Details from './Details';

const HomeStack = StackNavigator({
  Home: { screen: Index },
  Details: { screen: Details },
});

const MineStack = StackNavigator({
  Mine: { screen: Mine},
  About: { screen: About }
});

module.exports = {
  Home: HomeStack,
  Mine: MineStack,
};
