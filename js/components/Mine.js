import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Button, Text, View , Image } from 'react-native';
import { ChoiceBar, Divider } from './Templates';

class Mine extends React.Component {
  static navigationOptions = {
    title: 'TIMEMORE Labs',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      alignSelf: 'center',
      fontWeight: 'normal',
    }
  };

  render() {
    return (
      <View style={{ flexDirection: 'column'}}>
        <View style={styles.userContainer}>
          <Image style={styles.userHeader} source={require('../../images/user-header.png')} />
            <Text style={styles.userName}>用户名</Text>
        </View>
        <View style={{backgroundColor:'#fff', marginBottom: 12}}>
          <ChoiceBar
            title='连接设备'
            value={this.props.deviceScan.selectedDevice.connectState=='未连接'? this.props.deviceScan.selectedDevice.connectState : this.props.deviceScan.selectedDevice.deviceName}
            icon='more'
            onPress={() => this.props.navigation.navigate('DeviceScan')}
          />
        </View>
        <View style={{backgroundColor:'#fff', flexDirection: 'column'}}>
          <ChoiceBar title='冲煮记录' icon='more' onPress={() => this.props.navigation.navigate('History')}/>
          <Divider/>
          <ChoiceBar title='机器设置' icon='more' onPress={() => this.props.navigation.navigate('DeviceSetting')}/>
          <Divider/>
          <ChoiceBar title='关于我们' icon='more' onPress={() => this.props.navigation.navigate('About')}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  withBorder: {
    borderColor :'#E0DEDE',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  userContainer: {
    height:140,
    flexDirection: 'column',
    backgroundColor:'#fff',
    marginBottom: 12,
    justifyContent:'center',
    alignItems:'center',
  },
  userHeader: {
    width:55,
    height:55,
    marginTop:18,
    borderRadius:28,
    resizeMode: 'cover',
  },
  userName: {
    marginTop:2,
    height:25,
    fontSize:18,
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
  }
}

const MineContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Mine)

export default MineContainer