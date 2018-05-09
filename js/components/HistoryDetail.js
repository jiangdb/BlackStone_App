import React from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, ScrollView, processColor } from 'react-native';
import { ChoiceBar, Divider, SingleDetail } from './Templates';
import StarRating from 'react-native-star-rating';
import { LineChart } from "react-native-charts-wrapper";

class HistoryDetail extends React.Component {
  static navigationOptions = {
    title: 'TIMEMORE Labs',
    tabBarVisible: false,
  };

  state = {
    description: {},
    data: {},
    xAxis: {},
    yAxis: {},
    legend: {},
    extract: [{x:0,y:0}],
    total: [{x:0,y:0}],
  };

  componentWillMount() {
    const itemIndex = JSON.stringify(this.props.navigation.getParam('itemIndex', 0));
    let length = this.props.history.historyList[itemIndex].chartDatas.length

    for( let i = 0; i<length; i++) {
      let data = this.props.history.historyList[itemIndex].chartDatas[ i ]
      this.state.extract.push({
        x: i/10,
        y: data.extract
      })
      this.state.total.push({
        x: i/10,
        y: data.total
      })
    }
  };

  componentDidMount() {
    this.setState({
      description: {
        text: 'Timemore',
        textColor: processColor('red'),
        textSize: 30,
        //positionX: 500,
        //positionY: 200
      },
      data: {
        dataSets: [
          {
            values: this.state.extract,
            label: 'Extract',
            config: {
              lineWidth: 1,
              drawValues: false,
              drawCircles: false,
              color: processColor('#E0B870'),
              drawFilled: false,
            }
          },
          {
            values: this.state.total,
            label: 'Total',
            config: {
              lineWidth: 1,
              drawValues: false,
              drawCircles: false,
              color: processColor('#53B2F0'),
              drawFilled: false,
            }
          },
        ]
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
          colors: [processColor('#53B2F0'), processColor('#DFB86F')],
          labels: ['注水总量', '咖啡萃取量']
        }
      },
    })
  }

  _getSelectedFlavor = (index) => {
    let selectedFlavor = this.props.history.historyList[index].flavor;
    if(selectedFlavor.length === 0) {
      return ;
    } else {
      return selectedFlavor.map((flavor) => {return flavor.name}).join(",");
    }
  };

  _getSelectedAccessories = (index) => {
    let selectedFilter = this.props.history.historyList[index].accessories.filter;
    let selectedKettle = this.props.history.historyList[index].accessories.kettle;
    if(selectedFilter.length === 0 && selectedKettle.length === 0) {
      return
    } else {
      let selectedAccessories = [selectedFilter[0].name, selectedKettle[0].name];
      return selectedAccessories.join(" ");
    }
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

  render() {
    const itemIndex = JSON.stringify(this.props.navigation.getParam('itemIndex', 0));

    let history = this.props.history.historyList[itemIndex];
    return (
      <ScrollView contentContainer={{ flexDirection: 'column'}}>
        <View style={{ flexDirection: 'column', marginTop: 8.5,backgroundColor: '#fff'}}>
          <View style={styles.choiceBar}>
            <Text style={styles.choiceTitle}>评分</Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center'}}>
              <StarRating
                disabled={false}
                halfStarEnabled={false}
                maxStars={5}
                fullStar={require('../../images/star.png')}
                emptyStar={require('../../images/star_white.png')}
                rating={history.starCount}
                disabled={true}
              />
              <Text style={styles.rateValue}>{this._renderRateValue(history.starCount)}</Text>
            </View>
          </View>
          <Divider/>
          <ChoiceBar title='风味' value={this._getSelectedFlavor(itemIndex)} />
          <Divider/>
          <ChoiceBar title='设备' value={this._getSelectedAccessories(itemIndex)} />
          <Divider/>

          <View style={{height:165.5}}>
            <Text style={styles.comment}>{history.comment}</Text>
          </View>
        </View>

        <View style={{flexDirection: 'column', alignItems:'center', marginTop: 8.5,backgroundColor: '#fff'}}>
          <View style={styles.detailRow}>
            <SingleDetail name='咖啡豆' value={history.category} img={require('../../images/icon_brand.png')}/>
            <SingleDetail/>
          </View>
          <View style={styles.detailRow}>
            <SingleDetail name='粉重' value={history.beanWeight+'g'} img={require('../../images/icon_beanweight.png')}/>
            <SingleDetail name='时间' value={history.totalSeconds} img={require('../../images/icon_time.png')}/>
          </View>

          <View style={styles.detailRow}>
            <SingleDetail name='研磨度' value={history.grandSize} img={require('../../images/icon_grandsize.png')}/>
            <SingleDetail name='水温' value={history.temperature} img={require('../../images/icon_temp.png')}/>
          </View>

          <View style={styles.detailRow}>
            <SingleDetail name='预设注水量' value={history.waterWeight+'g'} img={require('../../images/icon_proportion.png')}/>
            <SingleDetail name='实际注水量' value={history.actualWaterWeight+'g'} img={require('../../images/icon_waterweight.png')}/>
          </View>

          <View style={styles.detailRow}>
            <SingleDetail name='预设粉水比' value={'1:'+history.ratioWater} img={require('../../images/icon_proportion.png')}/>
            <SingleDetail name='实际粉水比' value={'1:'+history.actualRatioWater} img={require('../../images/icon_proportion.png')}/>
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
  chart: {
    height:300,
    width:360,
    marginLeft: 7.5,
    marginRight: 7.5,
    backgroundColor: '#fff'
  }
})

const mapStateToProps = state => {
  return {
    history: state.history
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