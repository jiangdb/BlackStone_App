import React from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, Image, TouchableHighlight,ScrollView } from 'react-native';
import { Divider } from './Templates';
import bleService from '../services/bleServiceFaker.js'

class CoffeeBuilder extends React.Component {
  static navigationOptions = {
    title: '开始冲煮',
    tabBarVisible: false,
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
        // bleService.enableWeightNotify(true)
      }else{
        // bleService.enableWeightNotify(false)
        this.setState({
          timerCount: this.state.timerCount - 1,
        });
      }
    },1000);
  };

  componentWillUnmount() {
    // bleService.enableWeightNotify(false)
  }

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
              <Text style={styles.targetValue}>{this.props.coffeeSettings.timeMintue+':'+this.props.coffeeSettings.timeSecond}</Text>
                <View style={{flexDirection:'row',alignItems: 'center'}}>
                  <Image style={styles.targetIcon} source={require('../../images/icon_time.png')} />
                <Text style={styles.targetName}>目标时间</Text>
                </View>
              </View>
              <View style={styles.divider}></View>
              <View style={{flexDirection:'column',height:46.5, width:187.5,alignItems:'center'}}>
              <Text style={styles.targetValue}>{this.props.coffeeSettings.waterWeight}</Text>
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
        <View style={styles.readerContainer}>
          <View style={{flexDirection:'column'}}>
            <Text style={styles.readerTitle}>咖啡萃取量(g)</Text>
            <Text style={styles.reader}>{this.props.ble.weight.extract.toFixed(1)}</Text>
          </View>
          <View style={{flexDirection:'column'}}>
            <Text style={styles.readerTitle}>注水总量(g)</Text>
            <Text style={styles.reader}>{this.props.ble.weight.total.toFixed(1)}</Text>
          </View>
          <View style={styles.btnClear}>
            <Text style={styles.btnClearText} onPress={ bleService.scaleSetZero }>归零</Text>
          </View>
        </View>
        {this._getBuilderComponent()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  readerContainer: {
    flexDirection: 'row' ,
    justifyContent:'space-between',
    alignItems: 'center',
    height:121.5,
    backgroundColor:'#ebedee',
  },
  readerTitle: {
    color: '#5B5B5B',
    fontSize: 13,
    marginTop: 17,
    marginLeft: 35,
  },
  reader: {
    fontWeight: 'bold',
    color: '#232323',
    fontSize: 45,
    marginLeft: 35,
    marginBottom: 22.5,
  },
  btnClear: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 30,
    borderColor: '#232323',
    borderStyle: 'solid',
    borderWidth: 1,
    width: 58,
    height: 58,
    marginTop:31.5,
    marginRight:30,
    marginBottom:32,
    marginLeft:30,
  },
  btnClearText: {
    color: '#232323',
    fontSize: 15,
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
});

const mapStateToProps = state => {
  return {
    coffeeSettings: state.coffeeSettings,
    ble: state.ble
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const CoffeeBuilderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoffeeBuilder)

export default CoffeeBuilderContainer