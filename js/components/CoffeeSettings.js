import React from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableHighlight, TextInput, Image, Alert, Slider, ScrollView,KeyboardAvoidingView, Picker} from 'react-native';
import {Divider} from './Templates';
import { saveCoffeeSettings } from '../actions/coffeeSettings.js'

class CoffeeSettings extends React.Component {
  static navigationOptions = {
    title: '设置参数',
  };

  _saveSetting = () => {
    this.props.onSaveCoffeeSetting({
      waterWeight:this.props.coffeeSettings.ratioWater*this.props.coffeeSettings.beanWeight
    });
    this.props.navigation.goBack();
  };

  render() {
    return (
      <ScrollView style={{ flex: 1, }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-between',backgroundColor: 'white' }}>

            <View style={styles.settingContainer}>
              <Text style={styles.settingTitle}>咖啡豆</Text>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('BeanCategory')}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text style={styles.settingInput}>{this.props.coffeeSettings.category}</Text>
                  <Image style={styles.icon} source={require('../../images/more.png')} />
                </View>
              </TouchableHighlight>
              <Divider/>
            </View>

            <View style={styles.settingContainer}>
              <Text style={styles.settingTitle}>粉重（g）</Text>

              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TextInput
                  style={styles.settingInput}
                  value={this.props.coffeeSettings.beanWeight.toString()}
                  onChangeText={ beanWeight => { this.props.onSaveCoffeeSetting({beanWeight: beanWeight})}}
                  underlineColorAndroid='transparent'
                  keyboardType='numeric'
                />
                <TouchableHighlight  onPress={() => {Alert.alert('pressed');}}>
                  <View style={styles.btnReadWeight}>
                    <Text style={styles.btnReadWeightText}>读秤</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <Divider/>
            </View>

            <View style={styles.settingContainer}>
              <Text style={styles.settingTitle}>粉液比（1：N）</Text>
              <View style={styles.slider}>
                <View style={styles.sliderText}>
                  <Text style={{fontSize: 18, color:'#232323',}}>1 ：{this.props.coffeeSettings.ratioWater}</Text>
                </View>
                <Slider minimumTrackTintColor='#C29F6C' minimumValue={1} maximumValue={24} step={1 }
                  value={this.props.coffeeSettings.ratioWater}
                  onValueChange={ratioWater => this.props.onSaveCoffeeSetting({ ratioWater:ratioWater })}
                />
                <RatioMark/>
              </View>
            </View>
            <View style={styles.settingContainer}>
              <Text style={styles.settingTitle}>萃取量（g）</Text>
              <TextInput
                style={styles.settingInput}
                value={(this.props.coffeeSettings.ratioWater*this.props.coffeeSettings.beanWeight).toString()}
                editable={false}
                underlineColorAndroid='transparent'
              />
              <Divider/>
            </View>

            <View style={styles.settingContainer}>
              <Text style={styles.settingTitle}>时间设置（分：秒）</Text>
              <TextInput
                style={styles.settingInput}
                value={this.props.coffeeSettings.time.toString()}
                onChangeText={ time => this.props.onSaveCoffeeSetting({time:time})}
                underlineColorAndroid='transparent'
                keyboardType='numeric'
              />
              <Divider/>
            </View>

            <View style={styles.settingContainer}>
              <Text style={styles.settingTitle}>水温（℃）</Text>
              <TextInput
                style={styles.settingInput}
                value={this.props.coffeeSettings.temperature.toString()}
                onChangeText={ temperature => this.props.onSaveCoffeeSetting({temperature:temperature})}
                underlineColorAndroid='transparent'
                keyboardType='numeric'
              />
              <Divider/>
            </View>

            <View style={styles.settingContainer}>
              <Text style={styles.settingTitle}>研磨度</Text>
              <TextInput
                style={styles.settingInput}
                value={this.props.coffeeSettings.grandSize}
                onChangeText={ grandSize => this.props.onSaveCoffeeSetting({grandSize:grandSize})}
                underlineColorAndroid='transparent'
                keyboardType='numeric'
              />
              <Divider/>
            </View>

          <TouchableHighlight onPress={this._saveSetting}>
            <View style={styles.btnSave}>
              <Text style={styles.btnSaveText}>确认</Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

class RatioMark extends React.Component {
  render() {
    return (
      <View style={{flexDirection:'column', marginRight:8, marginLeft:8,}}>
        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
          <View style={[styles.ratioMark,styles.ratioMarkLong]}></View>
          <View style={styles.ratioMark}></View>
          <View style={styles.ratioMark}></View>
          <View style={styles.ratioMark}></View>
          <View style={styles.ratioMark}></View>
          <View style={[styles.ratioMark,styles.ratioMarkLong]}></View>
          <View style={styles.ratioMark}></View>
          <View style={styles.ratioMark}></View>
          <View style={styles.ratioMark}></View>
          <View style={styles.ratioMark}></View>
          <View style={styles.ratioMark}></View>
          <View style={[styles.ratioMark,styles.ratioMarkLong]}></View>
          <View style={styles.ratioMark}></View>
          <View style={styles.ratioMark}></View>
          <View style={styles.ratioMark}></View>
          <View style={styles.ratioMark}></View>
          <View style={styles.ratioMark}></View>
          <View style={[styles.ratioMark,styles.ratioMarkLong]}></View>
          <View style={styles.ratioMark}></View>
          <View style={styles.ratioMark}></View>
          <View style={styles.ratioMark}></View>
          <View style={styles.ratioMark}></View>
          <View style={styles.ratioMark}></View>
          <View style={[styles.ratioMark,styles.ratioMarkLong]}></View>
        </View>
        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <Text style={[styles.markText,styles.markTextFirst]}>1</Text>
            <Text style={[styles.markText,styles.markTextMiddle]}>6</Text>
            <Text style={[styles.markText,styles.markTextMiddle]}>12</Text>
            <Text style={[styles.markText,styles.markTextMiddle]}>18</Text>
            <Text style={styles.markText}>24</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  settingContainer: {
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
    marginTop:4.5,
    marginBottom:2,
    fontSize:24,
    marginLeft:21,
    color:'#232323',
    width: 250,
  },
  icon: {
    marginLeft:7,
    marginRight: 16,
    width:8,
    height:13,
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
    marginBottom:7,
    marginRight: 16,
  },
  btnReadWeightText: {
    color: '#C29F6C',
    fontSize: 13,
  },
  btnSave: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height: 55,
    backgroundColor: '#383838',
  },
  btnSaveText: {
    color: '#fff',
    fontSize: 18,
  },
  slider: {
    flexDirection: 'column',
    marginLeft:21,
    marginRight: 21,
  },
  sliderText: {
    flexDirection:'row',
    justifyContent:'center',
    marginTop:7,
  },
  ratioMark: {
    width: 0.5,
    height:13,
    backgroundColor: '#E0DEDE',
  },
  ratioMarkLong: {
    height:18,
  },
  markText: {
    lineHeight:14,
    fontSize:12,
    color:'#D9D9D9',
  },
  // markTextFirst: {
  //   width:72,
  // },
  // markTextMiddle: {
  //   width:86.5,
  // }
});


const mapStateToProps = state => {
  return {
    coffeeSettings: state.coffeeSettings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSaveCoffeeSetting: settings => {
      dispatch(saveCoffeeSettings(settings))
    }
  }
}

const CoffeeSettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoffeeSettings)

export default CoffeeSettingsContainer
