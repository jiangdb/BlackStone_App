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

  componentWillReceiveProps(nextProps) {
    let totalSeconds = Math.floor(nextProps.coffeeBuilder.datas.length / 10)
    if (totalSeconds != this.state.totalSeconds) {
      this.setState({
        totalSeconds: totalSeconds
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.totalSeconds != nextState.totalSeconds)
      return true
    return false
  }

  render() {
    console.log('BuildingTimer render')
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
    fontFamily:'DINAlternate-Bold'
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSaveTimer: seconds => {
      dispatch(saveTimer(seconds))
    }
  }
}

const BuildingTimerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildingTimer)

export default BuildingTimerContainer
