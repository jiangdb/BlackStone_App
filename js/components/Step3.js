import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet,TouchableWithoutFeedback, ScrollView } from 'react-native';

class Step3 extends React.Component {
  static navigationOptions = {
    title: '开机向导',
    tabBarVisible: false,
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection:'columns', alignContent:'center'}}>
        <View style={{marginTop: 59}}>
          <Text style={{fontSize: 24,color: '#232323'}}>3/4 第三步</Text>
        </View>
        <View style={{marginTop: 18.5}}>
          <Text style={{fontSize: 17,color: '#232323'}}>选择需要连接的设备</Text>
        </View>
        <ScrollView style={styles.deviceList}>
        </ScrollView>
        <View style={styles.btnContainer}>
          <TouchableWithoutFeedback>
            <View style={[styles.btn, styles.btnOutline]}>
              <Text style={[styles.btnText, styles.btnOutlineText]}>略过</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={[styles.btn, {backgroundColor: '#cacaca'}]}>
              <Text style={[styles.btnText, {color: '#6a6a6a'}]}>连接</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deviceList: {
    height:112.5;
    marginTop:71.5;
  },
  btnContainer: {
    marginTop:138.5,
    flexDirection:'row',
    marginLeft: 27,
    marginRight: 27,
    justifyContent: 'space-between'
  },
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
  },
  btnOutline: {
    borderWidth: 1,
    borderColor:'#353535',
    borderStyle: 'solid',
    backgroundColor: 'transparent',
  },
  btnOutlineText: {
    color: '#353535',
  }
});

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const Step3Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step3)

export default Step3Container