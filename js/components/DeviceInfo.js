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
      <View style={{ flexDirection: 'column', marginTop: 12,backgroundColor: '#fff'}}>
	      	<ChoiceBar title='Model' value=''/>
          <Divider/>
	      	<ChoiceBar title='序列号' value='' />
          <Divider/>
	      	<ChoiceBar title='固件版本' value='' />
      </View>

    );
  }
}

const mapStateToProps = state => {
  return {
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