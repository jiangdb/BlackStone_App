import React from 'react';
import { connect } from 'react-redux'
import { Text, View } from 'react-native';
import { ChoiceBar,Divider } from './Templates';

class DeviceInfo extends React.Component {
  static navigationOptions = {
    title: '关于机器',
    tabBarVisible: false,
  };

  render() {
    return (
      <View style={{ flexDirection: 'column', marginTop: 8,backgroundColor: '#fff'}}>
      	<ChoiceBar title='Model' value={this.props.bleInfo.modelNum}/>
        <Divider/>
      	<ChoiceBar title='序列号' value={this.props.bleInfo.serialNum} />
        <Divider/>
      	<ChoiceBar title='固件版本' value={this.props.bleInfo.fwVersion} />
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

const DeviceInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceInfo)

export default DeviceInfoContainer