import React from 'react';
import { connect } from 'react-redux'
import { Text, View,StyleSheet } from 'react-native';
import { ChoiceBar, Divider } from './Templates';
import { SingleDetail } from './Index';

class HistoryDetail extends React.Component {
  static navigationOptions = {
    title: 'TIMEMORE Labs',
    tabBarVisible: false,
  };

  render() {
    return (
      <View style={{ flexDirection: 'column'}}>
        <View style={{ flexDirection: 'column', marginTop: 8.5,backgroundColor: '#fff'}}>
            <ChoiceBar title='评分' value=''/>
            <Divider/>
            <ChoiceBar title='风味' value='' />
            <Divider/>
            <ChoiceBar title='设备' value='' />
        </View>
            <Details/>
        <View style={{ flexDirection: 'column', marginTop: 8.5,backgroundColor: '#fff'}}>

        </View>
      </View>

    );
  }
}

class Details extends React.Component {
  render() {
    return (
      <View style={{flexDirection: 'column', alignItems:'center', marginTop: 8.5,backgroundColor: '#fff'}}>
        <View style={styles.detailRow}>
          <SingleDetail name='咖啡豆' value='曼特宁' img={require('../../images/icon_brand.png')}/>
          <SingleDetail/>
        </View>
        <View style={styles.detailRow}>
          <SingleDetail name='粉重' value='20g' img={require('../../images/icon_beanweight.png')}/>
          <SingleDetail name='时间' value='02:30' img={require('../../images/icon_time.png')}/>
        </View>

        <View style={styles.detailRow}>
          <SingleDetail name='研磨度' value='3.5' img={require('../../images/icon_grandsize.png')}/>
          <SingleDetail name='水温' value='92℃' img={require('../../images/icon_temp.png')}/>
        </View>

        <View style={styles.detailRow}>
          <SingleDetail name='预设注水量' value='240g' img={require('../../images/icon_proportion.png')}/>
          <SingleDetail name='实际注水量' value='240g' img={require('../../images/icon_waterweight.png')}/>
        </View>

        <View style={styles.detailRow}>
          <SingleDetail name='预设粉水比' value='1:12' img={require('../../images/icon_proportion.png')}/>
          <SingleDetail name='实际粉水比' value='1:12' img={require('../../images/icon_proportion.png')}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailRow: {
    flexDirection:'row',
    alignItems: 'center',
    height: 40,
  },
})

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const HistoryDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryDetail)

export default HistoryDetailContainer