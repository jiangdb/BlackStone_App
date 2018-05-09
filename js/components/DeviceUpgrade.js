import React from 'react';
import { connect } from 'react-redux'
import { Text, View, Image, TouchableWithoutFeedback, StyleSheet, Modal, FlatList, ScrollView  } from 'react-native';
import {Svg, Circle} from 'react-native-svg';

let descriptionString = 'test1test1test1test1test1\r\ntest2test2test2test2\r\ntest3test3test3\r\ntest1test1test1test1test1\r\ntest2test2test2test2\r\ntest3test3test3\r\ntest1test1test1test1test1\r\ntest2test2test2test2\r\ntest3test3test3\r\ntest1test1test1test1test1\r\ntest2test2test2test2\r\ntest3test3test3'
class DeviceUpgrade extends React.Component {
  static navigationOptions = {
    title: '设备升级',
    tabBarVisible: false,
  };

  state = {
    modalVisible: false,
    description: descriptionString.split('\r\n'),
    descriptionArray: [],
  };

  componentWillMount() {
    let descriptionArray = [];

    for (let i = 0; i < this.state.description.length; i++) {
      descriptionArray.push({
        key: i,
        content: this.state.description[i]
      })
    }

    this.setState({
      descriptionArray: descriptionArray
    })
  };

  _onUpgrade = () => {
    this.setState({modalVisible: true})
  }

  render() {
    return (
      <ScrollView style={{ flexDirection: 'column'}}>
        <View style={styles.topContainer}>
          <Image source={require('../../images/fw_upgrade.png')} style={styles.upgradeImg} />
          <View style={styles.versionRow}>
            <View style={styles.divider}></View>
            <Text style={styles.version}>{this.props.bleInfo.fwVersion}</Text>
            <View style={styles.divider}></View>
          </View>
          <FlatList
            style={styles.description}
            data={this.state.descriptionArray}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row'}}>
                <Svg height="18" width="40" >
                  <Circle cx="25" cy="9" r="3" fill="#767676" />
                </Svg>
                <Text style={styles.descriptionContent}>{item.content}</Text>
              </View>
            )}
          />
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableWithoutFeedback onPress={() => {
            if(this.props.bleInfo.wifiStatus !=='connected') return
            this._onUpgrade()
          }}>
            <View style={this.props.bleInfo.wifiStatus ==='connected'? styles.btn : styles.btnDisabled}>
              <Text style={this.props.bleInfo.wifiStatus ==='connected'? styles.btnText : styles.btnTextDisabled}>立刻更新</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={this.props.bleInfo.wifiStatus ==='connected'? {display: 'none'} : styles.warnWrapper}>
          <Text style={{fontSize:15,color:'#3E3E3E'}}>Wi-Fi未连接 , 无法更新</Text>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('WifiSetting')}>
            <View style={{width: 60, height: 30,marginLeft:10}}>
              <Text style={{fontSize:15,color:'#53B2F0'}}>去设置</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          presentationStyle='overFullScreen'
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={styles.modalMask}>
            <View style={styles.modalContent}>
              <View style={styles.modalTitle}>
                <Text style={{fontSize: 18, color: '#0c0c0c', lineHeight: 30,}}>更新中</Text>
                <Text style={{fontSize: 17, lineHeight: 30,}}>请查看机器上显示的更新状态</Text>
              </View>
                <TouchableWithoutFeedback onPress={() => {this.setState({modalVisible: false})}}>
                  <View style={styles.modalBtn}>
                    <Text style={{fontSize: 18,color:'#3CC51F'}}>我知道了</Text>
                  </View>
                </TouchableWithoutFeedback>
            </View>
          </View>
        </Modal>
      </ScrollView>
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
    width:375,
    paddingLeft: 40,
    paddingRight: 40,
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
    justifyContent: 'center',
  },
  version:{
    height:26,
    fontSize:24,
    color:'#0C0C0C',
    lineHeight:26,
    textAlign:'center',
    width:107,
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
    paddingBottom: 36.5,
  },
  descriptionContent: {
    fontSize:17,
    lineHeight:18,
    color:'#767676',
  },
  modalTitle: {
    flexDirection:'column',
    justifyContent: 'center',
    alignItems:'center',
    paddingTop: 17,
    paddingBottom: 17,
  },
  modalMask: {
    flex:1,
    backgroundColor:'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent:{
    backgroundColor:'#fff',
    width:300,
    borderRadius:1.5,
  },
  modalBtn: {
    flexDirection:'row',
    height:50,
    borderTopWidth:0.5,
    borderStyle:'solid',
    borderTopColor: '#E8E8EA',
    justifyContent: 'center',
    alignItems:'center',
  },
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