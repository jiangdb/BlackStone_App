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
      <View style={{flex: 1, flexDirection:'column', alignItems: 'center', backgroundColor: 'white'}}>
        <Text style={{fontSize: 24,color: '#232323',marginTop: 59}}>1/4 第一步</Text>
        <Text style={{fontSize: 17,color: '#232323',marginTop: 18.5}}>请在手机设置中打开蓝牙</Text>
        <Image style={styles.image} source={require('../../images/guide_1.png')}/>
        <TouchableWithoutFeedback onPress={() => {
          if(!this.props.bleStatus.btState == 'PoweredOn') return
          this.props.navigation.navigate('Step2')
        }}>
          <View style={this.props.bleStatus.btState == 'PoweredOn' ? styles.btn : styles.btnDisabled}>
            <Text style={this.props.bleStatus.btState == 'PoweredOn' ? styles.btnText : styles.btnTextDisabled}>下一步</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#383838',
    height: 35,
    width:153.5,
    borderRadius: 5,
  },
  btnDisabled: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#cacaca',
    height: 35,
    width:153.5,
    borderRadius: 5,
  },
  btnText: {
    color:'#FFFFFF',
    fontSize: 16,
  },
  btnTextDisabled: {
    color:'#6a6a6a',
    fontSize: 16,
  },
  image: {
    width:217.5,
    height:211.5,
    marginTop:48.5,
    marginBottom:60,
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