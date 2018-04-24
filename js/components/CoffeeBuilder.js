import React from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, Image, TouchableHighlight,ScrollView } from 'react-native';
import { Divider } from './Templates';
import bleService from '../services/bleServiceFaker.js'
import WeightReadingContainer from './common/WeightReading.js'
import { AreaChart, Grid, YAxis, XAxis, StackedAreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { LinearGradient, Stop, Defs, Path } from 'react-native-svg'

class CoffeeBuilder extends React.Component {
  static navigationOptions = {
    title: '开始冲煮',
    tabBarVisible: false,
  };

  state = {
    timerCount: 3,
    mode: 'mode_countDown',
    extractData: [0, 30, 40, 65, 134, 123, 160],
    totalData : [0, 40, 63, 103, 255, 247, 400],
    totalSeconds: 0,

    chartData:[
      {
        extract: 0,
        total: 0,
      },
      {
        extract: 30,
        total: 40,
      },
      {
        extract: 40,
        total: 63,
      },
      {
        extract: 66,
        total: 104,
      },
      {
        extract: 138,
        total: 257,
      },
    ],
  };

  componentWillMount() {
    this._startCountDown();
  };

  componentWillUnmount() {
  }

  formatNumber = (n) => {
    n = n.toString()
    return n[1] ? n : '0' + n
  };

  convertSecondToFormatTime = (seconds) => {
    var min = Math.floor(seconds / 60);
    var second = seconds % 60;
    return [min, second].map((n) => this.formatNumber(n)).join(':');
  };

  _startCountDown = () => {
    countdownTimer = setInterval(() =>{
      if(this.state.timerCount===1){
        clearInterval(countdownTimer);
        this.setState({
          mode: 'mode_standBy',
          timerCount: 3,
        });
      }else{
        this.setState({
          timerCount: this.state.timerCount - 1,
        });
      }
    },1000);
 };

  _startTimer = () => {
    // countdown_timer = setInterval(this.countdownTimer, 1000);
    buildingTimer = setInterval(() =>{
      this.setState({totalSeconds: this.state.totalSeconds++});
    },1000);
    console.log(this.state.totalSeconds);
  };

  _stopTimer = () => {
    clearInterval(buildingTimer);
  };

  _stopBuilding = () => {
    this.setState({mode: 'mode_stop'});
    this.stopTimer();
    // bleService.enableWeightNotify(false);
  };

  _onRestart = () => {
    this.setState({
      mode: 'mode_countDown',
    });
    this._startCountDown();
  }

  _getBuilderComponent = () => {
    if(this.state.mode==='mode_countDown') {
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
    } else {
      // setInterval( ()=> {
      //   this.state.extract.push(this.props.bleWeightNotify.extract.toFixed(1));
      //   this.state.total.push(this.props.bleWeightNotify.total.toFixed(1));
      // }, 100);
      //   console.log(this.state.extract);
        const GradientExtract = ({ index }) => (
          <Defs key={index}>
              <LinearGradient id={'data-gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
                  <Stop offset={'100%'} stopColor={'#E7DCC8'} stopOpacity={0.3}/>
                  <Stop offset={'30%'} stopColor={'#E0B870'} stopOpacity={0.71}/>
              </LinearGradient>
          </Defs>
        );
        const GradientTotal = ({ index }) => (
          <Defs key={'index'}>
              <LinearGradient id={'data2-gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
                  <Stop offset={'100%'} stopColor={'#B9E1F5'} stopOpacity={0.3}/>
                  <Stop offset={'30%'} stopColor={'#83C0E8'} stopOpacity={0.91}/>
              </LinearGradient>
          </Defs>
        );
        const LineExtract = ({ line }) => (
          <Path
              key={'line'}
              d={line}
              stroke={'#DFB86F'}
              fill={'none'}
          />
        );
        const LineTotal = ({ line }) => (
          <Path
              key={'line'}
              d={line}
              stroke={'#53B2F0'}
              fill={'none'}
          />
        );

        const keys = ['extract', 'total'];
        const colors = [ 'rgb(138, 0, 230, 0.8)', 'rgb(173, 51, 255, 0.8)']


      return (
        <View style={{backgroundColor:'#fff',alignItems: 'center'}}>
          <View style={styles.chartContainer}>
            <View style={ { height: 200 } }>
              <StackedAreaChart
                  style={ { flex: 1 } }
                  contentInset={ { top: 10, bottom: 10 } }
                  data={ this.state.chartData }
                  keys={ keys }
                  colors={ colors }
                  curve={ shape.curveNatural }
              >
                <Grid/>
                <LineExtract/>
                <LineTotal/>
                <GradientExtract/>
                <GradientTotal/>
              </StackedAreaChart>
              <YAxis
                style={ { position: 'absolute', top: 0, bottom: 0 }}
                data={ StackedAreaChart.extractDataPoints(this.state.chartData, keys) }
                contentInset={{ top: 10, bottom: 10 }}
                svg={{
                    fill: '#232323',
                    fontSize: 13,
                }}
                numberOfTicks={ 5 }
              />
              {/*<AreaChart
                              style={ { flex: 1 } }
                              data={ this.state.extractData }
                              svg={{ fill: 'url(#data-gradient)' }}
                              contentInset={ { top: 20, bottom: 20 } }
                              curve={ shape.curveNatural }
                            >
                              <Grid/>
                              <LineExtract/>
                              <GradientExtract/>
                            </AreaChart>
                            <AreaChart
                              style={ StyleSheet.absoluteFill }
                              data={ this.state.totalData }
                              svg={{ fill: 'url(#data2-gradient)' }}
                              contentInset={ { top: 20, bottom: 20 } }
                              curve={ shape.curveNatural }
                            >
                            <LineTotal/>
                            <GradientTotal/>
                            </AreaChart>*/}
            </View>
          </View>
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
            <Text style={styles.targetValue}>{this.props.coffeeSettings.waterWeight}g</Text>
              <View style={{flexDirection:'row',alignItems: 'center'}}>
                <Image style={styles.targetIcon} source={require('../../images/icon_waterweight.png')} />
              <Text style={styles.targetName}>目标萃取量</Text>
              </View>
            </View>
          </View>

          <View style={{flexDirection:'column', alignItems: 'center'}}>
            <Text style={styles.stopwatchTimer}>
              {this.convertSecondToFormatTime(this.state.totalSeconds)}
            </Text>
            <Text style={styles.textTimer}>分：秒</Text>
          </View>

          <View style={this.state.mode==='mode_stop' ? {display: 'none'} : {flexDirection: 'row'}}>
            <TouchableHighlight onPress={this._onRestart}>
              <View style={[styles.button,styles.buttonRestart]}>
                <Text style={{color:'#353535',fontSize:16}}>重新开始</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={this._stopBuilding}>
              <View style={[styles.button,styles.buttonEnd]}>
                <Text style={{color:'#fff',fontSize:16}}>结束</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={this.state.mode==='mode_stop' ? {flexDirection: 'row'} : {display: 'none'}}>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('Home')}>
              <View style={[styles.button,styles.buttonRestart,{width:86}]}>
                <Text style={{color:'#353535',fontSize:16}}>放弃</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('SaveRecord')}>
              <View style={[styles.button,styles.buttonEnd,{width:215.5}]}>
                <Text style={{color:'#fff',fontSize:16}}>保存</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
  };

  render() {
    return (
      <ScrollView style={{ flexDirection: 'column' }}>
        <View style={styles.readerContainer}>
          <WeightReadingContainer
            type='extract'
            readerStyle={styles.reader}
            readerTitleStyle={styles.readerTitle}
          />
          <WeightReadingContainer
            type='total'
            readerStyle={styles.reader}
            readerTitleStyle={styles.readerTitle}
          />
          <View style={styles.btnClear}>
            <Text style={styles.btnClearText} onPress={ bleService.setZero }>归零</Text>
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
  },
  chartContainer: {
    width:360,
    height:200,
    marginTop:30.5,
    paddingRight:15,
    paddingLeft:15,
  }
});

const mapStateToProps = state => {
  return {
    coffeeSettings: state.coffeeSettings,
    bleWeightNotify: state.bleWeightNotify,
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