import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default class About extends React.Component {
  static navigationOptions = {
    title: '关于我们',
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent:'space-between',}}>
        <Image source={require('../../images/banner.png')}  style={{ flex: 1, resizeMode: 'contain',}}/>
        <View style={{ flex: 1, flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', justifyContent:'flex-start', marginLeft:25}}>
            <Image source={require('../../images/quote_left.png')}/>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={styles.content}>TIMEMORE泰摩是专注于手制咖啡器具</Text>
            <Text style={styles.content}>设计研发的中国品牌</Text>
            <Text style={styles.content}>我们以专业+美学为设计理念</Text>
            <Text style={styles.content}>做好每一个有价值的咖啡产品</Text>
            <Text style={styles.content}>把咖啡的魅力带给更多人</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent:'flex-end', marginRight:25}}>
            <Image source={require('../../images/quote_right.png')} />
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent:'flex-end'}}>
            <Text style={styles.version}>v1.0</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    lineHeight:30,
    fontSize:16,
    color:'#02121F',
  },
  version: {
    marginBottom:10,
    fontSize:12,
    color:'#AAAAAA',
  },
});