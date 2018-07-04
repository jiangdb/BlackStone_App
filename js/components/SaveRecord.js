import React from 'react';
import { connect } from 'react-redux'
import { Text, View,StyleSheet, TextInput, ScrollView,TouchableOpacity,Alert,BackHandler,Modal, Image, processColor,Navigator } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import StarRating from 'react-native-star-rating';
import { ChoiceBar, Divider, SingleDetail } from './Templates';
import { webServerStoreWork } from '../actions/webAction.js'
import { saveRecord, saveFlavor, saveAccessories } from '../actions/coffeeBuilder.js'
import { saveSelectedFlavor,saveSelectedAccessories } from '../actions/saveRecord.js'
import { LineChart } from "../libs/rnmpandroidchart";
import *as util from '../utils/util.js'
import { weChatLogin } from '../actions/loginActions.js'
import *as wechat from 'react-native-wechat'

class SaveRecord extends React.Component {
  static navigationOptions = {
    title: '保存记录',
    tabBarVisible: false,
  };

  state = {
    starCount: 5,
    comment: '',
    flavorOption:this.props.flavor.flavorOption,
    filterOption:this.props.accessories.filterOption,
    kettleOption:this.props.accessories.kettleOption,
    actualWaterWeight: null,
    actualRatioWater: null,
    actualTime: null,
    category: this.props.coffeeSettings.category,
    grandSize: this.props.coffeeSettings.grandSize,
    modalVisible: false,
    modalName: '',
    newOption:'',
    loginModalVisible: false,

    description: {},
    data: {},
    xAxis: {},
    yAxis: {},
    legend: {},
    navigation: null,
  };

  componentDidMount() {
    let length = this.props.coffeeBuilder.datas.length
    let lastData = this.props.coffeeBuilder.datas[length - 1]
    let beanWeight = this.props.coffeeSettings.beanWeight
    let actualRatioWater = lastData.extract == null ? Math.round(lastData.total/beanWeight) : Math.round(lastData.extract/beanWeight)
    let scaleNumber = lastData.extract == null ? 1 : 2
    let dataSets = [
      {
        values: Array.from(this.props.coffeeBuilder.datas, (val, index) => { return {x:val.duration/1000, y:val.total} }),
        label: 'Total',
        config: {
          lineWidth: 1,
          drawValues: false,
          drawCircles: false,
          color: processColor('#53B2F0'),
          drawFilled: false,
        }
      }
    ];
    if (scaleNumber == 2) {
      dataSets.push({
        values: Array.from(this.props.coffeeBuilder.datas, (val, index) => { return {x:val.duration/1000, y:val.extract} }),
        label: 'Extract',
        config: {
          lineWidth: 1,
          drawValues: false,
          drawCircles: false,
          color: processColor('#E0B870'),
          drawFilled: false,
        }
      }) 
    }

    this.setState({
      actualWaterWeight: lastData.total.toFixed(1),
      actualRatioWater: actualRatioWater,
      actualTime: Math.floor(lastData.duration/1000),

      description: {
        text: 'Timemore',
        textColor: processColor('#e4e4e4'),
        textSize: 30,
        //positionX: 500,
        //positionY: 200
      },
      data: {
        dataSets: dataSets
      },
      xAxis: {
        enabled: true,
        position: 'BOTTOM',
        drawAxisLine: true,
        drawLabels: true,
        drawGridLines: false,
        textColor: processColor('#AAAAAA'),
        textSize: 12,
      },
      yAxis: {
        left: {
          enabled: true,
          axisMinimum: 0,
          drawAxisLine: true,
          drawLabels: true,
        },
        right: {
          enabled: false
        }
      },
      legend: {
        enabled: true,
        textColor: processColor('#232323'),
        textSize: 13,
        position: 'BELOW_CHART_CENTER',     //bug in react-native-chart-wraper, not handle this in ChartBaseManager.java  node_modules/react-native-charts-wrapper/android/src/main/java/com/github/wuxudong/rncharts/charts line 97
        form: 'CIRCLE',
        formSize: 12,
        xEntrySpace: 50,
        formToTextSpace: 7,
        custom: {
          colors: scaleNumber == 1 ? [processColor('#53B2F0')] : [processColor('#53B2F0'), processColor('#DFB86F')],
          labels: scaleNumber == 1 ? ['注水总量'] : ['注水总量', '咖啡萃取量']
        }
      },
      navigation: util.addNavigationWithDebounce(this.props.navigation)
    })
  }

