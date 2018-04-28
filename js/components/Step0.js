import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default class Step0 extends React.Component {
  static navigationOptions = {
    title: 'TIMEMORE Labs',
    tabBarVisible: false,
  };

  componentDidMount() {
    setTimeout(function(){
      // if (app.globalData.started) {
        // wx.switchTab({ url: "../../index/index" })
      // }else{
        this.props.navigation.navigate('Step1');
      // }
    },2000);
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        <Image source={require('../../images/splashscreen.jpeg')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});