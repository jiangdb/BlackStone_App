import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, TextInput, Image, Alert } from 'react-native';
import {Divider} from './Templates';

export default class CoffeeSettings extends React.Component {
  static navigationOptions = {
    title: '设置参数',
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={styles.settingContainer}>
          <Text style={styles.settingTitle}>咖啡豆</Text>
          <TouchableWithoutFeedback>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={styles.settingInput}>曼特宁</Text>
              <Image style={styles.icon} source={require('../../images/more.png')} />
            </View>
          </TouchableWithoutFeedback>
          <Divider/>
        </View>

        <View style={styles.settingContainer}>
          <Text style={styles.settingTitle}>粉重（g）</Text>
          <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput style={styles.settingInput} value={'setting value'}/>
            <View style={styles.btnReadWeight}>
              <Text style={styles.btnReadWeightText} onPress={() => {Alert.alert('pressed');}}>读秤</Text>
            </View>
          </View>
          <Divider/>
        </View>

        <View style={styles.settingContainer}>
          <Text style={styles.settingTitle}>粉液比（1：N）</Text>
        </View>

        <View style={styles.settingContainer}>
          <Text style={styles.settingTitle}>萃取量（g）</Text>
          <TextInput style={styles.settingInput} value={'setting value'}/>
          <Divider/>
        </View>

        <View style={styles.settingContainer}>
          <Text style={styles.settingTitle}>时间设置（分：秒）</Text>
          <TextInput style={styles.settingInput} value={'setting value'}/>
          <Divider/>
        </View>

        <View style={styles.settingContainer}>
          <Text style={styles.settingTitle}>水温（℃）</Text>
          <TextInput style={styles.settingInput} value={'setting value'}/>
          <Divider/>
        </View>

        <View style={styles.settingContainer}>
          <Text style={styles.settingTitle}>研磨度</Text>
          <TextInput style={styles.settingInput} value={'setting value'}/>
        </View>

        <View style={{flexDirection: 'row',justifyContent:'center'}}  >
          <TouchableWithoutFeedback onPress={() => {Alert.alert('pressed');}}>
            <View style={styles.btnSave}>
              <Text style={styles.btnSaveText}>确认</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  settingContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  settingTitle: {
    lineHeight:19,
    marginTop: 10,
    fontSize:13,
    color:'#5B5B5B',
    marginLeft:21,
  },
  settingInput: {
    lineHeight:34,
    marginTop:5,
    marginBottom:9,
    fontSize:24,
    color:'#232323',
    marginLeft:21,
  },
  icon: {
    marginLeft:7,
    marginRight: 16,
  },
  btnReadWeight: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 3,
    borderColor: '#C29F6C',
    borderStyle: 'solid',
    borderWidth: 1,
    width: 60,
    height: 30,
    marginRight: 16,
  },
  btnReadWeightText: {
    color: '#C29F6C',
    fontSize: 13,
  },
  btnSave: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width: 375,
    height: 55,
    backgroundColor: '#383838',
  },
  btnSaveText: {
    color: '#fff',
    fontSize: 18,
  }
});