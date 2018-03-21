import React, {Component} from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

export class ChoiceBar extends Component {
  render() {
    return (
      <View>
        <Text style={styles.choiceTitle}>{this.props.title}</Text>
        <Text style={styles.choiceValue}>{this.props.value}</Text>
        <Image style={styles.more} source={require('../../images/more.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  choiceTitle: {

  },
  choiceValue: {

  },
  more: {

  },
});