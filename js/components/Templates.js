import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Switch, TextInput, TouchableHighlight,TouchableOpacity } from 'react-native';

// divider
export class Divider extends Component {
  render() {
    return (
      <View style={{paddingLeft: 18, backgroundColor: '#fff'}}>
        <View style={styles.divider}></View>
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
        <TouchableOpacity 
          onPress={this.props.onPress} 
          activeOpacity={1}
        >
          <Text style={{marginLeft:10, fontSize:13, color:'#53B2F0'}}>{this.props.text}</Text>
        </TouchableOpacity>
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
        return <Switch
                onValueChange={this.props.toggleSwitch}
                value={this.props.switchValue}
                onTintColor='#DFB86F'
                tintColor='#ccc'
                thumbTintColor ='#fff'
              />;
      break;
      default:
        return;
      break;
    }
  }

  render() {
    return (
      <TouchableOpacity 
        onPress={this.props.onPress} 
        // underlayColor='#f3f3f3'
        activeOpacity={0.5}
      >
        <View style={styles.choiceBar}>
          <Text style={styles.choiceTitle}>{this.props.title}</Text>
          <View style={{flexDirection: 'row', justifyContent:'flex-end', alignItems:'center'}}>
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
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    height:1,
    borderColor: '#E0DEDE',
    borderStyle: 'solid',
    borderWidth: 0.5,
  },
  choiceBar: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingLeft:18,
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
    textAlign:'right',
    maxWidth: 250,
    width: 'auto',
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