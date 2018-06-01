import React from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import { ChoiceBar,Divider,Message } from './Templates';
import bleService from '../services/bleService.js'
import BleMessageContainer from './common/BleWarning.js'
import { bleDeviceForget } from '../actions/ble.js'
import Loader from './common/Loader.js'

class DeviceScan extends React.Component {
  state = {
    loading: false,
    refreshing: true,
    switchValue: false,
  };

  static navigationOptions = {
    title: '连接设备',
    tabBarVisible: false,
  };

  //lifecycle method
  componentDidMount = () => {
    if (this.props.bleStatus.deviceReady) { 
      this.setState({
        switchValue: true
      });
    }

    bleService.deviceScanStart();
  };

  //lifecycle method
  componentWillUnmount = () => {
    bleService.deviceScanStop();
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.bleStatus.deviceReady && nextProps.bleStatus.deviceReady) {
      this.setState({
        switchValue: true,
        loading: false
      });
    } else if (this.props.bleStatus.connectionState != 'disconnected' && nextProps.bleStatus.connectionState == 'disconnected') {
      this.setState({
        loading: false
      });
    }
  }

  // render device list item
  _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={this._onPressItem.bind(this, item)}
        activeOpacity={0.5}
      >
        <Text style={styles.deviceList} >{ item.localName }</Text>
      </TouchableOpacity>
    );
  };

  // function when press on the device item
  _onPressItem = (device) => {
    this.setState({
      loading: true
    });
    bleService.deviceConnect(device.id);
  };

  //function user turn off the switch
  _onSwitchOff = (device) => {
    this.setState({
      switchValue: false,
      loading: true
    });
    bleService.deviceDisconnect(device);
    this.props.forgetDevice();
  };

  render() {
    return (
      <View style={{ flexDirection: 'column'}}>
        <Loader loading={this.state.loading} onClose={()=>{ this.setState({loading: false})}}/>
        <BleMessageContainer/>
        <View style={{ flexDirection: 'column', marginTop: 18,backgroundColor: '#fff'}}>
          <ChoiceBar
            title={this.props.bleStatus.connectionState == 'connected' ? '已连接' : '未连接'}
            value={this.props.bleInfo.displayName}
            icon={this.props.bleInfo.displayName ? 'switch' : ''}
            switchValue={this.state.switchValue}
            toggleSwitch={this._onSwitchOff}
          />
        </View>
        <Text style={styles.listTitle}>可连接设备</Text>
        <Text style={styles.warnMessage}>如果设备已经与其它手机相连，请在另一台手机小程序中断开或者退出小程序</Text>
        <FlatList
          data={this.props.bleScan.deviceScanned}
          ItemSeparatorComponent={() => <Divider/> }
          renderItem={this._renderItem}
          refreshing={this.state.refreshing}
          keyExtractor={item => item.id.toString()}
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
    paddingLeft:32,
    fontSize:17,
    color:'#232323',
    backgroundColor: '#fff'
  }
});

const mapStateToProps = state => {
  return {
    deviceScan: state.deviceScan,
    bleInfo: state.bleInfo,
    bleStatus: state.bleStatus,
    bleScan: state.bleScan,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    forgetDevice: () => {
      dispatch(bleDeviceForget())
    }
  }
}

const DeviceScanContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceScan)

export default DeviceScanContainer
