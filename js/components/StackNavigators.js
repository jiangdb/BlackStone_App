import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import IndexContainer from './Index';
import About from './About';
import Mine from './Mine.js';

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
  Home: { screen: IndexContainer },
});

const MineStack = StackNavigator({
  Mine: { screen: Mine},
  About: { screen: About }
});
 
module.exports = {
  Home: HomeStack,
  Mine: MineStack,
};
