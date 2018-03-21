import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export class Message extends Component {
  render() {
    return (
      <View style={[styles.flexrow, styles.messageContainer]}>
        <Ionicons name="ios-alert" size={23} color='tomato'/>
        <Text style={styles.message}>当前蓝牙不可用，请检查你的蓝牙设置</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexrow: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
  },
  messageContainer: {
    backgroundColor: '#ffdfe0',
  },
  message: {
    color:'#6f5153',
    fontSize:30,
  },
});