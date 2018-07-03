import React, {Component}  from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, processColor,LayoutAnimation,ART,Button,findNodeHandle,UIManager,ReactNative } from 'react-native';
import { LineChart } from "../libs/rnmpandroidchart";

class LineChartContainer extends React.Component {
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
        textColor: processColor('red'),
        textSize: 30,
      },
      data: {
        dataSets: [
          {
            values: Array.from(new Array(100), (val, index) => { return {x:index-100, y:Math.random()*10+10}}),
            label: 'ivisible',
            config: {
              lineWidth: 1,
              drawValues: false,
              drawCircles: false,
              drawFilled: false,
              color: processColor('#E0B870'),
            }
          },
          {
            values: Array.from(new Array(100), (val, index) => { return {x:index-100, y:Math.random()*10+10}}),
            label: 'ivisible2',
            config: {
              lineWidth: 1,
              drawValues: false,
              drawCircles: false,
              drawFilled: false,
              color: processColor('#53B2F0'),

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
          axisMaximum: 30,
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
  }

  _updateEntry = (index,value) => {
      console.log('update entry: ' + index + ' ' + value)
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.refs.chart),
      UIManager.RNLineChart.Commands.updateEntry,
      [index,value],//[dataSet index,x,y]
    );
  }

  render() {
    return (
        <View style={{flexDirection: 'column'}}>
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
            <Button
              onPress={()=>{
                UIManager.dispatchViewManagerCommand(
                  findNodeHandle(this.refs.chart),
                  UIManager.RNLineChart.Commands.addEntry,
                  [0,1.2,1],//[dataSet index, x, y]
                );
              }}
              title="add entry"
            />
            <Button
              onPress={()=>{
                let i = 0
                this.interval=setInterval(() => {
                  i=i+2
                  this._updateEntry(0,{x:i,y:Math.random()*10+10});
                  this._updateEntry(1,{x:i,y:Math.random()*10+10});
                },200);
              }}
              title="update entry"
            />
            <Button
              onPress={()=>{
                this.interval && clearInterval(this.interval);
              }}
              title="stop"
            />
        </View>     
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

export default LineChartContainer
