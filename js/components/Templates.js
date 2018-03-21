import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

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
          <Image style={styles.more} source={this.props.icon} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
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
