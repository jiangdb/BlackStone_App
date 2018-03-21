import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Index from './Index';
import Mine from './Mine';
import About from './About';

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
  Details: { screen: DetailsScreen },
});

const MineStack = StackNavigator({
  Mine: { screen: Mine },
  About: { screen: About }
});

module.exports = {
  Home: HomeStack,
  Mine: MineStack,
};
