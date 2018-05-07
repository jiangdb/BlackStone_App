import React from 'react';
import { connect } from 'react-redux'
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';

class DeviceUpgrade extends React.Component {
  static navigationOptions = {
    title: '设备升级',
    tabBarVisible: false,
  };

  state = {
    version:''
  }

  render() {
    return (
      <View style={{ flexDirection: 'column', marginTop: 8}}>
        <View style={{ flexDirection: 'column', backgroundColor: '#fff'}}>
          <Image source={require('../../images/fw_upgrade.png')} style={styles.upgradeImg} />
          <View style={styles.versionRow}>
            <View style={styles.devider}></View>
            <Text style={styles.version}>{this.state.version}</Text>
            <View style={styles.devider}></View>
          </View>
        </View>
        <TouchableWithoutFeedback style={styles.btnWrapper}>
          <View style={[styles.btn, this.props.bleInfo.wifiStatus ==='connected'? : styles.btnDisabled]}>
            <Text style={[styles.btnText,this.props.bleInfo.wifiStatus ==='connected'? : styles.btnTextDisabled]}>立刻升级</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={[styles.warnWrapper, this.props.bleInfo.wifiStatus ==='connected'? {display: 'none'} : ]}>
          <Text style={{fontSize:15,color:'#3E3E3E'}}>Wi-Fi未连接，无法更新</Text>
          <TouchableWithoutFeedback style={{marginLeft:10}} onPress={() => this.props.navigation.navigate('WifiSettings')}>
            <View>
              <Text style={{fontSize:15,color:'#53B2F0'}}>去设置</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'column',
    marginTop: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  upgradeImg: {
    width:109,
    height:91,
    marginTop:40,
  },
  versionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  version:{
    width:107,
    height:26,
    fontSize:24,
    color:'#0C0C0C',
    lineHeight:26,
    textAlign:'center',
  },
  divider: {
    width:94,
    height:0.5,
    borderStyle: 'solid',
    borderTopWidth: 0.5,
    borderTopColor: '#d7d7d7'
  },
  btnWrapper: {
    marginTop:30,
    flexDirection:'row',
    justifyContent:'center'
  },
  btn: {
    flexDirection:'row',
    justifyContent:'center',
    height:47,
    width:335,
    backgroundColor:'#383838',
    borderStyle:'solid',
    borderWidth: 1,
    borderColor: 'rgba(5,5,5,0.08)',
    borderRadius:5，
  },
  btnDisabled: {
    backgroundColor:'#CACACA',
  },
  btnText: {
    fontSize:18,
    color:'#FFFFFF',
    lineHeight:47,
  },
  btnTextDisabled: {
    color:'#6A6A6A',
  },
  warnWrapper: {
    flexDirection:'row',
    justifyContent:'center',
    marginTop:14,
  }
})

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