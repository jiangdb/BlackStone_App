import React from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, FlatList, ActivityIndicator, } from 'react-native';
import { ChoiceBar,Divider,Message } from './Templates';
import bleService from '../services/bleServiceFaker.js'

class DeviceScan extends React.Component {
  state = {
    refreshing: true,
    switchValue: true,
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
    bleService.deviceScanStop();
  };

  // render device list item
  _renderItem = ({item}) => {
    return (
      <Text
        style={styles.deviceList}
        onPress={this._onPressItem.bind(this, item)}
      >{ item.localName }</Text>
    );
  };

  // function when press on the device item
  _onPressItem = (device) => {
    bleService.deviceConnect(device);
  };

  //function user turn off the switch
  _onSwitchOff = (device) => {
    this.setState({
      switchValue: false
    });
    bleService.deviceDisconnect(device);
  };

  render() {
    return (
      <View style={{ flexDirection: 'column'}}>
        <View style={{ flexDirection: 'column', marginTop: 18,backgroundColor: '#fff'}}>
          <ChoiceBar
            title={this.props.ble.connectionState ==='connected'? '已连接' : '未连接'}
            value={this.props.ble.connectionState ==='connected'? this.props.ble.device.name: ''}
            icon={this.props.ble.connectionState ==='connected'? 'switch' : ''}
            switchValue={this.props.ble.connectionState ==='connected'? true : false}
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
  }
}

const DeviceScanContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceScan)

export default DeviceScanContainer