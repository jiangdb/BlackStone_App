import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// message component on the top
export class Message extends Component {
  render() {
    return (
      <View style={styles.messageContainer}>
        <Ionicons name="ios-alert" size={23} color='tomato'/>
        <Text style={styles.message}>当前蓝牙不可用，请检查你的蓝牙设置</Text>
        {/*-- icon and content depends on whether it is 'warn' or 'info' --*/}
      </View>
    );
  }
}

// single choice-bar component for whole app
export class ChoiceBar extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <TouchableOpacity style={[styles.choiceBar]} onPress={this.props.onPress}>
        <Text style={styles.choiceTitle}>{this.props.title}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center'}}>
          <Text style={styles.choiceValue}>{this.props.value}</Text>
          {/*-- value next to icon, eg:'未连接' --*/}
          <Image style={styles.more} source={this.props.icon} />
          {/*-- icon here can be 'more', 'check', or none --*/}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  messageContainer: {
    height: 100,
    flex: 0.3,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffdfe0',
  },
  message: {
    color:'#6f5153',
    fontSize:30,
  },
  choiceBar: {
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginLeft:37,
  },
  choiceTitle: {
    fontSize:34,
    color:'#232323',
    marginLeft:28,
  },
  choiceValue: {
    marginRight:14,
    fontSize:34,
    color:'#878787',
  },
  more: {
    marginRight:28,
  },
});
