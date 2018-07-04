import React, {Component}  from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, processColor,LayoutAnimation,findNodeHandle,UIManager } from 'react-native';
import { LineChart } from "../../libs/rnmpandroidchart";

class WeightChartSingle extends React.Component {
  constructor() {
    super();

    this.state = {
      description: {},
      data: {},
      xAxis: {},
      yAxis: {},
      legend: {},
    };
  }

  componentDidMount() {
    console.log('WeightChartSingle componentDidMount')
    this.setState({
      description: {
        text: 'Timemore',
        textColor: processColor('#e4e4e4'),
        textSize: 30,
      },
      data: {
        dataSets: [
          {
            values: Array.from(new Array(121), (val, index) => { return {x:index/10, y:0}}),
            label: 'ivisible',
            config: {
              visible:false,
            }
          },
          {
            values: [{x:0,y:0}],
            label: 'Total',
            config: {
              lineWidth: 1,
              drawValues: false,
              drawCircles: false,
              color: processColor('#53B2F0'),
              drawFilled: false,
            }
          }
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
          axisMaximum: Math.floor(this.props.coffeeSettings.waterWeight*1.3),
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
          colors: [processColor('#53B2F0')],
          labels: ['注水总量']
        }
      },
    })
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.coffeeBuilder.datas.length > this.props.coffeeBuilder.datas.length) {
      let count = nextProps.coffeeBuilder.datas.length
      let data = nextProps.coffeeBuilder.datas[ count -1 ]
      let preData = nextProps.coffeeBuilder.datas[ count -2 ]
      if(count > 112) {
        this._updateEntry(0,{x:data.time,y:data.total})        
        this._refreshChart()
      } else {
        this._addEntry(1,{x:data.time,y:data.total})
        this._refreshChart()
        if(count == 112) {
          this._removeDataset(0)
        }
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.coffeeBuilder.datas.length < 1) {
      return true
    }
    return false
  }

  _updateEntry = (index,value) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.refs.chart),
      UIManager.RNLineChart.Commands.updateEntry,
      [index,value],//[dataSet index, dataSet value]
    );
  };

  _addEntry = (index,value) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.refs.chart),
      UIManager.RNLineChart.Commands.addEntry,
      [index,value],//[dataSet index, dataSet value]
    );
  };

  _refreshChart = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.refs.chart),
      UIManager.RNLineChart.Commands.refresh,
      null,
    );
  };

  _removeDataset = (index) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.refs.chart),
      UIManager.RNLineChart.Commands.removeDataset,
      [index],
    );
  };

  render() {
    return (
        <LineChart
          style={styles.chart}
          chartDescription={this.state.description}
          data={this.state.data}
          legend={this.state.legend}
          xAxis={this.state.xAxis}
          yAxis={this.state.yAxis}
          drawGridBackground={false}
          touchEnabled={false}
          ref='chart'
        />
    );
  }
}

const styles = StyleSheet.create({
  chart: {
    height:220,
    width:360,
    marginLeft: 7.5,
    marginRight: 7.5,
    backgroundColor: '#fff'
  }
});

const mapStateToProps = state => {
  return {
    coffeeBuilder: state.coffeeBuilder,
    coffeeSettings: state.coffeeSettings,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const WeightChartSingleContainer = connect(
  mapStateToProps,
)(WeightChartSingle)

export default WeightChartSingleContainer
