import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Switch, TextInput, TouchableWithoutFeedback} from 'react-native';
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

// divider
export class Divider extends Component {
  render() {
    return (
      <View style={styles.divider}>
      </View>
    );
  }
}

// single choice-bar component for whole app
export class ChoiceBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      switchValue: this.props.switchValue,
    }
  }

  // toggleSwitch = () => {
  //   this.setState({switchValue: !this.state.switchValue});
  // }

  getIcon = () => {
    switch (this.props.icon) {
      case 'more':
        return <Image style={styles.icon} source={require('../../images/more.png')} />;
      break;
      case 'switch':
        return <Switch onValueChange={this.props.toggleSwitch} value={this.props.switchValue} />;
      break;
      default:
        return;
      break;
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.choiceBar}>
          <Text style={styles.choiceTitle}>{this.props.title}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center'}}>
            <Text style={styles.choiceValue}>{this.props.value}</Text>
            {/*-- value next to icon, eg:'未连接' --*/}
            {this.getIcon()}
            {/*-- icon value can be 'more', 'check','switch' or none --*/}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    height:1,
    borderTopColor: '#E0DEDE',
    borderStyle: 'solid',
    borderTopWidth: 0.5,
    marginLeft: 18,
  },
  messageContainer: {
    height: 50,
    flexDirection:'row',
    alignItems: 'center',
    backgroundColor: '#ffdfe0',
    paddingLeft: 15,
  },
  message: {
    color:'#6f5153',
    fontSize:15,
    marginLeft: 15,
  },
  choiceBar: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginLeft:18,
    paddingRight: 16,
  },
  choiceTitle: {
    fontSize:17,
    color:'#232323',
    marginLeft:14,
  },
  choiceValue: {
    fontSize:17,
    color:'#878787',
  },
  icon: {
    marginLeft:7,
    width:8,
    height:13,
  },
});