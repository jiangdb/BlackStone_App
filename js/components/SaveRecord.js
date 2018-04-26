import React from 'react';
import { connect } from 'react-redux'
import { Text, View,StyleSheet, TextInput, ScrollView,TouchableHighlight,Alert } from 'react-native';
import { ChoiceBar, Divider, SingleDetail } from './Templates';
import StarRating from 'react-native-star-rating';
import { saveRecord } from '../actions/coffeeBuilder.js'

class SaveRecord extends React.Component {
  static navigationOptions = {
    title: '保存记录',
    tabBarVisible: false,
  };

  state = {
    starCount: 5,
    comment: '',
    flavorSelected:'',
    device:'',
    coffeeSetting:{},
    chart_time: [],
    chart_water_weight: [],
    chart_extract_weight: [],
  };

  _onStarRatingPress = (rating) => {
    this.setState({
      starCount: rating
    });
  };

  _renderRateValue = (rating) => {
    switch(rating)
    {
      case 1:
        return '很差';
        break;
      case 2:
        return '差';
        break;
      case 3:
        return '一般';
        break;
      case 4:
        return '好';
        break;
      case 5:
        return '非常棒';
        break;
      default: '非常棒';
      }
  };

  _getSelectedFlavor = () => {
    let selectedFlavorObject = this.props.flavor.flavorOption.filter((flavor) => flavor.selected);
    if(selectedFlavorObject.length === 0) {
      return '请选择';
    } else {
      return selectedFlavorObject.map((flavor) => {return flavor.name}).join(",");
    }
  };

  _getSelectedAccessories = () => {
    let selectedFilter = this.props.accessories.filterOption.filter((filter) => filter.selected);
    let selectedKettle = this.props.accessories.kettleOption.filter((kettle) => kettle.selected);
    if(selectedFilter.length === 0 && selectedKettle.length === 0) {
      return '请选择';
    } else {
      let selectedAccessories = [selectedFilter[0].name, selectedKettle[0].name];
      return [selectedFilter[0].name, selectedKettle[0].name].join(" ");
    }
  };

  _onSaveRecord = () => {

  }

  render() {
    return (
      <ScrollView contentContainer={{ flexDirection: 'column'}}>
        <View style={{ flexDirection: 'column', marginTop: 8.5,backgroundColor: '#fff'}}>
          <TouchableHighlight>
            <View style={styles.choiceBar}>
              <Text style={styles.choiceTitle}>评分</Text>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center'}}>
                <StarRating
                  disabled={false}
                  halfStarEnabled={false}
                  maxStars={5}
                  fullStar={require('../../images/star.png')}
                  emptyStar={require('../../images/star_white.png')}
                  rating={this.state.starCount}
                  selectedStar={(rating) => this._onStarRatingPress(rating)}
                />
                <Text style={styles.rateValue}>{this._renderRateValue(this.state.starCount)}</Text>
              </View>
            </View>
          </TouchableHighlight>
          <Divider/>
          <ChoiceBar
            title='风味'
            value={this._getSelectedFlavor()}
            icon='more'
            onPress={() => this.props.navigation.navigate('FlavorSelect')}
          />
          <Divider/>
          <ChoiceBar
            title='设备'
            value={this._getSelectedAccessories()}
            icon='more'
            onPress={() => this.props.navigation.navigate('AccessoriesSelect')}
          />
          <Divider/>
          <View style={{height:165.5}}>
          <TextInput
            style={styles.comment}
            multiline={true}
            // numberOfLines={4}
            // maxLength = {100}
            onChangeText={(comment) => this.setState({comment})}
            value={this.state.comment}
            placeholder='请说说你的心得体会'
            underlineColorAndroid='transparent'
          />
          </View>
          <View style={{ flexDirection: 'row', justifyContent:'flex-end'}}>
            <Text style={styles.numberIndicate}>{this.state.comment.length}/100</Text>
          </View>
        </View>
        <Details/>
        <View style={{ flexDirection: 'column', marginTop: 8.5,backgroundColor: '#fff', height: 220,}}>

        </View>
        <TouchableHighlight onPress={() => {Alert.alert('pressed');}}>
          <View style={styles.btnSave}>
            <Text style={styles.btnSaveText}>保存</Text>
          </View>
        </TouchableHighlight>
      </ScrollView>

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
  comment: {
    marginTop:10,
    marginLeft:25,
    marginRight:25,
    padding: 0,
    fontSize: 17,
  },
  numberIndicate: {
    lineHeight:24,
    fontSize:12,
    color:'#CACACA',
    marginRight: 10,
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
  choiceBar: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginLeft:18,
    marginRight: 16,
  },
  choiceTitle: {
    fontSize:17,
    color:'#232323',
    marginLeft:14,
  },
  rateValue: {
    width:57.5,
    lineHeight:56,
    fontSize:17,
    color:'#5B5B5B',
    textAlign: 'right',
  }
});

const mapStateToProps = state => {
  return {
    flavor: state.flavorSelect,
    accessories: state.accessoriesSelect,
    coffeeSettings: state.coffeeSettings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSaveRecord: record => {
      dispatch(saveRecord(record))
    }
  }
}

const SaveRecordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveRecord)

export default SaveRecordContainer