import React from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, Image, TouchableHighlight,ScrollView } from 'react-native';
import { Divider } from './Templates';
import bleService from '../services/bleServiceFaker.js'
import WeightReadingContainer from './common/WeightReading.js'
import { AreaChart, Grid, YAxis, XAxis, StackedAreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { LinearGradient, Stop, Defs, Path, Circle, Svg } from 'react-native-svg'
import { convertSecondToFormatTime } from '../utils/util.js'
import ChartView from 'react-native-highcharts';

class CoffeeBuilder extends React.Component {
  static navigationOptions = {
    title: '开始冲煮',
    tabBarVisible: false,
  };

  state = {
    timerCount: 3,
    mode: 'mode_countDown',
    extractData: this.props.bleWeightNotify.extract,
    totalData : this.props.bleWeightNotify.total,
    chartExtract:[],
    chartTotal:[],

    totalSeconds: 0,
  };



  componentWillMount() {
    this._startCountDown();
  };

  componentWillUnmount() {
  }

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
        <View style={styles.countDownContainer}>
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

      let y_max = Math.floor(this.state.totalData*1.3);

      let Highcharts='Highcharts';
      let conf={
        chart: {
          type: 'area',
          marginTop: 30.5,
          events: {
            load: function () {
              // set up the updating of the chart each second
              let seriesTotal = this.series[0];
              let seriesExtract = this.series[1];
              setInterval(function () {
                  let x = (new Date()).getTime(), // current time
                      y = Math.random();
                  seriesTotal.addPoint([x, y], true, true);
              }, 1000);
              setInterval(function () {
                  let x = (new Date()).getTime(), // current time
                      y = Math.random();
                  seriesExtract.addPoint([x, y], true, true);
              }, 1000);

            }
          }
        },
        title: null,
        tooltip: false,
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
        },
        yAxis: {
          // min: 0,
          // max: y_max,
          title: null,
          plotLines: [{
            value: 0,
            width: 1,
            color: '#333'
          }]
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              }
            },
            marker: {
              enabled: false,
            },
            lineWidth: 1,
            threshold: null
          }
        },
        legend: {
          margin: 5,
          itemDistance: 30,
          itemStyle: {
            fontSize: 13,
            fontWeight: 'normal',
            color: '#000',
          }
        },
        exporting: {
          enabled: false
        },
        series: [
          {
            name: '注水总量',
            data: (function () {
                // generate an array of random data
              let data = [],
                  time = (new Date()).getTime(),
                  i;

              for (i = -19; i <= 0; i += 1) {
                data.push({
                    x: time + i * 1000,
                    y: Math.random()
                });
              }
              return data;
            }()),
            color: '#53B2F0',
            fillColor: {
              stops: [
                [0.3, 'rgba(131, 192, 232, .9)'],
                [1, 'rgba(185, 225, 245, 0)']
              ]
            },
          } , {
            name: '咖啡萃取量',
            data: (function () {
              // generate an array of random data
              let data = [],
                  time = (new Date()).getTime(),
                  i;

              for (i = -19; i <= 0; i += 1) {
                data.push({
                    x: time + i * 1000,
                    y: Math.random()
                });
              }
              return data;
            }()),
            color: '#DFB86F',
            fillColor: {
              stops: [
                [0.3, 'rgba(224, 184, 112, .9)'],
                [1, 'rgba(231, 220, 200, 0)']
              ]
            },
          }
        ]
      };
      const options = {
        global: {
            useUTC: false
        },
        lang: {
            decimalPoint: ',',
            thousandsSep: '.'
        }
      };

      return (
        <View style={{backgroundColor:'#fff',alignItems: 'center'}}>
          <View style={styles.chartContainer}>
            <ChartView
              style={{height:220,width:345}}
              config={conf}
              options={options}
              javaScriptEnabled={true}
              domStorageEnabled={true}
            >
            </ChartView>
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
              {convertSecondToFormatTime(this.state.totalSeconds)}
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
    paddingTop:18,
    marginTop: -20,
    backgroundColor: '#fff'
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
    fontWeight: 'bold'
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
  countDownContainer: {
    flexDirection:'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  countDown: {
    width:250,
    height:250,
    marginTop: 58.5,
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
    paddingLeft: 15,
    paddingRight: 15,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    width: 100,
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