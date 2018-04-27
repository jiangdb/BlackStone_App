import React, {Component}  from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import { convertSecondToFormatTime } from '../../utils/util.js'

class BuildingTimer extends Component {

  constructor(props){
    super(props);
    this.state = {
      totalSeconds: 0,
    };
  }

  shouldComponentUpdate () {
    switch (this.props.coffeeBuilder.mode) {
      case 'mode_countDown':
        break;
      case 'mode_pending':
        break;
      case 'mode_working':
        break;
      case 'mode_done':
        clearInterval(this.interval);
        break;
      default:
        break;
    }
  };

  // componentWillReceiveProps (nextProps) {
  //   if(nextProps.start) {
  //     this._startTimer();
  //   } else {
  //     clearInterval(this.interval);
  //   }
  // }

  _startTimer = () => {
      this.interval = setInterval(() =>{
        this.setState({
          totalSeconds: this.state.totalSeconds+1,
        });
      },1000);
  };

  render() {
    return (
      <View style={{flexDirection:'column', alignItems: 'center'}}>
        <Text style={styles.stopwatchTimer}>
          {convertSecondToFormatTime(this.state.totalSeconds)}
        </Text>
        <Text style={styles.textTimer}>分 : 秒</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});

const mapStateToProps = state => {
  return {
    coffeeBuilder: state.coffeeBuilder,
    bleWeightNotify: state.bleWeightNotify,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const BuildingTimerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildingTimer)

export default BuildingTimerContainer
