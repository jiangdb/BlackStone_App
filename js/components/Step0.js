import React from 'react';
import { View, Image,Dimensions } from 'react-native';

export default class Step0 extends React.Component {
  static navigationOptions = {
    title: 'TIMEMORE Labs',
    tabBarVisible: false,
  };

  render() {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    return (
      <View >
        <Image
          style={{ width: width, height: height }}
          source={require('../../images/splashscreen.jpeg')}
          resizeMode='cover'
        />
      </View>
    );
  }
}