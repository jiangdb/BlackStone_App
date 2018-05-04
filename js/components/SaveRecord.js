import React from 'react';
import { connect } from 'react-redux'
import { Text, View,StyleSheet, TextInput, ScrollView,TouchableWithoutFeedback,Alert,BackHandler } from 'react-native';
import { ChoiceBar, Divider, SingleDetail } from './Templates';
import StarRating from 'react-native-star-rating';
import { saveRecord } from '../actions/coffeeBuilder.js'
import WeightChartContainer from './common/WeightChart.js'

class SaveRecord extends React.Component {
  static navigationOptions = {
    title: '保存记录',
    tabBarVisible: false,
  };

  state = {
    starCount: 5,
    comment: '',
    flavor:[],
    accessories: null,
    actualWaterWeight: this.props.coffeeBuilder.chartTotal[this.props.coffeeBuilder.chartTotal.length - 1].toFixed(1),
    actualRatioWater: Math.round(this.props.coffeeBuilder.chartTotal[this.props.coffeeBuilder.chartTotal.length - 1] / this.props.coffeeBuilder.chartExtract[this.props.coffeeBuilder.chartExtract.length - 1])
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('Home');
    });
  };

  componentWillUnmount() {
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
      // this.setState({flavor:''});
      return '请选择';
    } else {
      // this.setState({flavor:''});
      return selectedFlavorObject.map((flavor) => {return flavor.name}).join(",");
    }

    console.log(this.state.flavor);
  };

  _getSelectedAccessories = () => {
    let selectedFilter = this.props.accessories.filterOption.filter((filter) => filter.selected);
    let selectedKettle = this.props.accessories.kettleOption.filter((kettle) => kettle.selected);

    if(selectedFilter.length === 0 && selectedKettle.length === 0) {
      return '请选择';
    } else {
      let selectedAccessories = [selectedFilter[0].name, selectedKettle[0].name];
      return selectedAccessories.join(" ");
    }

  };

  _onSaveRecord = () => {
    this.props.onSaveRecord({
      starCount: this.state.starCount,
      flavor: this.props.flavor.flavorOption.filter((flavor) => flavor.selected),
      accessories: {
        filter: this.props.accessories.filterOption.filter((filter) => filter.selected),
        kettle: this.props.accessories.kettleOption.filter((kettle) => kettle.selected)
      },
      comment: this.state.comment,
      category: this.props.coffeeSettings.category,
      ratioWater: this.props.coffeeSettings.ratioWater,
      beanWeight: this.props.coffeeSettings.beanWeight,
      waterWeight: this.props.coffeeSettings.waterWeight,
      temperature: this.props.coffeeSettings.temperature,
      grandSize: this.props.coffeeSettings.grandSize,
      totalSeconds: '' ,
      chartTotal:this.props.coffeeBuilder.chartTotal,
      chartExtract:this.props.coffeeBuilder.chartExtract,
      actualWaterWeight: this.state.actualWaterWeight,
      actualRatioWater: this.state.actualRatioWater
    });
  };

  render() {

    return (
      <ScrollView contentContainer={{ flexDirection: 'column'}}>
        <View style={{ flexDirection: 'column', marginTop: 8.5,backgroundColor: '#fff'}}>
          <TouchableWithoutFeedback>
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
          </TouchableWithoutFeedback>
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
            maxLength = {100}
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

        <View style={{flexDirection: 'column', alignItems:'center', marginTop: 8.5,backgroundColor: '#fff'}}>
          <View style={styles.detailRow}>
            <SingleDetail name='咖啡豆' value={this.props.coffeeSettings.category} img={require('../../images/icon_brand.png')}/>
            <SingleDetail/>
          </View>
          <View style={styles.detailRow}>
            <SingleDetail name='粉重' value={this.props.coffeeSettings.beanWeight+'g'} img={require('../../images/icon_beanweight.png')}/>
            <SingleDetail name='时间' value='02:30' img={require('../../images/icon_time.png')}/>
          </View>

          <View style={styles.detailRow}>
            <SingleDetail name='研磨度' value={this.props.coffeeSettings.grandSize} img={require('../../images/icon_grandsize.png')}/>
            <SingleDetail name='水温' value={this.props.coffeeSettings.temperature+'℃'} img={require('../../images/icon_temp.png')}/>
          </View>

          <View style={styles.detailRow}>
            <SingleDetail name='预设注水量' value={this.props.coffeeSettings.waterWeight+'g'} img={require('../../images/icon_proportion.png')}/>
            <SingleDetail name='实际注水量' value={this.state.actualWaterWeight} img={require('../../images/icon_waterweight.png')}/>
          </View>

          <View style={styles.detailRow}>
            <SingleDetail name='预设粉水比' value={'1:'+this.props.coffeeSettings.ratioWater} img={require('../../images/icon_proportion.png')}/>
            <SingleDetail name='实际粉水比' value={'1:'+this.state.actualRatioWater} img={require('../../images/icon_proportion.png')}/>
          </View>
        </View>

        <View style={{ flexDirection: 'column', marginTop: 8.5,backgroundColor: '#fff', height: 320,}}>
          <WeightChartContainer/>
        </View>
        <TouchableWithoutFeedback onPress={this._onSaveRecord}>
          <View style={styles.btnSave}>
            <Text style={styles.btnSaveText}>保存</Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
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
    coffeeSettings: state.coffeeSettings,
    flavor: state.flavorSelect,
    accessories: state.accessoriesSelect,
    coffeeBuilder: state.coffeeBuilder,
    history: state.history,
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