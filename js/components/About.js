import React from 'react';
import { Text, View } from 'react-native';

export default class About extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>About US!</Text>
      </View>
    );
  }
}
