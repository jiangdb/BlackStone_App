import React from 'react';
import { View, Image, StyleSheet,ImageBackground } from 'react-native';

export default class Step0 extends React.Component {
  static navigationOptions = {
    title: 'TIMEMORE Labs',
    tabBarVisible: false,
  };

  shouldComponentUpdate() {
    setTimeout(function(){
      // if () {
      // }else{
        // this.props.navigation.navigate('Step1');
      // }
    },2000);
  }

  render() {
    return (
      <View style={{ flex:1 }}>
        <Image style={{ width:375 }} source={require('../../images/splashscreen.jpeg')} />
        {/*<ImageBackground style={{width: 375}} source={require('../../images/splashscreen.jpeg')} >
        </ImageBackground>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
});