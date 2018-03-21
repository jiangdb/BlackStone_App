import React, {Component} from 'react';
import { StyleSheet, Text, View, PixelRatio, Image, Button, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Message} from './Templates';

class Index extends Component {
  static navigationOptions = {
    title: 'TIMEMORE Labs',
  };

  render() {
    return (
      <View style={styles.container}>
        {/*<Message/>*/}
        <Reader/>
        <Setting/>
        <View>
          <Button title="开始冲煮" color='#6A6A6A' onPress={() => {Alert.alert('pressed');}} />
        </View>
      </View>
    );
  }
}


class Reader extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#dcdcdc', height: 567}}>
        <Image source={require('../../images/cover.png')} style={{aspectRatio: 1.5, resizeMode: 'contain'}} />
        <View style={{flex: 1, flexDirection: 'column', paddingTop: 64}}>
          <Text style={styles.readerTitle}>咖啡萃取量(g)</Text>
          <Text style={styles.reader}>200</Text>
          <Text style={styles.readerTitle}>注水总量(g)</Text>
          <Text style={styles.reader}>200</Text>
          {/*<Text style={styles.btnClear} onPress={() => {Alert.alert('pressed');}}>归零</Text>*/}
          <Button title="归零" color='#6A6A6A' onPress={() => {Alert.alert('pressed');}} />

        </View>
      </View>
    );
  }
}

class Setting extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <SingleSetting name='咖啡豆' value='曼特宁' img={require('../../images/icon_brand.png')}/>

        <View style={styles.flexrow}>
          <View style={styles.flexrow}>
            <SingleSetting name='粉重' value='20g' img={require('../../images/icon_beanweight.png')}/>
            <Text>读秤</Text>
          </View>
          <SingleSetting name='萃取量' value='240g' img={require('../../images/icon_waterweight.png')}/>
        </View>

        <View style={styles.flexrow}>
          <SingleSetting name='粉液比' value='1:12' img={require('../../images/icon_proportion.png')}/>
          <SingleSetting name='温度' value='92℃' img={require('../../images/icon_temp.png')}/>
        </View>

        <View style={styles.flexrow}>
          <SingleSetting name='研磨度' value='3.5' img={require('../../images/icon_grandsize.png')}/>
          <SingleSetting name='预计时间' value='02:30' img={require('../../images/icon_time.png')}/>
        </View>

        <View style={styles.flexrow}>
          <Image style={styles.settingImg} source={require('../../images/index_btn_setting.jpg')} />
          <Text style={styles.settingContent}>设置参数</Text>
        </View>
      </View>
    );
  }
}

class SingleSetting extends Component {
  render() {
    return (
      <View style={[styles.flexrow,styles.fullwidth]}>
        <Image style={styles.settingIcon} source={this.props.img} />
        <Text style={styles.settingName}>{this.props.name}</Text>
        <Text style={styles.settingValue}>{this.props.value}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexrow: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
  },
  fullwidth: {
    width: 750,
  },
  halfwidth: {
    width: 375,
  },
  readerTitle: {
    color: '#5B5B5B',
    fontSize: 26,
    marginTop: 33,
  },
  reader: {
    fontWeight: 'bold',
    color: '#232323',
    fontSize: 90,
    height: 104,
  },
  btnClear: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 52,
    borderColor: '#B78A49',
    borderStyle: 'solid',
    borderWidth: 2,
    marginTop: 37,
    width: 102,
    height: 102,
    color: '#BF9253',
    fontSize: 30,
  },
  settingIcon: {
    width: 40,
    height: 44,
    marginTop:10,
    marginLeft:40,

  },
  settingName: {
    color: '#5B5B5B',
    marginLeft: 15,
    lineHeight:65,
    fontSize:30,
  },
  settingValue: {
    fontWeight: 'bold',
    color: '#232323',
    overflow: 'hidden',
    marginLeft:19,
    lineHeight:65,
    fontSize:30,
  },
  settingImg: {
    height:20,
    width:26,
  },
  settingContent: {
    lineHeight:50,
    marginLeft:11,
    fontSize:30,
    color:'#53B2F0',
  },
  btnStart: {
     fontSize:40,
  },

});

export default Index

