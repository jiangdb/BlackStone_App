import React from 'react';
import { connect } from 'react-redux'
import { Text, View,StyleSheet, TextInput, ScrollView,TouchableWithoutFeedback,Alert,BackHandler,Modal, Image } from 'react-native';
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
    actualRatioWater: Math.round(this.props.coffeeBuilder.chartTotal[this.props.coffeeBuilder.chartTotal.length - 1] / this.props.coffeeBuilder.chartExtract[this.props.coffeeBuilder.chartExtract.length - 1]),
    category: this.props.coffeeSettings.category,
    grandSize: this.props.coffeeSettings.grandSize,
    modalVisible: false,
    modalName: '',
    newOption:'',
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

  _showModal = (name) => {
    this.setState({
      modalVisible: true,
      modalName: name,
    });
  };

  _setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  _changeValue = (text) => {
    if(text !== '') {
      switch (this.state.modalName) {
        case '咖啡豆':
          this.setState({category: text})
          break;
        case '研磨度':
          this.setState({grandSize: text})
          break;
        default:
          break;
      }
    }
    this._setModalVisible(false);
    this.setState({newOption:''});
  };

  _getModalPlaceHolder = () => {
    switch (this.state.modalName) {
      case '咖啡豆':
        return this.state.category
        break;
      case '研磨度':
        return this.state.grandSize.toString()
        break;
      default:
        break;
    }
  }

  _onSaveRecord = () => {
    this.props.onSaveRecord({
      starCount: this.state.starCount,
      flavor: this.props.flavor.flavorOption.filter((flavor) => flavor.selected),
      accessories: {
        filter: this.props.accessories.filterOption.filter((filter) => filter.selected),
        kettle: this.props.accessories.kettleOption.filter((kettle) => kettle.selected)
      },
      comment: this.state.comment,
      category: this.state.category,
      ratioWater: this.props.coffeeSettings.ratioWater,
      beanWeight: this.props.coffeeSettings.beanWeight,
      waterWeight: this.props.coffeeSettings.waterWeight,
      temperature: this.props.coffeeSettings.temperature,
      grandSize: this.state.grandSize,
      totalSeconds: '' ,
      chartTotal:this.props.coffeeBuilder.chartTotal,
      chartExtract:this.props.coffeeBuilder.chartExtract,
      actualWaterWeight: this.state.actualWaterWeight,
      actualRatioWater: this.state.actualRatioWater
    });

    console.log(this.props.history.historyList)
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
            <View style={styles.detailContainer}>
              <Image style={styles.settingIcon} source={require('../../images/icon_brand.png')} />
              <Text style={styles.settingName}>咖啡豆</Text>
              <TouchableWithoutFeedback onPress={() => {this._showModal('咖啡豆')}}>
                <View style={styles.settingValueContainer}>
                  <Text style={styles.settingValue}>{this.state.category}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.detailRow}>
            <SingleDetail name='粉重' value={this.props.coffeeSettings.beanWeight+'g'} img={require('../../images/icon_beanweight.png')}/>
            <SingleDetail name='时间' value='02:30' img={require('../../images/icon_time.png')}/>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailContainer}>
              <Image style={styles.settingIcon} source={require('../../images/icon_grandsize.png')} />
              <Text style={styles.settingName}>研磨度</Text>
              <TouchableWithoutFeedback onPress={() => {this._showModal('研磨度')}}>
                <View style={styles.settingValueContainer}>
                  <Text style={styles.settingValue}>{this.state.grandSize}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
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
        <Modal
          animationType="fade"
          transparent={true}
          presentationStyle='overFullScreen'
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
        >
          <View style={styles.modalMask}>
            <View style={styles.modalContent}>
              <View style={styles.modalTitle}>
                <Text style={{fontSize: 18}}>{this.state.modalName}</Text>
              </View>
              <View style={styles.modalInput}>
                <TextInput
                  style={{fontSize: 18, padding: 0}}
                  onChangeText={(text) => this.setState({newOption: text})}
                  value={this.state.newOption}
                  placeholder={this._getModalPlaceHolder()}
                  underlineColorAndroid='transparent'
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableWithoutFeedback onPress={() => {this._setModalVisible(false)}}>
                  <View style={[styles.modalBtn,styles.withBorderRight]}>
                    <Text style={{fontSize: 18}}>取消</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={ () => this._changeValue(this.state.newOption)}>
                  <View style={styles.modalBtn}>
                    <Text style={{fontSize: 18, color:'#3CC51F'}}>确认</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </Modal>
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
  settingValueContainer: {
    borderStyle: 'solid',
    borderBottomColor: '#CACACA',
    borderBottomWidth: 0.5,
    marginLeft:10,
  },
  settingValue: {
    fontWeight: 'bold',
    color: '#232323',
    overflow: 'hidden',
    lineHeight:32,
    fontSize:15,
  },
  modalTitle: {
    display: 'flex',
    height:50,
    justifyContent: 'center',
    alignItems:'center',
  },
  modalMask: {
    flex:1,
    backgroundColor:'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent:{
    backgroundColor:'#fff',
    width:300,
    borderRadius:1.5,
  },
  modalInput: {
    height:40,
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:10,
    paddingRight:10,
  },
  modalBtn: {
    display: 'flex',
    height:50,
    borderTopWidth:0.5,
    borderStyle:'solid',
    borderTopColor: '#E8E8EA',
    justifyContent: 'center',
    alignItems:'center',
    width: 150,
  },
  withBorderRight: {
    borderStyle: 'solid',
    borderRightWidth: 0.5,
    borderRightColor: '#E8E8EA',
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