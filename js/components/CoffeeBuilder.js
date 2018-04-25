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
        <View style={{flexDirection:'column', alignItems: 'center', backgroundColor: '#fff', minHeight: 217}}>
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
        const colors = [ 'rgb(223, 184, 111, 0.5)', 'rgb(83, 178, 240, 0.5)']

        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 };
        const xAxisHeight = 30;


      return (
        <View style={{backgroundColor:'#fff',alignItems: 'center'}}>
          <View style={styles.chartContainer}>
            {/*<View style={ { width: 360, height: 200, flexDirection: 'row', justifyContent: 'space-between' } }>
              {/*<YAxis
                data={ [0,100,200,300] }
                contentInset={{ top: 10, bottom: 10 }}
                svg={{
                    fill: '#232323',
                    fontSize: 13,
                }}
                numberOfTicks={ 5 }
              />
              <StackedAreaChart
                style={ { flex: 1 } }
                contentInset={ { top: 10, bottom: 10 } }
                data={ this.state.chartData }
                keys={ keys }
                colors={ colors }
                curve={ shape.curveNatural }
                  >
                  <Grid/>
              </StackedAreaChart>*/}

              {/*<YAxis
                  data={[0,100,200,300,400]}
                  contentInset={verticalContentInset}
                  svg={axesSvg}
                  numberOfTicks={5}
              />
              <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                <View style={{width: 330,height: 170, position: 'relative'}}>
                  <AreaChart
                    style={ {position: 'absolute', height: auto} }
                    data={ this.state.extractData }
                    svg={{ fill: 'url(#data-gradient)' }}
                    contentInset={ { top: 20, bottom: 20 } }
                    curve={ shape.curveNatural }
                    >
                    <LineExtract/>
                    <GradientExtract/>
                  </AreaChart>
                  <AreaChart
                    style={ {position: 'absolute'} }
                    data={ this.state.totalData }
                    svg={{ fill: 'url(#data2-gradient)' }}
                    contentInset={ { top: 20, bottom: 20 } }
                    curve={ shape.curveNatural }
                  >
                    <Grid/>
                    <LineTotal/>
                    <GradientTotal/>
                  </AreaChart>
                </View>

                <XAxis
                  data={this.state.totalData}
                  formatLabel={(value, index) => index}
                  contentInset={{ left: 10, right: 10 }}
                  svg={axesSvg}
                  numberOfTicks={6}
                />
              </View>
            </View>*/}
            <Chart/>
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

class Chart extends React.Component {
  render() {
    let Highcharts='Highcharts';
    let conf={
            chart: {
                type: 'area',
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series_1 = this.series[0];
                        var series_2 = this.series[1];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random();
                            series_1.addPoint([x, y], true, true);
                        }, 1000);
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random();
                            series_2.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
              title: {
                text: ''
              },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            plotOptions: {
              series: {
                fillColor: {
                  linearGradient: {
                      x1: 0,
                      y1: 0,
                      x2: 0,
                      y2: 1
                  },
                }
              }
            },
            legend: {
              itemDistance: 30,
              itemStyle: {
                  color: '#000000',
                  fontSize: 13,
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
                    var data = [],
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
                  linearGradient: {
                      x1: 0,
                      y1: 0,
                      x2: 0,
                      y2: 1
                  },
                  stops: [
                      [0, 'rgb(131, 192, 232, .91)'],
                      [1, 'rgb(185, 225, 245, .3)']
                  ]
                },
              } , {
                name: '咖啡萃取量',
                data: (function () {
                    // generate an array of random data
                    var data = [],
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
                  linearGradient: {
                      x1: 0,
                      y1: 0,
                      x2: 0,
                      y2: 1
                  },
                  stops: [
                      [0, 'rgb(224, 184, 112, .71)'],
                      [1, 'rgb(231, 220, 200, .3)']
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
    return(
      <ChartView
        style={{width: 360, height: 200,}}
        config={conf}
        options={options}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      >
      </ChartView>
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