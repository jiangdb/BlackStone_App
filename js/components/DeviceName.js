import React from 'react';
import { connect } from 'react-redux'
import { View,TextInput } from 'react-native';
import { bleOnDeviceInfoChange } from '../actions/ble.js'
import { toUTF8Array } from '../utils/util.js'
import Toast from 'react-native-root-toast';
import * as bleService from '../services/bleService.js'

export default class DeviceName extends React.Component {
  static navigationOptions = {
    title: '名称',
    tabBarVisible: false,
  };

  _submitName = (event) => {
    if (event.nativeEvent.text!='') {
      let utf8Name = toUTF8Array(event.nativeEvent.text)
      if (utf8Name.length > 20) {
        let toast = Toast.show('名字太长啦，短点、再短点', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          shadow: false,
          animation: false,
          hideOnPress: true,
        });
        return;
      }
      bleService.setName(event.nativeEvent.text);
      // this.props.bleOnDeviceInfoChange({displayName: event.nativeEvent.text});
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
          autoFocus={true}
        />
      </View>

    );
  }
}
