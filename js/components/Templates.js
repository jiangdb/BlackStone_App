import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Switch, TextInput, TouchableWithoutFeedback} from 'react-native';

// divider
export class Divider extends Component {
  render() {
    return (
      <View style={styles.divider}>
      </View>
    );
  }
}

// single coffee detail component
export class SingleDetail extends Component {
  render() {
    return (
      <View style={styles.detailContainer}>
        <Image style={styles.settingIcon} source={this.props.img} />
        <Text style={styles.settingName}>{this.props.name}</Text>
        <Text style={styles.settingValue}>{this.props.value}</Text>
        <TouchableWithoutFeedback  onPress={() => {Alert.alert('pressed');}}>
          <View>
            <Text style={{marginLeft:10, fontSize:13, color:'#53B2F0'}}>{this.props.text}</Text>
          </View>
        </TouchableWithoutFeedback>
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
            <Text
              style={styles.choiceValue}
              numberOfLines={1}
              ellipsizeMode='tail'
            >{this.props.value}</Text>
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
    width: 250,
    textAlign:'right'
  },
  icon: {
    marginLeft:7,
    width:8,
    height:13,
  },
  detailContainer: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width:187.5,
  },
  settingIcon: {
    width: 20,
    height: 22,
    marginTop:5,
    marginLeft:20,
  },
  settingName: {
    color: '#5B5B5B',
    marginLeft: 7,
    lineHeight:32,
    fontSize:15,
  },
  settingValue: {
    fontWeight: 'bold',
    color: '#232323',
    overflow: 'hidden',
    marginLeft:10,
    lineHeight:32,
    fontSize:15,
  },
});