import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet,TouchableWithoutFeedback,TextInput, Keyboard } from 'react-native';
import { Divider } from './Templates';
import Toast from 'react-native-root-toast';
import { toUTF8Array } from '../utils/util.js'
import bleService from '../services/bleServiceFaker.js'
import { stepStateChange } from '../actions/showStep.js'

class Step4 extends React.Component {
  static navigationOptions = {
    title: '开机向导',
  };

  state= {
    wifiSSID: '',
    wifiPass: '',
    wifiSSIDReady: false,
    wifiPassReady: false,
  };

  //listen to hiding keyboard action
  componentDidMount () {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidHideListener.remove();
  }

  _lengthCheck = (value) => {
    if (value !== '') {
      let utf8Name = toUTF8Array(value)
      if (utf8Name.length > 20) {
        switch (value) {
          case this.state.wifiSSID:
            let toast1 = Toast.show('WIFI名字太长啦', {
              duration: Toast.durations.SHORT,
              position: Toast.positions.CENTER,
              shadow: false,
              animation: false,
              hideOnPress: true,
            });
            this.setState({wifiSSIDReady: false})
            break;
          case this.state.wifiPass:
            let toast2 = Toast.show('WIFI密码太长啦', {
              duration: Toast.durations.SHORT,
              position: Toast.positions.CENTER,
              shadow: false,
              animation: false,
              hideOnPress: true,
            });
            this.setState({wifiPassReady: false})
            break;
          default:
            break;
        }
      } else {
        switch (value) {
          case this.state.wifiSSID:
            this.setState({wifiSSIDReady: true})
            break;
          case this.state.wifiPass:
            this.setState({wifiPassReady: true})
            break;
          default:
            break;
        }
      }
    }
  };

  _keyboardDidHide = () => {
    this._lengthCheck(this.state.wifiSSID)
    this._lengthCheck(this.state.wifiPass)
  };

  _connectWifi = (ssid, pass) => {
    bleService.setWifi(ssid, pass);
    this.props.onStepStateChange({show:false})
  };

  render() {

    return (
      <View style={{ flex: 1, flexDirection:'column', alignItems: 'center',}}>
        <Text style={{fontSize: 24,color: '#232323',marginTop: 59}}>4/4 第四步</Text>
        <Text style={{fontSize: 17,color: '#232323',marginTop: 18.5}}>输入WiFi信息</Text>
        <View style={{flexDirection: 'column', marginTop: 72, backgroundColor: '#fff', width: 375}}>
          <View style={styles.choiceBar}>
            <Text style={styles.choiceTitle}>名称</Text>
            <TextInput
              style={styles.input}
              value={this.state.wifiSSID}
              onChangeText={(text) => this.setState({wifiSSID: text})}
              onBlur={() => this._lengthCheck(this.state.wifiSSID)}
              onSubmitEditing={() => this._lengthCheck(this.state.wifiSSID)}
              onKeyPress={() => this._lengthCheck(this.state.wifiSSID)}
              placeholder='请输入WiFi名称'
              underlineColorAndroid='transparent'
            />
          </View>
          <Divider />
          <View style={styles.choiceBar}>
            <Text style={styles.choiceTitle}>密码</Text>
            <TextInput
              style={styles.input}
              value={this.state.wifiPass}
              onChangeText={(text) => this.setState({wifiPass: text})}
              onBlur={() => this._lengthCheck(this.state.wifiPass)}
              onSubmitEditing={() => this._lengthCheck(this.state.wifiPass)}
              onKeyPress={() => this._lengthCheck(this.state.wifiPass)}
              underlineColorAndroid='transparent'
              keyboardType='numeric'
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableWithoutFeedback onPress={()=>this.props.onStepStateChange({show:false})}>
            <View style={[styles.btn, styles.btnOutline]}>
              <Text style={[styles.btnText, styles.btnOutlineText]}>略过</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {
            if(!this.props.bleStatus.deviceReady || !this.state.wifiSSIDReady || !this.state.wifiSSIDReady) return
              this._connectWifi(this.state.wifiSSID, this.state.wifiPass)
          }}>
            <View style={this.props.bleStatus.deviceReady && this.state.wifiSSIDReady && this.state.wifiPassReady ? styles.btn : styles.btnDisabled}>
              <Text style={this.props.bleStatus.deviceReady && this.state.wifiSSIDReady && this.state.wifiPassReady ? styles.btnText : styles.btnDisabledText}>连接</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    marginTop:138.5,
    flexDirection:'row',
    marginLeft: 27,
    marginRight: 27,
    justifyContent: 'space-between'
  },
  btn: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#383838',
    height: 35,
    width:153.5,
    borderRadius: 5,
    marginLeft: 7,
  },
  btnText: {
    color:'#FFFFFF',
    fontSize: 16,
  },
  btnDisabled: {
    backgroundColor: '#cacaca',
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
    height: 35,
    width:152.5,
    borderRadius: 5,
    marginLeft: 7,
  },
  btnDisabledText: {
    color: '#6a6a6a',
    fontSize: 16,
  },
  btnOutline: {
    borderWidth: 1,
    borderColor:'#353535',
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    marginRight: 7,
  },
  btnOutlineText: {
    color: '#353535',
  },
  choiceBar: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft:18,
    paddingRight: 38,
  },
  choiceTitle: {
    fontSize:17,
    color:'#232323',
    marginLeft:19,
  },
  input:{
    width:250,
    fontSize:17,
    color:'#878787',
    textAlign: 'right'
  }
});

const mapStateToProps = state => {
  return {
    bleStatus: state.bleStatus,
    bleInfo: state.bleInfo,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStepStateChange: state => {
      dispatch(stepStateChange(state))
    }
  }
}

const Step4Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step4)

export default Step4Container