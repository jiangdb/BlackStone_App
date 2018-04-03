import React from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableWithoutFeedback, TextInput, Image, Alert, Slider, } from 'react-native';
import {Divider} from './Templates';

class CoffeeSettings extends React.Component {
  static navigationOptions = {
    title: '设置参数',
  };

  state = {
    beanName: '曼特宁',
    beanWeight: '20',
    sliderValue: 12,
    temperature:'92',
    grandsize:'3.5',
    time:'02:30'
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between',backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'column' }}>
          <View style={styles.settingContainer}>
            <Text style={styles.settingTitle}>咖啡豆</Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('BeanCategory')}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={styles.settingInput}>{this.state.beanName}</Text>
                <Image style={styles.icon} source={require('../../images/more.png')} />
              </View>
            </TouchableWithoutFeedback>
            <Divider/>
          </View>

          <View style={styles.settingContainer}>
            <Text style={styles.settingTitle}>粉重（g）</Text>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <TextInput
                style={styles.settingInput}
                value={this.state.beanWeight}
                onChangeText={ beanWeight => this.setState({beanWeight})}
              />
              <TouchableWithoutFeedback  onPress={() => {Alert.alert('pressed');}}>
                <View style={styles.btnReadWeight}>
                  <Text style={styles.btnReadWeightText}>读秤</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <Divider/>
          </View>

          <View style={styles.settingContainer}>
            <Text style={styles.settingTitle}>粉液比（1：N）</Text>
            <View style={styles.slider}>
              <View style={styles.sliderText}>
                <Text style={{fontSize: 18, color:'#232323',}}>1 ：{this.state.sliderValue}</Text>
              </View>
              <Slider minimumTrackTintColor='#C29F6C' maximumValue={24} step={1}
                value={this.state.sliderValue}
                onValueChange={sliderValue => this.setState({ sliderValue })}
              />
            </View>
          </View>

          <View style={styles.settingContainer}>
            <Text style={styles.settingTitle}>萃取量（g）</Text>
            <TextInput
              style={styles.settingInput}
              value={(this.state.sliderValue*this.state.beanWeight).toString()}
              editable={false}
            />
            <Divider/>
          </View>

          <View style={styles.settingContainer}>
            <Text style={styles.settingTitle}>时间设置（分：秒）</Text>
            <Divider/>
          </View>

          <View style={styles.settingContainer}>
            <Text style={styles.settingTitle}>水温（℃）</Text>
            <TextInput
              style={styles.settingInput}
              value={this.state.temperature}
              onChangeText={ temperature => this.setState({temperature})}
            />
            <Divider/>
          </View>

          <View style={styles.settingContainer}>
            <Text style={styles.settingTitle}>研磨度</Text>
            <TextInput
              style={styles.settingInput}
              value={this.state.grandsize}
              onChangeText={ grandsize => this.setState({grandsize})}
            />
            <Divider/>
          </View>
        </View>

        <TouchableWithoutFeedback onPress={() => {Alert.alert('pressed');}}>
          <View style={styles.btnSave}>
            <Text style={styles.btnSaveText}>确认</Text>
          </View>
        </TouchableWithoutFeedback>
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
  }
});


const mapStateToProps = state => {
  return {
    coffeeSettings: state.coffeeSettings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSaveCoffeeSetting: settings => {
      dispatch(saveCoffeeSettings({
        category: 'new one',
        beanWeight: 100
      }))
    }
  }
}

const CoffeeSettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoffeeSettings)

export default CoffeeSettingsContainer