  componentWillUnmount() {
    //change saveRecord reducer back to initial state
    this.props.onSaveSelectedFlavor({flavor:[]});
    this.props.onSaveSelectedAccessories({accessories:[]});

    //deselected  flavors and accessories in reducer 
    this.setState({
      flavorOption: this.state.flavorOption.map((flavor) => {
        return Object.assign({}, flavor, {
                  ...flavor,
                  selected: false
                })
      }),
      filterOption: this.state.filterOption.map((filter) => {
        return Object.assign({}, filter, {
                  ...filter,
                  selected: false,
                });
      }),
      kettleOption: this.state.kettleOption.map((kettle) => {
        return Object.assign({}, kettle, {
                ...kettle,
                selected: false,
              });
      })
    });

    this.props.onSaveFlavor(this.state.flavorOption);
    this.props.onSaveAccessories({
      filterOption:this.state.filterOption,
      kettleOption:this.state.kettleOption
    });
  }

  onBackButtonPressAndroid = () => {
      console.log('back');
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
    if(this.props.saveRecord.flavor.length === 0) {
      return '请选择';
    } else {
      return this.props.saveRecord.flavor.join(',')
    }
  };

  _getSelectedAccessories = () => {
    if(this.props.saveRecord.accessories.length === 0) {
      return '请选择';
    } else {
      return this.props.saveRecord.accessories.join(',')
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
  };

  _onSaveRecord = () => {
    // if(this.props.webServer.token == null) {
    //   this.setState({loginModalVisible:true})
    // } else {
      let date = new Date();
      let work = {
        device: this.props.bleInfo.displayName,
        date: util.formatTime(date),
        starCount: this.state.starCount,
        flavor: this.props.saveRecord.flavor,
        accessories: this.props.saveRecord.accessories,
        comment: this.state.comment,
        category: this.state.category,
        ratioWater: this.props.coffeeSettings.ratioWater,
        actualRatioWater: this.state.actualRatioWater,
        beanWeight: this.props.coffeeSettings.beanWeight,
        waterWeight: this.props.coffeeSettings.waterWeight,
        actualWaterWeight: this.state.actualWaterWeight,
        temperature: this.props.coffeeSettings.temperature,
        grandSize: this.state.grandSize,
        totalSeconds: this.state.actualTime,
        datas: this.props.coffeeBuilder.datas,
        shareUrl: null
      }
      let index = this.props.history.historyList.length

      this.props.onSaveRecord(work); //save to local
      // this.props.onStoreWork(work,index); //save to server
      this.props.navigation.replace('HistoryDetail', {
        itemIndex: index
      })
    // }    
  };

  render() {
    return (
      <ScrollView contentContainer={{ flexDirection: 'column'}}>
        <View style={{ flexDirection: 'column', marginTop: 8.5,}}>
          <TouchableOpacity activeOpacity={1}>
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
          </TouchableOpacity>
          <Divider/>
          <ChoiceBar
            title='风味'
            value={this._getSelectedFlavor()}
            icon='more'
            onPress={() => this.state.navigation.navigateWithDebounce('Flavor')}
          />
          <Divider/>
          <ChoiceBar
            title='设备'
            value={this._getSelectedAccessories()}
            icon='more'
            onPress={() => this.state.navigation.navigateWithDebounce('Accessories')}
          />
          <Divider/>
          <View style={{height:165.5,backgroundColor: '#fff'}}>
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
          <View style={{ flexDirection: 'row', justifyContent:'flex-end',backgroundColor: '#fff'}}>
            <Text style={styles.numberIndicate}>{this.state.comment.length}/100</Text>
          </View>
        </View>

        <View style={{flexDirection: 'column', alignItems:'center', marginTop: 8.5,backgroundColor: '#fff'}}>
          <View style={styles.detailRow}>
            <View style={styles.detailContainer}>
              <Image style={styles.settingIcon} source={require('../../images/icon_brand.png')} />
              <Text style={styles.settingName}>咖啡豆</Text>
              <TouchableOpacity onPress={() => {this._showModal('咖啡豆')}} activeOpacity={1}>
                <View style={styles.settingValueContainer}>
                  <Text
                    style={styles.settingValue}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                  >{this.state.category}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.detailContainer}></View>
          </View>
          <View style={styles.detailRow}>
            <SingleDetail name='粉重' value={this.props.coffeeSettings.beanWeight+'g'} img={require('../../images/icon_beanweight.png')}/>
            <SingleDetail name='时间' value={util.convertSecondToFormatTime(this.state.actualTime)} img={require('../../images/icon_time.png')}/>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailContainer}>
              <Image style={styles.settingIcon} source={require('../../images/icon_grandsize.png')} />
              <Text style={styles.settingName}>研磨度</Text>
              <TouchableOpacity onPress={() => {this._showModal('研磨度')}} activeOpacity={1}>
                <View style={styles.settingValueContainer}>
                  <Text style={styles.settingValue}>{this.state.grandSize}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <SingleDetail name='水温' value={this.props.coffeeSettings.temperature+'℃'} img={require('../../images/icon_temp.png')}/>
          </View>

          <View style={styles.detailRow}>
            <SingleDetail name='预设注水量' value={this.props.coffeeSettings.waterWeight+'g'} img={require('../../images/icon_proportion.png')}/>
            <SingleDetail name='实际注水量' value={this.state.actualWaterWeight+'g'} img={require('../../images/icon_waterweight.png')}/>
          </View>

          <View style={styles.detailRow}>
            <SingleDetail name='预设粉水比' value={'1:'+this.props.coffeeSettings.ratioWater} img={require('../../images/icon_proportion.png')}/>
            <SingleDetail name='实际粉水比' value={'1:'+this.state.actualRatioWater} img={require('../../images/icon_proportion.png')}/>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 8.5,backgroundColor: '#fff', height: 320, justifyContent: 'center'}}>
          <LineChart
            style={styles.chart}
            chartDescription={this.state.description}
            data={this.state.data}
            legend={this.state.legend}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            drawGridBackground={false}
            touchEnabled={false}
          />
        </View>
        <TouchableOpacity onPress={this._onSaveRecord} activeOpacity={1}>
          <View style={styles.btnSave}>
            <Text style={styles.btnSaveText}>保存</Text>
          </View>
        </TouchableOpacity>
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
                  keyboardType={this.state.modalName == '研磨度'? 'numeric':'default'}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => {this._setModalVisible(false)}} activeOpacity={1}>
                  <View style={[styles.modalBtn,styles.withBorderRight]}>
                    <Text style={{fontSize: 18}}>取消</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={ () => this._changeValue(this.state.newOption)}
                  activeOpacity={1}
                >
                  <View style={styles.modalBtn}>
                    <Text style={{fontSize: 18, color:'#3CC51F'}}>确认</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          presentationStyle='overFullScreen'
          visible={this.state.loginModalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
        >
          <View style={styles.modalMask}>
            <View style={styles.modalContent}>
              <View style={styles.modalTitle}>
                <Text style={{fontSize: 18}}>请先登录</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => {this.setState({loginModalVisible:false})}} activeOpacity={1}>
                  <View style={[styles.modalBtn,styles.withBorderRight]}>
                    <Text style={{fontSize: 18}}>取消</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={ () => {
                    this.setState({loginModalVisible:false})
                    this.props.onWeChatLogin()
                  }}
                  activeOpacity={1}
                >
                  <View style={styles.modalBtn}>
                    <Text style={{fontSize: 18, color:'#3CC51F'}}>微信登录</Text>
                  </View>
                </TouchableOpacity>
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
    paddingLeft:18,
    paddingRight: 16,
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
  },
  chart: {
    height:300,
    width:360,
    marginLeft: 7.5,
    marginRight: 7.5,
    backgroundColor: '#fff'
  }
});

const mapStateToProps = state => {
  return {
    coffeeSettings: state.coffeeSettings,
    flavor: state.flavor,
    accessories: state.accessories,
    coffeeBuilder: state.coffeeBuilder,
    history: state.history,
    bleInfo: state.bleInfo,
    saveRecord: state.saveRecord,
    weChat: state.weChat,
    webServer: state.webServer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSaveRecord: record => {
      dispatch(saveRecord(record))
    },
    onStoreWork: (work,index) => {
      dispatch(webServerStoreWork(work,index))
    },
    onSaveFlavor: flavor => {
      dispatch(saveFlavor(flavor))
    },
    onSaveAccessories: (accessories) => {
      dispatch(saveAccessories(accessories))
    },
    onSaveSelectedFlavor: flavor => {
      dispatch(saveSelectedFlavor(flavor))
    },
    onSaveSelectedAccessories: (accessories) => {
      dispatch(saveSelectedAccessories(accessories))
    },
    onWeChatLogin: () => {
      dispatch(weChatLogin())
    }
  }
}

const SaveRecordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveRecord)

export default SaveRecordContainer
