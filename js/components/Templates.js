import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Switch,} from 'react-native';
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

  getIcon = () => {
    switch (this.props.icon) {
      case 'more':
        return <Image style={styles.icon} source={require('../../images/more.png')} />;
      break;
      case 'switch':
        return <Switch />;
      break;
      default:
        return;
      break;
    }
  }

  render() {
    return (
      <TouchableOpacity style={[styles.choiceBar]} onPress={this.props.onPress}>
        <Text style={styles.choiceTitle}>{this.props.title}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center'}}>
          <Text style={styles.choiceValue}>{this.props.value}</Text>
          {/*-- value next to icon, eg:'未连接' --*/}
          {this.getIcon()}
          {/*-- icon value can be 'more', 'check','switch' or none --*/}
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
    paddingRight: 32,
  },
  choiceTitle: {
    fontSize:34,
    color:'#232323',
    marginLeft:28,
  },
  choiceValue: {
    fontSize:34,
    color:'#878787',
  },
  icon: {
    marginLeft:14,
  },
});