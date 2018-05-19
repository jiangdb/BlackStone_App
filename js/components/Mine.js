import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View , Image } from 'react-native';
import { ChoiceBar, Divider } from './Templates';
import { addNavigationWithDebounce } from '../utils/util.js'

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

  state = {
    newVersion: true,
    navigation: null,
  };

  componentWillMount() {
    //check if there is a new version of the device
  };

  componentDidMount() {
    this.setState({
      navigation: addNavigationWithDebounce(this.props.navigation)
    })
  }

  _getNewVersionChoiceBar = () => {
    if(this.state.newVersion) {
      return (
        <View style={{flexDirection: 'column'}}>
        <ChoiceBar
          title='机器升级'
          icon='more'
          onPress={() => this.state.navigation.navigateWithDebounce('DeviceUpgrade')}
        />
        <Divider/>
        </View>
      );
    } else {
      return;
    }
  }

  render() {
    return (
      <View style={{ flexDirection: 'column'}}>
        <View style={styles.userContainer}>
          <Image style={styles.userHeader} source={require('../../images/user-header.png')} />
          <Text style={styles.userName}>用户名</Text>
        </View>
        <View style={{ marginBottom: 12}}>
          <ChoiceBar
            title='连接设备'
            value={this.props.bleStatus.deviceReady ? this.props.bleInfo.displayName : '未连接'}
            icon='more'
            onPress={() => this.state.navigation.navigateWithDebounce('DeviceScan')}
          />
        </View>
        <View style={{flexDirection: 'column'}}>
          <ChoiceBar
            title='冲煮记录'
            icon='more'
            onPress={() => this.state.navigation.navigateWithDebounce('History')}
          />
          <Divider/>
          <ChoiceBar
            title='机器设置'
            icon='more'
            onPress={() => this.state.navigation.navigateWithDebounce('DeviceSetting')}
          />
          <Divider/>
          {this._getNewVersionChoiceBar()}
          <ChoiceBar
            title='关于我们'
            icon='more'
            onPress={() => this.state.navigation.navigateWithDebounce('About')}
          />
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
    deviceScan: state.deviceScan,
    bleStatus: state.bleStatus,
    bleInfo: state.bleInfo,
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
