import React from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { ChoiceBar,Divider,Message } from './Templates';
import { selectDevice, unselectDevice } from '../actions/deviceScan.js'

class DeviceScan extends React.Component {
  static navigationOptions = {
    title: '连接设备',
    tabBarVisible: false,
  };

  // render device list item
  _renderItem = ({item}) => {
    if (!item.deviceConnect) {
      return (
        <Text style={styles.deviceList} onPress={this._onPressItem.bind(this)}>{item.deviceName}</Text>
      );
    }
  };

  // function when press on the device item
  _onPressItem = ({item}) => {
    this.props.onSelectDevice({
      selectedDevice: {
        deviceName: item.deviceName,
        connectState: '已连接',
      },
    });

  };

  //function user turn off the switch
  _onSwitchOff = () => {
    this.props.onUnselectDevice({
      selectedDevice: {
        deviceName: '',
        connectState: '未连接',
      },
    });
  };

  render() {
    return (
      <View style={{ flexDirection: 'column'}}>
        <View style={{ flexDirection: 'column', marginTop: 18,backgroundColor: '#fff'}}>
  	      	{/*<ChoiceBar title={this.props.deviceScan.selectedDevice.connectState} value={this.props.deviceScan.selectedDevice.deviceName} icon='switch'/>*/}
        </View>
        <Text style={styles.listTitle}>可连接设备</Text>
        <Text style={styles.warnMessage}>如果设备已经与其它手机相连，请在另一台手机小程序中断开或者退出小程序</Text>
        {/*<FlatList
          style={{backgroundColor: '#fff'}}
          data={this.props.deviceScan.device}
          ItemSeparatorComponent={() => <Divider/> }
          renderItem={this._renderItem.bind(this)}
        />*/}
        {console.log(this.props.deviceScan)}
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
    onSelectDevice: deviceItem => {
      dispatch(selectDeivce(deviceItem))
    },
    onUnselectDevice: deviceItem => {
      dispatch(unselectDeivce(deviceItem))
    }
  }
}

const DeviceScanContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceScan)

export default DeviceScanContainer