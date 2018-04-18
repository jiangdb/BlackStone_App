import React from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, FlatList, ActivityIndicator, } from 'react-native';
import { ChoiceBar,Divider,Message } from './Templates';
import { selectDevice, unselectDevice } from '../actions/device.js'

class DeviceScan extends React.Component {
  state = {
    switchValue: true,
    loading: true
  };

  static navigationOptions = {
    title: '连接设备',
    tabBarVisible: false,
    headerRight: <ActivityIndicator
              style={{marginRight: 175}}
              animating={true}
              size='small'
              color="#fff"
            />
  };

  //lifecycle method
  componentDidMount = () => {
    this.props.navigation.setParams({ loading: true });
  };

  //lifecycle method
  componentWillUnmount = () => {
    this.props.navigation.setParams({ loading: false });
  };

  // render device list item
  _renderItem = ({item}) => {
    if (!item.deviceConnect) {
      return (
        <Text
          style={styles.deviceList}
          onPress={this._onPressItem.bind(this, item.key, item.deviceName)}
        >{item.deviceName}</Text>
      );
    } else {
      return null;
    }
  };

  // function when press on the device item
  _onPressItem = (key, deviceName) => {
    let selectedDevicekey = this.props.deviceScan.selectedDevice.deviceKey;
    let selectedDeviceName = this.props.deviceScan.selectedDevice.deviceName;
    if(selectedDevicekey!==null) {
      this.props.onUnselectDevice({selectedDevicekey,selectedDeviceName});
      this.props.onSelectDevice({key,deviceName});
    } else {
      this.props.onSelectDevice({key,deviceName});
    }
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
            title={this.props.deviceScan.selectedDevice.connectState}
            value={this.props.deviceScan.selectedDevice.deviceName}
            icon={this.props.deviceScan.selectedDevice.switchIcon}
            switchValue={this.state.switchValue}
            toggleSwitch={this._onSwitchOff}
          />
        </View>
        <Text style={styles.listTitle}>可连接设备</Text>
        <Text style={styles.warnMessage}>如果设备已经与其它手机相连，请在另一台手机小程序中断开或者退出小程序</Text>
        <FlatList
          style={{backgroundColor: '#fff'}}
          data={this.props.deviceScan.devices}
          ItemSeparatorComponent={() => <Divider/> }
          renderItem={this._renderItem.bind(this)}
          refreshing={true}
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
    deviceScan: state.deviceScan
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