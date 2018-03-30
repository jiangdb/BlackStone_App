import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

export default class Mine extends React.Component {
  static navigationOptions = {
    title: 'Mine',
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        { /* other code from before here */ }
        <Button
          title="About us"
          onPress={() => this.props.navigation.navigate('About')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
