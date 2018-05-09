import React, {Component}  from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground } from 'react-native';

class BuildingButton extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row',justifyContent:'center'}}>
        <TouchableWithoutFeedback
          onPress={this.props.onPressButton}
        >
          <ImageBackground
            style={styles.btnStart}
            source={this.props.bleStatus.deviceReady ? require('../../../images/btnStart.png') : require('../../../images/disabled-btnStart.png')} >
            <Text style={this.props.bleStatus.deviceReady ? styles.btnStartText : styles.disabledBtnStartText}>开始冲煮</Text>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnStart: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 26,
    width:252,
    height:50,
  },
  btnStartText: {
    color:'#fff',
    fontSize: 20,
  },
  disabledBtnStartText: {
    color:'#6A6A6A',
    fontSize: 20,
  },
});

const mapStateToProps = state => {
  return {
    bleStatus: state.bleStatus,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const BuildingButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildingButton)

export default BuildingButtonContainer
