import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { ChoiceBar } from './Templates';


export default class Mine extends React.Component {
  static navigationOptions = {
    title: 'Mine',
  };

  render() {
    return (
      <View style={{ flex: 1}}>
      	<ChoiceBar title='冲煮记录'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});