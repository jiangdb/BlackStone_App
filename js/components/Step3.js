import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet,TouchableWithoutFeedback, FlatList } from 'react-native';
import {Divider} from './Templates';
import bleService from '../services/bleServiceFaker.js'
import { stepStateChange } from '../actions/showStep.js'

class Step3 extends React.Component {
  static navigationOptions = {
    title: '开机向导',
  };

  state = {
    selectedDeviceId: null,
    selectedDevice: null,
  };

  //lifecycle method
  componentDidMount() {
    bleService.deviceScanStart();
  };

  //lifecycle method
  componentWillUnmount() {
    bleService.deviceScanStop();
  };

  componentWillReceiveProps(nextProps) {
    if(this.props.bleStatus.connectionState == 'connecting' && nextProps.bleStatus.connectionState == 'disconnected') {
      this.props.navigation.navigate('Failed')
    } else if (this.props.bleStatus.connectionState == 'connecting' && nextProps.bleStatus.connectionState == 'connected') {
      this.props.navigation.navigate('Step4')
    }
  }

  // render device list item
  _renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback onPress={() => {
        this.setState({
          selectedDeviceId: item.id,
          selectedDevice: item
        })
      }}>
        <View style={styles.deviceList}>
          <Text style={styles.deviceListText} >{ item.localName }</Text>
          <Image style={this.state.selectedDeviceId == item.id ? styles.image : {display:'none'}} source={require('../../images/selected.png')}/>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <View style={{flexDirection:'column', alignItems: 'center', flex: 1}}>
        <Text style={{fontSize: 24,color: '#232323',marginTop: 59}}>3/4 第三步</Text>
        <Text style={{fontSize: 17,color: '#232323',marginTop: 18.5}}>选择需要连接的设备</Text>
        <View style={styles.deviceListContainer}>
          <FlatList
            data={this.props.bleScan.deviceScanned}
            ItemSeparatorComponent={() => <Divider/> }
            renderItem={this._renderItem}
            refreshing={this.state.refreshing}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableWithoutFeedback onPress={() => this.props.onStepStateChange({show:false})}>
            <View style={[styles.btn, styles.btnOutline]}>
              <Text style={[styles.btnText, styles.btnOutlineText]}>略过</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {
            if(this.state.selectedDeviceId == null) return
              bleService.deviceConnect(this.state.selectedDevice)
          }}>
            <View style={this.state.selectedDeviceId == null ? styles.btnDisabled : styles.btn}>
              <Text style={this.state.selectedDeviceId == null ? styles.btnTextDisabled : styles.btnText}>连接</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deviceListContainer: {
    marginTop:71.5,
    backgroundColor: '#fff',
    height:112.5,
    width:375
  },
  deviceList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height:55,
    paddingLeft:37,
    paddingRight: 21,
  },
  deviceListText: {
    fontSize:17,
    color:'#232323',
    lineHeight:55,
  },
  image: {
    width:17,
    height: 12.5,
  },
  btnContainer: {
    // flex:1,
    marginTop:138,
    flexDirection:'row',
    marginLeft: 27,
    marginRight: 27,
    justifyContent: 'space-between'
  },
  btn: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#383838',
    height: 35,
    width:153,
    borderRadius: 5,
    marginLeft: 7,
  },
  btnDisabled: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#cacaca',
    height: 35,
    width:153,
    borderRadius: 5,
    marginLeft: 7,
  },
  btnText: {
    color:'#FFFFFF',
    fontSize: 16,
  },
  btnTextDisabled: {
    color:'#6a6a6a',
    fontSize: 16,
  },
  btnOutline: {
    borderWidth: 1,
    borderColor:'#353535',
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    marginRight: 7,
  },
  btnOutlineText: {
    color: '#353535',
  }
});

const mapStateToProps = state => {
  return {
    bleScan: state.bleScan,
    bleStatus: state.bleStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStepStateChange: state => {
      dispatch(stepStateChange(state))
    }
  }
}

const Step3Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step3)

export default Step3Container