import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import StackNavigators from './StackNavigators'

export default TabNavigator(
  {
    Home: {
      screen: StackNavigators.Home,
      navigationOptions: {
        title: 'Home',
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused, tintColor}) => {
          const iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        }
      }
    },
    Mine: {
      screen: StackNavigators.Mine,
      navigationOptions: {
        title: 'Mine',
        tabBarLabel: 'Mine',
        tabBarIcon: ({ focused, tintColor}) => {
          const iconName = `ios-options${focused ? '' : '-outline'}`;
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        }
      }
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);