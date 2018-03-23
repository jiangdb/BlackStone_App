import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, Switch, TextInput} from 'react-native';
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

// devider
export class Devider extends Component {
  render() {
    return (
      <View style={styles.devider}>
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

  toggleSwitch = () => {
    this.setState({switchValue: !this.state.switchValue});
  }

  getIcon = () => {
    switch (this.props.icon) {
      case 'more':
        return <Image style={styles.icon} source={require('../../images/more.png')} />;
      break;
      case 'switch':
        return <Switch onValueChange={this.toggleSwitch} value={this.state.switchValue} />;
      break;
      default:
        return;
      break;
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={[styles.choiceBar]}>
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

// single input field component for coffee setting page
export class CoffeeSetting extends Component {
  constructor(props) {
    super(props);
    this.state = { input: 'setting value' };
  }

  getComponent = () => {
    switch (this.props.component) {
      case 'input':
        return <TextInput
                style={styles.settingInput}
                onChangeText={(input) => this.setState({input})}
                value={this.state.input}/>;
      break;
      case 'choiceBar':
        return (
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('DeviceSetting')}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={styles.settingInput}>曼特宁</Text>
              <Image style={styles.icon} source={require('../../images/more.png')} />
            </View>
          </TouchableWithoutFeedback>
        );
      break;
      default:
        return;
      break;
    }
  }

  render() {
    return (
      <View style={styles.settingContainer}>
        <Text style={styles.settingTitle}>{this.props.title}</Text>
        {this.getComponent()}
        {/*-- icon value can be 'input', 'choiceBar','datePicker' or 'ratio' --*/}
        <Devider/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  devider: {
    height:2,
    borderTopColor: '#E0DEDE',
    borderStyle: 'solid',
    borderTopWidth: 1,
  },
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
  settingContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft:42,
    backgroundColor: '#fff',
  },
  settingTitle: {
    lineHeight:37,
    marginTop: 19,
    fontSize:26,
    color:'#5B5B5B',
  },
  settingInput: {
    lineHeight:67,
    marginTop:9,
    marginBottom:18,
    fontSize:48,
    color:'#232323',
  }
});