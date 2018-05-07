import React from 'react';
import { connect } from 'react-redux'
import { View,TextInput } from 'react-native';
import { bleOnDeviceInfoChange } from '../actions/ble.js'

class DeviceName extends React.Component {
  static navigationOptions = {
    title: '名称',
    tabBarVisible: false,
  };

  _submitName = (event) => {
    if (event.nativeEvent.text!='') {
      // let utf8Name = util.toUTF8Array(event.nativeEvent.text)
      // if (utf8Name.length > btService.MAX_WRITE_BYTES) {
      //   wx.showToast({
      //     title: "名字太长啦，短点、再短点",
      //     icon: 'none',
      //     duration: 2000
      //   })
      //   return;
      // }
      this.props.bleOnDeviceInfoChange({displayName: event.nativeEvent.text});
    }
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={{marginTop: 10, height: 55, backgroundColor:'#fff'}}>
        <TextInput
          style={{ height: 55, fontSize:17, color:'#232323', paddingLeft: 32, paddingRight: 32}}
          onSubmitEditing={this._submitName}
          underlineColorAndroid='transparent'
        />
      </View>

    );
  }
}

const mapStateToProps = state => {
  return {
    bleInfo: state.bleInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    bleOnDeviceInfoChange: info => {
      dispatch(bleOnDeviceInfoChange(info))
    },
  }
}

const DeviceNameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceName)

export default DeviceNameContainer