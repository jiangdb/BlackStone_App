import React from 'react';
import { connect } from 'react-redux'
import { Text, View, Image, TouchableWithoutFeedback,StyleSheet } from 'react-native';

let descriptionString = 'test1test1test1test1test1\r\ntest2test2test2test2\r\ntest3test3test3'
class DeviceUpgrade extends React.Component {
  static navigationOptions = {
    title: '设备升级',
    tabBarVisible: false,
  };

  state = {
    version:'1.1',
    description: descriptionString.split('\r\n')
  };

  _getDescription = () => {
    let descriptions = this.state.description.split('\r\n');
    let descriptionContent;

    for (let i = 0; i < descriptions.length; i++) {
      console.log(descriptions[i])
      return <Text style={styles.descriptionContent}>{descriptions[i]}</Text>
    }
  }

  render() {
    return (
      <View style={{ flexDirection: 'column', alignItems: 'center'}}>

        <View style={styles.topContainer}>
          <Image source={require('../../images/fw_upgrade.png')} style={styles.upgradeImg} />
          <View style={styles.versionRow}>
            <View style={styles.divider}></View>
            <Text style={styles.version}>{this.state.version}</Text>
            <View style={styles.divider}></View>
          </View>
          <View style={styles.description}></View>
        </View>

        <TouchableWithoutFeedback>
          <View style={this.props.bleInfo.wifiStatus ==='connected'? styles.btn : styles.btnDisabled}>
            <Text style={this.props.bleInfo.wifiStatus ==='connected'? styles.btnText : styles.btnTextDisabled}>立刻更新</Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={this.props.bleInfo.wifiStatus ==='connected'? {display: 'none'} : styles.warnWrapper}>
          <Text style={{fontSize:15,color:'#3E3E3E'}}>Wi-Fi未连接 , 无法更新</Text>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('WifiSetting')}>
            <View style={{width: 60, height: 30,marginLeft:10}}>
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
    alignItems:'center',
    marginTop: 8,
    backgroundColor: '#fff',
    marginBottom: 30,
    width: 375,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 36.5,
  },
  upgradeImg: {
    width:109,
    height:91,
    marginTop:40,
  },
  versionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  version:{
    height:26,
    fontSize:24,
    color:'#0C0C0C',
    lineHeight:26,
    textAlign:'center',
  },
  divider: {
    height:1,
    borderTopColor: '#d7d7d7',
    borderStyle: 'solid',
    borderTopWidth: 0.5,
    width:94,
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
    borderRadius:5,
  },
  btnDisabled: {
    backgroundColor:'#CACACA',
    flexDirection:'row',
    justifyContent:'center',
    height:47,
    width:335,
    borderStyle:'solid',
    borderWidth: 1,
    borderColor: 'rgba(5,5,5,0.08)',
    borderRadius:5
  },
  btnText: {
    fontSize:18,
    color:'#FFFFFF',
    lineHeight:47,
  },
  btnTextDisabled: {
    color:'#6A6A6A',
    fontSize:18,
    lineHeight:47,
  },
  warnWrapper: {
    flexDirection:'row',
    justifyContent:'center',
    marginTop:14,
  },
  description: {
    width:295,
    paddingTop: 37.5,
    flexDirection: 'column',
  },
  descriptionContent: {
    fontSize:17,
    color:'#767676',
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