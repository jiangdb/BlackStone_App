import React from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableHighlight, TextInput, Image, Alert, Slider, ScrollView,KeyboardAvoidingView, Picker} from 'react-native';
import {Divider} from './Templates';
import { saveCoffeeSettings } from '../actions/coffeeSettings.js'

class CoffeeSettings extends React.Component {
  static navigationOptions = {
    title: '设置参数',
    tabBarVisible: false,
  };

  state = {
    beanWeight: this.props.coffeeSettings.beanWeight.toString(),
    ratioWater: this.props.coffeeSettings.ratioWater,
    timeMintue: this.props.coffeeSettings.timeMintue,
    timeSecond: this.props.coffeeSettings.timeSecond,
    temperature: this.props.coffeeSettings.temperature.toString(),
    grandSize: this.props.coffeeSettings.grandSize.toString(),
    timeArray: [
        '00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
        '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
        '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
        '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
        '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
        '50', '51', '52', '53', '54', '55', '56', '57', '58', '59',
      ],
  };

  _saveSetting = () => {
    this.props.onSaveCoffeeSetting({
      beanWeight: this.state.beanWeight,
      ratioWater: this.state.ratioWater,
      waterWeight: this.state.ratioWater*this.state.beanWeight,
      timeMintue: this.state.timeMintue,
      timeSecond: this.state.timeSecond,
      temperature: this.state.temperature,
      grandSize: this.state.grandSize,
    });
    this.props.navigation.goBack();
  };

  _submitBeanWeight = () => {
    if (this.state.beanWeight.length <= 0) {
      this.setState({beanWeight:this.props.coffeeSettings.beanWeight.toString()});
    }
  };

  _submitTemperature = () => {
    if (this.state.temperature.length <= 0) {
      this.setState({temperature:this.props.coffeeSettings.temperature.toString()});
    }
  };

  _submitGrandSize = () => {
    if (this.state.grandSize.length <= 0) {
      this.setState({grandSize:this.props.coffeeSettings.grandSize.toString()});
    }
  };

  render() {
    return (
      <ScrollView style={{ flex: 1, }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-between',backgroundColor: 'white' }}>
            <View style={styles.settingContainer}>
              <Text style={styles.settingTitle}>咖啡豆</Text>
              <TouchableHighlight
                underlayColor='#f2f2f2'
                onPress={() => this.props.navigation.navigate('BeanCategory')}>
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
                  value={this.state.beanWeight}
                  onChangeText={(text) => this.setState({beanWeight: text})}
                  onSubmitEditing={this._submitBeanWeight}
                  onBlur={this._submitBeanWeight}
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
                  <Text style={{fontSize: 18, color:'#232323',}}>1 ：{this.state.ratioWater}</Text>
                </View>
                <Slider
                  minimumTrackTintColor='#C29F6C'
                  maximumTrackTintColor='#d7d7d7'
                  minimumValue={1}
                  maximumValue={24}
                  step={1}
                  value={this.state.ratioWater}
                  onValueChange={(value) => this.setState({ratioWater: value})}
                  thumbImage={require('../../images/user-head.jpg')}
                  style={{marginLeft: -10,marginRight: -10,}}
                />
                <RatioMark/>
              </View>
            </View>
            <View style={styles.settingContainer}>
              <Text style={styles.settingTitle}>萃取量（g）</Text>
              <TextInput
                style={[styles.settingInput,styles.settingInputGray]}
                value={(this.state.ratioWater*this.state.beanWeight).toString()}
                editable={false}
                underlineColorAndroid='transparent'
              />
              <Divider/>
            </View>

            <View style={styles.settingContainer}>
              <Text style={styles.settingTitle}>时间设置（分：秒）</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.picker}
                  mode='dialog'
                  selectedValue={this.state.timeMintue}
                  onValueChange={(value) => this.setState({timeMintue: value})}>
                  { this.state.timeArray.map((item)=>(
                    <Picker.Item key={item} label={item} value={item} />
                   )) }
                </Picker>
                <Picker
                  style={styles.picker}
                  mode='dialog'
                  selectedValue={this.state.timeSecond}
                  onValueChange={(value) => this.setState({timeSecond: value})}>
                  { this.state.timeArray.map((item)=>(
                    <Picker.Item key={item} label={item} value={item} />
                   )) }
                </Picker>
              </View>
              <Divider/>
            </View>

            <View style={styles.settingContainer}>
              <Text style={styles.settingTitle}>水温（℃）</Text>
              <TextInput
                style={styles.settingInput}
                value={this.state.temperature.toString()}
                onChangeText={ (text) => this.setState({temperature: text})}
                onSubmitEditing={this._submitTemperature}
                onBlur={this._submitTemperature}
                onFocus={(event: Event) => {}}
                underlineColorAndroid='transparent'
                keyboardType='numeric'
              />
              <Divider/>
            </View>

            <View style={styles.settingContainer}>
              <Text style={styles.settingTitle}>研磨度</Text>
              <TextInput
                style={styles.settingInput}
                value={this.state.grandSize}
                onChangeText={ (text) => this.setState({grandSize: text})}
                onSubmitEditing={this._submitGrandSize}
                onBlur={this._submitGrandSize}
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
    height:19,
    marginTop: 10,
    fontSize:13,
    color:'#5B5B5B',
    marginLeft:21,
  },
  settingInputGray: {
    color:'#999999',
  },
  settingInput: {
    lineHeight:34,
    height:34,
    marginTop:4.5,
    marginBottom:2,
    fontSize:24,
    marginLeft:21,
    color:'#232323',
    width: 250,
  },
  pickerContainer:{
    flexDirection: 'row',
    marginTop:4.5,
    marginBottom:2,
    marginLeft:21,
  },
  picker: {
    height:34,
    width: 160,
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
    height:14,
    fontSize:12,
    color:'#D9D9D9',
  },
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
