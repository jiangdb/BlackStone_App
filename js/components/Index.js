import React, {Component} from 'react';
import { StyleSheet, Text, View, PixelRatio, Image, Button, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Message} from './Templates';


export default class Index extends Component {
  static navigationOptions = {
    title: 'TIMEMORE Labs',
  };

  render() {
    return (
      <View style={styles.container}>
        <Message/>
        <Reader/>
        <Details/>
        <View style={{flexDirection: 'row',justifyContent: 'center',alignItems:'center'}}>
          <Image style={styles.settingImg} source={require('../../images/index_btn_setting.jpg')} />
          <Text style={styles.settingContent} onPress={() => this.props.navigation.navigate('Details')}>设置参数</Text>
        </View>
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
      <View style={{flex:2, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#dcdcdc', alignItems: 'center'}}>
        <Image source={require('../../images/cover.png')} style={styles.coverImg} />
        <View style={styles.flexColumn}>
          <Text style={styles.readerTitle}>咖啡萃取量(g)</Text>
          <Text style={styles.reader}>200</Text>
          <Text style={styles.readerTitle}>注水总量(g)</Text>
          <Text style={styles.reader}>200</Text>
          <View style={styles.btnClear}>
            <Text style={styles.btnClearText} onPress={() => {Alert.alert('pressed');}}>归零</Text>
          </View>
          {/*<Button title="归零" color='#6A6A6A' onPress={() => {Alert.alert('pressed');}} />*/}

        </View>
      </View>
    );
  }
}

export class Details extends Component {
  render() {
    return (
      <View style={{flex: 1,flexDirection: 'column',}}>
        <SingleDetail name='咖啡豆' value='曼特宁' img={require('../../images/icon_brand.png')}/>

        <View style={styles.flexRow}>
          <SingleDetail name='粉重' value='20g' img={require('../../images/icon_beanweight.png')} text='读秤'/>
          <SingleDetail name='萃取量' value='240g' img={require('../../images/icon_waterweight.png')}/>
        </View>

        <View style={styles.flexRow}>
          <SingleDetail name='粉液比' value='1:12' img={require('../../images/icon_proportion.png')}/>
          <SingleDetail name='温度' value='92℃' img={require('../../images/icon_temp.png')}/>
        </View>

        <View style={styles.flexRow}>
          <SingleDetail name='研磨度' value='3.5' img={require('../../images/icon_grandsize.png')}/>
          <SingleDetail name='预计时间' value='02:30' img={require('../../images/icon_time.png')}/>
        </View>
      </View>
    );
  }
}

class SingleDetail extends Component {
  render() {
    return (
      <View style={styles.flexRow}>
        <Image style={styles.settingIcon} source={this.props.img} />
        <Text style={styles.settingName}>{this.props.name}</Text>
        <Text style={styles.settingValue}>{this.props.value}</Text>
        <Text style={{marginLeft:20, fontSize:26, color:'#53B2F0'}}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flexRow: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center'
  },
  flexColumn: {
    flex: 1,
    flexDirection:'column',
  },
  coverImg: {
    resizeMode: 'contain',
    marginTop: 60,
    marginBottom: 60,
    marginLeft: 25,
    marginRight: 25,
    flex: 1,
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
  },
  btnClearText: {
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

});
