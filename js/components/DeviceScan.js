import React from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, FlatList, ActivityIndicator, } from 'react-native';
import { ChoiceBar,Divider,Message } from './Templates';
import { selectDevice, unselectDevice } from '../actions/device.js'
import bleService from '../services/bleServices.js'

class DeviceScan extends React.Component {
  state = {
    switchValue: true,
    refreshing: true,
    connectState: '未连接',
    switchIcon:'',
  };

  static navigationOptions = {
    title: '连接设备',
    tabBarVisible: false,
  };

  //lifecycle method
  componentDidMount = () => {
    bleService.deviceScanStart();
  };

  //lifecycle method
  componentWillUnmount = () => {
  };

  // render device list item
  _renderItem = ({item}) => {
    return (
      <Text
        style={styles.deviceList}
        onPress={this._onPressItem(item)}
      >{ item.localName }</Text>
    );
    console.log(item);
  };

  // function when press on the device item
  _onPressItem = ({item}) => {
    // console.log({item});
    // bleService.deviceConnect(item);
    this.setState({
      connectState: '已连接',
      switchIcon:'switch',
    });
    console.log(this.props.ble.deviceInfo);
  };

  //function user turn off the switch
  _onSwitchOff = () => {
    let selectedDevicekey = this.props.deviceScan.selectedDevice.deviceKey;
    let selectedDeviceName = this.props.deviceScan.selectedDevice.deviceName;
    this.props.onUnselectDevice({selectedDevicekey,selectedDeviceName});
  };

  render() {
    return (
      <View style={{ flexDirection: 'column'}}>
        <View style={{ flexDirection: 'column', marginTop: 18,backgroundColor: '#fff'}}>
	      	<ChoiceBar
            title={this.state.connectState}
            value={this.props.ble.deviceInfo.localName}
            icon={this.state.switchIcon}
            switchValue={this.state.switchValue}
            toggleSwitch={this._onSwitchOff}
          />
        </View>
        <Text style={styles.listTitle}>可连接设备</Text>
        <Text style={styles.warnMessage}>如果设备已经与其它手机相连，请在另一台手机小程序中断开或者退出小程序</Text>
        <FlatList
          style={{backgroundColor: '#fff'}}
          data={this.props.ble.deviceScanned}
          ItemSeparatorComponent={() => <Divider/> }
          renderItem={this._renderItem}
          refreshing={this.state.refreshing}
          keyExtractor={item => item.id}
          // onRefresh={this._onRefresh}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  listTitle: {
    lineHeight:42,
    marginLeft:20,
    fontSize:12,
    color:'#8F8F8F',
  },
  warnMessage: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    fontSize:12,
    color:'#8F8F8F',
    lineHeight:14,
  },
  deviceList: {
    lineHeight:55,
    paddingLeft:20,
    fontSize:17,
    color:'#232323',
  }
});

const mapStateToProps = state => {
  return {
    deviceScan: state.deviceScan,
    ble: state.ble,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectDevice: device => {
      dispatch(selectDevice(device))
    },
    onUnselectDevice: device => {
      dispatch(unselectDevice(device))
    }
  }
}

const DeviceScanContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceScan)

export default DeviceScanContainer