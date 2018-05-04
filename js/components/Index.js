import React, {Component}  from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, PixelRatio, Image, Button, Alert, TouchableWithoutFeedback,ScrollView} from 'react-native';
import { saveCoffeeSettings } from '../actions/coffeeSettings.js'
import WeightReadingContainer from './common/WeightReading.js'
import bleService from '../services/bleServiceFaker.js'
import BleMessageContainer from './common/BleWarning.js'
import BuildingButtonContainer from './common/BuildingButton.js'
import { SingleDetail } from './Templates'

class Index extends React.Component {
  static navigationOptions = {
    title: 'TIMEMORE Labs',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      alignSelf: 'center',
      fontWeight: 'normal',
    },
  };

  componentDidMount() {
    // bleService.enableWeightNotify(true)
  }

  componentWillUnmount() {
    // bleService.enableWeightNotify(false)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <BleMessageContainer/>
        <View style={styles.topReader}>
          <Image source={require('../../images/cover.png')} style={styles.coverImg} />
          <View style={styles.flexColumn}>
            <WeightReadingContainer type='extract'/>
            <WeightReadingContainer type='total'/>
            <View style={styles.btnClear}>
              <Text style={styles.btnClearText} onPress={ bleService.setZero }>归零</Text>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'column', alignItems:'center',marginTop:8.5}}>
          <View style={styles.flexRow}>
            <SingleDetail name='咖啡豆' value={this.props.coffeeSettings.category} img={require('../../images/icon_brand.png')}/>
            <SingleDetail/>
          </View>
          <View style={styles.flexRow}>
            <SingleDetail name='粉重' value={this.props.coffeeSettings.beanWeight} img={require('../../images/icon_beanweight.png')} text='读秤'/>
            <SingleDetail name='萃取量' value={this.props.coffeeSettings.waterWeight} img={require('../../images/icon_waterweight.png')}/>
          </View>

          <View style={styles.flexRow}>
            <SingleDetail name='粉液比' value={'1:'+this.props.coffeeSettings.ratioWater} img={require('../../images/icon_proportion.png')}/>
            <SingleDetail name='温度' value={this.props.coffeeSettings.temperature} img={require('../../images/icon_temp.png')}/>
          </View>

          <View style={styles.flexRow}>
            <SingleDetail name='研磨度' value={this.props.coffeeSettings.grandSize} img={require('../../images/icon_grandsize.png')}/>
            <SingleDetail name='预计时间' value={this.props.coffeeSettings.timeMintue+':'+this.props.coffeeSettings.timeSecond} img={require('../../images/icon_time.png')}/>
          </View>
        </View>

        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CoffeeSettings')}>
          <View style={{flexDirection: 'row',justifyContent: 'center',alignItems:'center', height: 40}}>
            <Image style={styles.settingImg} source={require('../../images/index_btn_setting.jpg')} />
            <Text style={styles.settingContent}>设置参数</Text>
          </View>
        </TouchableWithoutFeedback>
        <BuildingButtonContainer onPressButton={() => this.props.navigation.navigate('CoffeeBuilder')}/>
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    backgroundColor: '#fff',
    flex: 1,
  },
  flexRow: {
    flexDirection:'row',
    alignItems: 'center',
  },
  flexColumn: {
    flexDirection:'column',
  },
  topReader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#dcdcdc',
    alignItems: 'center',
    height: 283,
  },
  coverImg: {
    resizeMode: 'contain',
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 12.5,
    marginRight: 12.5,
    width:223.5,
    height:223.5,
  },
  btnClear: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 26,
    borderColor: '#B78A49',
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 18,
    width: 51,
    height: 51,
  },
  btnClearText: {
    color: '#BF9253',
    fontSize: 15,
  },
  settingImg: {
    height:10,
    width:13,
  },
  settingContent: {
    lineHeight:25,
    marginLeft:5,
    fontSize:15,
    color:'#53B2F0',
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

const IndexContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)

export default IndexContainer
