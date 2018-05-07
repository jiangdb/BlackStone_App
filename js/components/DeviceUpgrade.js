import React from 'react';
import { connect } from 'react-redux'
import { Text, View } from 'react-native';
import { ChoiceBar,Divider } from './Templates';

class DeviceUpgrade extends React.Component {
  static navigationOptions = {
    title: '关于机器',
    tabBarVisible: false,
  };

  render() {
    return (
      <View style={{ flexDirection: 'column', marginTop: 12,backgroundColor: '#fff'}}>
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
  }
}

const DeviceUpgradeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceUpgrade)

export default DeviceUpgradeContainer