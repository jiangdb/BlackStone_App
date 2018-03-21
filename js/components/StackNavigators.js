import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Index from './Index';
import Mine from './Mine';

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
});

module.exports = {
  Home: HomeStack,
  Mine: MineStack,
};
