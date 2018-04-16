import React from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { ChoiceBar,Divider,Message } from './Templates';

class DeviceScan extends React.Component {
  static navigationOptions = {
    title: '连接设备',
    tabBarVisible: false,
  };

  state = {
    device: [
      {
        key: 1,
        deviceName: 'name1',
        deviceConnect: false,
      },
      {
        key: 2,
        deviceName: 'name2',
        deviceConnect: false,
      }
    ]
  };



  // function when press on the device item
  _onPressItem = (item) => {

  }

  render() {
    return (
      <View style={{ flexDirection: 'column'}}>
        <View style={{ flexDirection: 'column', marginTop: 18,backgroundColor: '#fff'}}>
  	      	<ChoiceBar title='未连接' value=''/>
        </View>
        <Text style={styles.listTitle}>可连接设备</Text>
        <Text style={styles.warnMessage}>如果设备已经与其它手机相连，请在另一台手机小程序中断开或者退出小程序</Text>
        <FlatList
          style={{backgroundColor: '#fff'}}
          data={this.state.device}
          ItemSeparatorComponent={() => <Divider/> }
          // render device list item
          renderItem={({item}) =>
            <Text style={styles.deviceList} onPress={this._onPressItem.bind(this)}>{item.deviceName}</Text>
          }
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