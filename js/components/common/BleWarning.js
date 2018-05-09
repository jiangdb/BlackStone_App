import React, {Component}  from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class BleMessage extends Component {
  render() {
    if(!this.props.bleStatus.btState == 'PoweredOn') {
      return (
        <View style={styles.messageContainer}>
          <Ionicons name="ios-alert" size={23} color='tomato'/>
          <Text style={styles.message}>当前蓝牙不可用，请检查你的蓝牙设置</Text>
          {/*-- icon and content depends on whether it is 'warn' or 'info' --*/}
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  messageContainer: {
    height: 50,
    flexDirection:'row',
    alignItems: 'center',
    backgroundColor: '#ffdfe0',
    paddingLeft: 15,
  },
  message: {
    color:'#6f5153',
    fontSize:15,
    marginLeft: 15,
  },
});

const mapStateToProps = state => {
  return {
    bleStatus: state.bleStatus,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const BleMessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BleMessage)

export default BleMessageContainer
