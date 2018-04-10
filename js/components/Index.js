import React, {Component}  from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, PixelRatio, Image, Button, Alert, TouchableWithoutFeedback,ScrollView} from 'react-native';
import { saveCoffeeSettings } from '../actions/coffeeSettings.js'

class Index extends React.Component {
  static navigationOptions = {
    title: 'TIMEMORE Labs',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      alignSelf: 'center'
    },
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/*<Message/>*/}
        <View style={styles.topReader}>
          <Image source={require('../../images/cover.png')} style={styles.coverImg} />
          <View style={[styles.flexColumn, this.props.style]}>
            <View style={{flexDirection:'column'}}>
              <Text style={styles.readerTitle}>咖啡萃取量(g)</Text>
              <Text style={styles.reader}>{this.props.coffeeSettings.beanWeightReader}</Text>
            </View>
            <View style={styles.flexColumn}>
              <Text style={styles.readerTitle}>注水总量(g)</Text>
              <Text style={styles.reader}>{this.props.coffeeSettings.waterWeightReader}</Text>
            </View>
            <View style={styles.btnClear}>
              <Text style={styles.btnClearText} onPress={() => {Alert.alert('pressed');}}>归零</Text>
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
        <View style={{flexDirection: 'row',justifyContent:'center'}}  >
          <TouchableWithoutFeedback  onPress={() => {Alert.alert('pressed');}}>
            <View style={styles.btnStart}>
              <Text style={styles.btnStartText}>开始冲煮</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    );
  }
}

// single coffee detail component
export class SingleDetail extends Component {
  render() {
    return (
      <View style={styles.detailContainer}>
        <Image style={styles.settingIcon} source={this.props.img} />
        <Text style={styles.settingName}>{this.props.name}</Text>
        <Text style={styles.settingValue}>{this.props.value}</Text>
        <TouchableWithoutFeedback  onPress={() => {Alert.alert('pressed');}}>
          <View>
            <Text style={{marginLeft:10, fontSize:13, color:'#53B2F0'}}>{this.props.text}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
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
  readerTitle: {
    color: '#5B5B5B',
    fontSize: 13,
    marginTop: 17,
  },
  reader: {
    fontWeight: 'bold',
    color: '#232323',
    fontSize: 45,
    height: 52,
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
  detailContainer: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width:187.5,
  },
  settingIcon: {
    width: 20,
    height: 22,
    marginTop:5,
    marginLeft:20,
  },
  settingName: {
    color: '#5B5B5B',
    marginLeft: 7,
    lineHeight:32,
    fontSize:15,
  },
  settingValue: {
    fontWeight: 'bold',
    color: '#232323',
    overflow: 'hidden',
    marginLeft:10,
    lineHeight:32,
    fontSize:15,
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
  btnStart: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 26,
    width:252,
    height:50,
  },
  btnStartText: {
    color:'#6A6A6A',
    fontSize: 20,
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
