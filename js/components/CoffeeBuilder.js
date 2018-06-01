import React from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, Image, TouchableOpacity,ScrollView } from 'react-native';
import { Divider } from './Templates';
import bleService from '../services/bleService.js'
import WeightReadingContainer from './common/WeightReading.js'
import WeightChartDualContainer from './common/WeightChartDual.js'
import WeightChartSingleContainer from './common/WeightChartSingle.js'
import BuildingTimerContainer from './common/BuildingTimer.js'
import { coffeeBuilderModeChange,coffeeBuilderQueueData,removeLastSecondData,saveChartData } from '../actions/coffeeBuilder.js'
import Toast from 'react-native-root-toast';
import { debounce } from '../utils/util.js'

class CoffeeBuilder extends React.Component {
  static navigationOptions = {
    title: '开始冲煮',
    tabBarVisible: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      scaleNumber: 1,
      toastVisible: false,
      timerCount: 3,
    };
    this.willBlurSubscription = null
    this.didFocusSubscription = null
  }

  componentWillMount() {
    this.props.onModeChange('countDown')
  };

  componentDidMount() {
    this._startCountDown()
    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      payload => {
        //start notify when component mounted
        bleService.enableWeightNotify(false)
      }
    );
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        if (this.props.bleStatus.deviceReady) {
          //start notify when component mounted
          bleService.enableWeightNotify(true)
        }
      }
    );
    let weight = bleService.readWeight();
    if (weight.extract != null) {
      this.setState({
        scaleNumber: 2,
      })
    }
  };

  componentWillUnmount() {
    this.props.onModeChange('idle')
    this.willBlurSubscription.remove()
    this.didFocusSubscription.remove()
  }

  componentWillReceiveProps(nextProps) {
    //console.log('coffeeBuilder componentWillReceiveProps')

    // check ble status for enable/disable notify
    if ( !this.props.bleStatus.deviceReady  && nextProps.bleStatus.deviceReady) {
      //device ready
      bleService.enableWeightNotify(true)
    } else if ( this.props.bleStatus.deviceReady  && !nextProps.bleStatus.deviceReady) {
      //device disconnected
      bleService.enableWeightNotify(false)
    }

    //check weight to update mode and queue data
    if (this.props.bleWeightNotify.index != nextProps.bleWeightNotify.index) {
      if (this.props.coffeeBuilder.mode == "pending") {
        if ( nextProps.bleWeightNotify.total > 0.5 ) {
          this.props.onModeChange('working')
          this.props.onDataChange(nextProps.bleWeightNotify)
        }
      } else if (this.props.coffeeBuilder.mode == "working") {
        this.props.onDataChange(nextProps.bleWeightNotify)
        if ( nextProps.bleWeightNotify.total <= 0 ) {
          this.props.onModeChange('done');
          this.props.autoFinish()
        }
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log('coffeeBuilder shouldComponentUpdate')
    //check mode
    //countDown: timer update
    if (this.props.coffeeBuilder.mode == 'countDown') {
      if (this.state.timerCount != nextState.timerCount) {
        //count down timer
        return true
      }
    }

    if (((this.props.coffeeBuilder.mode == 'idle') && (nextProps.coffeeBuilder.mode != 'countDown'))       //idle --> countDown
       || ((this.props.coffeeBuilder.mode == 'countDown') && (nextProps.coffeeBuilder.mode == 'pending'))  //countDown --> pending
       || ((this.props.coffeeBuilder.mode == 'pending') && (nextProps.coffeeBuilder.mode == 'countDown'))  //pending --> countDown
       || ((this.props.coffeeBuilder.mode == 'pending') && (nextProps.coffeeBuilder.mode == 'done'))       //pending --> done
       || ((this.props.coffeeBuilder.mode == 'working') && (nextProps.coffeeBuilder.mode == 'done'))       //working --> done
      ) {
      return true
    }

    return false
  }

  _startCountDown = () => {
    this.setState({
      timerCount: 3,
    });
    this.interval = setInterval(() =>{
      if(this.state.timerCount===1){
        clearInterval(this.interval);
        this.props.onModeChange('pending');
      }else{
        this.setState({
          timerCount: this.state.timerCount - 1,
        });
      }
    },1000);
    bleService.timerReset()
    bleService.setZero()
  };

  _stopBuilding = () => {
    this.props.onModeChange('done');
  };

  _getBuilderComponent = () => {
    const weightChart = (this.state.scaleNumber == 1)? (
      <WeightChartSingleContainer/>
    ) : (
      <WeightChartDualContainer/>
    );

    switch (this.props.coffeeBuilder.mode) {
      case 'idle':
      case 'countDown':
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
        break;
      default:
        return (
          <View style={{backgroundColor:'#fff',alignItems: 'center'}}>
            {weightChart}

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

            <BuildingTimerContainer/>

            <View style={this.props.coffeeBuilder.mode==='done' ? {display: 'none'} : {flexDirection: 'row',marginTop:19.5,marginBottom:46.5,}}>
              <TouchableOpacity 
                onPress={debounce(()=>{
                  this.props.onModeChange('countDown');
                  this._startCountDown();
                },300)} 
                activeOpacity={1}
              >
                <View style={[styles.button,styles.buttonRestart]}>
                  <Text style={{color:'#353535',fontSize:16}}>重新开始</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._stopBuilding} activeOpacity={1}>
                <View style={[styles.button,styles.buttonEnd]}>
                  <Text style={{color:'#fff',fontSize:16}}>结束</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={this.props.coffeeBuilder.mode==='done' ? {flexDirection: 'row',marginTop:19.5,marginBottom:46.5} : {display: 'none'}}>
              <TouchableOpacity 
                onPress={() => this.props.navigation.goBack()}
                activeOpacity={1}
              >
                <View style={[styles.button,styles.buttonRestart,{width:86}]}>
                  <Text style={{color:'#353535',fontSize:16}}>放弃</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => this.props.navigation.replace('SaveRecord')}
                activeOpacity={1}
              >
                <View style={[styles.button,styles.buttonEnd,{width:215.5}]}>
                  <Text style={{color:'#fff',fontSize:16}}>保存</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
        break;
    }
  };

  render() {
    return (
      <ScrollView style={{ flexDirection: 'column' }}>
        <View style={styles.readerContainer}>
          <View style={{ flexDirection: 'row' }}>
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
          </View>
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
    height:121,
    backgroundColor:'#ebedee',
  },
  readerTitle: {
    color: '#5B5B5B',
    fontSize: 13,
    marginTop: 20,
    marginLeft: 35,
  },
  reader: {
    color: '#232323',
    fontSize: 45,
    marginBottom: 22.5,
    marginLeft: 35,
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
    fontFamily:'DINAlternate-Bold',
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
  button: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    width:152.5,
    height:35,
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
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    width: 100,
  }
});

const mapStateToProps = state => {
  return {
    bleStatus: state.bleStatus,
    bleWeightNotify: state.bleWeightNotify,
    coffeeBuilder: state.coffeeBuilder,
    coffeeSettings: state.coffeeSettings,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onModeChange: mode => {
      dispatch(coffeeBuilderModeChange(mode))
    },
    onDataChange: data => {
      dispatch(coffeeBuilderQueueData(data))
    },
    autoFinish: () => {
      dispatch(removeLastSecondData())
    }
  }
}

const CoffeeBuilderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoffeeBuilder)

export default CoffeeBuilderContainer
