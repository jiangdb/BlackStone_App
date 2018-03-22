import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Index from './Index';
import About from './About';
import Mine from './Mine';
import Details from './Details';
import DeviceSetting from './DeviceSetting';

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
  Details: { screen: Details },
});

const MineStack = StackNavigator({
  Mine: { screen: Mine},
  About: { screen: About },
  DeviceSetting: { screen: DeviceSetting },
});

module.exports = {
  Home: HomeStack,
  Mine: MineStack,
};