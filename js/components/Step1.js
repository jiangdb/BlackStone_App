import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet,TouchableWithoutFeedback } from 'react-native';

class Step1 extends React.Component {
  static navigationOptions = {
    title: '开机向导',
    tabBarVisible: false,
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection:'columns', alignContent:'center'}}>
        <View style={{marginTop: 59}}>
          <Text style={{fontSize: 24,color: '#232323'}}>1/4 第一步</Text>
        </View>
        <View style={{marginTop: 18.5}}>
          <Text style={{fontSize: 17,color: '#232323'}}>请在手机设置中打开蓝牙</Text>
        </View>
        <Image source={require('../../images/guide_1.png')}/>
        <TouchableWithoutFeedback style={{marginTop:60}}>
          <View style={[styles.btn, {backgroundColor: '#cacaca'}]}>
            <Text style={[styles.btnText, {color: '#6a6a6a'}]}>下一步</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    display:flex,
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor: '#383838',
    height: 35,
    width:153.5,
    borderRadius: 5,
  },
  btnText: {
    color:'#FFFFFF',
    fontSize: 16,
  }
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

const Step1Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step1)

export default Step1Container