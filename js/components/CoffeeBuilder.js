import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight,ScrollView } from 'react-native';
import { Divider } from './Templates';
import { Reader } from './Index';

export default class CoffeeBuilder extends React.Component {
  static navigationOptions = {
    title: '开始冲煮',
  };

  state = {
    timerCount: 3,
    mode: 'mode_countDown',
  };

  componentWillMount() {
    this.interval = setInterval(() =>{
      if(this.state.timerCount===1){
        this.interval&&clearInterval(this.interval);
        this.setState({
          mode: 'mode_standBy',
        });
      }else{
        this.setState({
          timerCount: this.state.timerCount - 1,
        });
      }
    },1000);
  };

  _getBuilderComponent = () => {
    switch (this.state.mode) {
      case 'mode_countDown':
        return (
          <View style={{flexDirection:'column', alignItems: 'center', backgroundColor: '#fff'}}>
            <View style={styles.countDown}>
              <Text style={styles.timer}>{this.state.timerCount}</Text>
              <Text style={styles.timerName}>秒倒计时</Text>
            </View>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text style={styles.startSoon}>注水开始自动计时，</Text>
              <Text style={styles.startSoon}>请确认容器内无残水</Text>
            </View>
          </View>
        );
      break;
      case 'mode_standBy':
        return (
          <View style={{backgroundColor:'#fff',alignItems: 'center'}}>
            <View style={styles.target}>
              <View style={styles.targetContainer}>
              <Text style={styles.targetValue}>02:03</Text>
                <View style={{flexDirection:'row',alignItems: 'center'}}>
                  <Image style={styles.targetIcon} source={require('../../images/icon_time.png')} />
                <Text style={styles.targetName}>目标时间</Text>
                </View>
              </View>
              <View style={styles.divider}></View>
              <View style={{flexDirection:'column',height:46.5, width:187.5,alignItems:'center'}}>
              <Text style={styles.targetValue}>240g</Text>
                <View style={{flexDirection:'row',alignItems: 'center'}}>
                  <Image style={styles.targetIcon} source={require('../../images/icon_waterweight.png')} />
                <Text style={styles.targetName}>目标萃取量</Text>
                </View>
              </View>
            </View>

            <View style={{flexDirection:'column', alignItems: 'center'}}>
              <Text style={styles.stopwatchTimer}>00:00</Text>
              <Text style={styles.textTimer}>分：秒</Text>
            </View>
            <View style={{flexDirection: 'row',}}>
              <TouchableHighlight>
                <View style={[styles.button,styles.buttonRestart]}>
                  <Text style={{color:'#353535',fontSize:16}}>重新开始</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight>
                <View style={[styles.button,styles.buttonEnd]}>
                  <Text style={{color:'#fff',fontSize:16}}>结束</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={{flexDirection: 'row',}}>
              <TouchableHighlight>
                <View style={[styles.button,styles.buttonRestart]}>
                  <Text style={{color:'#353535',fontSize:16}}>放弃</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('SaveRecord')}>
                <View style={[styles.button,styles.buttonEnd]}>
                  <Text style={{color:'#fff',fontSize:16}}>保存</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        );
      break;
      default:
        return;
      break;
    }
  };

  render() {
    return (
      <ScrollView style={{ flexDirection: 'column' }}>
        <Reader style={styles.reader}/>
        {this._getBuilderComponent()}
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  reader: {
  flexDirection: 'row' ,
  justifyContent:'space-between',
  alignItems: 'center',
  paddingLeft: 35,
  paddingRight: 30,
  height:121.5,
  backgroundColor:'#ebedee',
  },
  target: {
    flexDirection:'row',
    marginTop:18,
  },
  targetContainer: {
    flexDirection:'column',
    height:46.5,
    width:187.5,
    alignItems:'center',
  },
  targetValue:{
  lineHeight:21,
  fontSize:18,
  color:'#232323',
  },
  targetIcon: {
    width:20,
  height:22,
  },
  targetName: {
  lineHeight:24,
  marginLeft:4.5,
  fontSize:17,
  color:'#5B5B5B',
  },
  divider: {
    width:0.5,
  height:46.5,
  borderLeftWidth:0.5,
  borderStyle:'solid',
  borderLeftColor:'#C7C7C7',
  },
  stopwatchTimer:{
  marginTop:14.5,
  lineHeight:37,
  fontSize:32,
  color:'#232323',
  },
  textTimer:{
  lineHeight:24,
  fontSize:17,
  color:'#A3A3A3',
  },
  button: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    width:152.5,
    height:35,
  marginTop:19.5,
  marginBottom:46.5,
  marginLeft: 7,
  marginRight: 7,
  borderRadius:5,
    borderStyle: 'solid',
    borderWidth:1,
  },
  buttonRestart: {
    borderColor: '#353535',
  },
  buttonEnd: {
    borderColor: '#383838',
  backgroundColor:'#383838',
  },
  countDown: {
    width:250,
    height:250,
    marginTop: 88.5,
    marginBottom: 29.5,
    borderWidth:2.5,
    borderColor:'#c7c7c7',
    borderRadius:125,
    borderStyle: 'dashed',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
  },
  timer: {
    height:175,
  lineHeight:175,
  fontSize:144,
  color:'#75838C',
  },
  timerName: {
    height:21,
  lineHeight:21,
  fontSize:15,
  color:'#a3a3a3',
  },
  startSoon: {
  lineHeight:24,
  fontSize:17,
  color:'#232323',
  }
})