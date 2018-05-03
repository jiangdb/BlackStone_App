import React, {Component}  from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, processColor,LayoutAnimation } from 'react-native';
import ChartView from 'react-native-highcharts';
import { LineChart } from "react-native-charts-wrapper";
import update from 'immutability-helper';

{/*class WeightChart extends Component {

  constructor(props){
    super(props);
    this.state = {
      xtract:[],
      chartTotal:[],
      start: true,

    };
    this.x_total = 0;
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      start: nextProps.start,
    })
  }

  render() {
    let y_max = Math.floor(this.props.coffeeSettings.waterWeight*1.3);

      let Highcharts='Highcharts';
      let conf={
        chart: {
          animation: {
            duration: 100
          },
          type: 'area',
          marginTop: 30.5,
          events: {
            load: function () {
              // set up the updating of the chart each second
              let seriesTotal = this.series[0];
              let seriesExtract = this.series[1];

              let x_total = 0;
              let x_extract = 0;

              // if(this.state.start) {
                setInterval(function () {
                  let y_total = Math.random()*100;
                  // let y_total = this.props.bleWeightNotify.total.toFixed(1);

                  if(x_total<=120) {
                    seriesTotal.removePoint(x_total);
                    seriesTotal.addPoint([x_total, y_total], true,false);
                  } else {
                    seriesTotal.addPoint([x_total, y_total], true, true);
                  }
                  x_total += 1;
                }, 100);

                setInterval(function () {
                    let y_extract = Math.random()*100;
                    // let y_extract = this.props.bleWeightNotify.extract.toFixed(1);

                    if(x_extract<=120) {
                      seriesExtract.removePoint(x_extract);
                      seriesExtract.addPoint([x_extract, y_extract], true, false);
                    } else {
                      seriesExtract.addPoint([x_extract, y_extract], true, true);
                    }
                    x_extract += 1;
                }, 100);
              // }
            }
          }
        },
        title: null,
        tooltip: false,
        credits: {
            enabled: false
        },
        xAxis: {
          tickInterval: 20,
          labels: {
            formatter: function () {
                return this.value/10;
            }
          },
          lineWidth:2,
          lineColor: '#ccc',
          tickLength: 0
        },
        yAxis: {
          min: 0,
          max: y_max,
          tickAmount: 5,
          title: null,
          plotLines: [{
            value: 0,
            width: 1,
            color: '#333'
          }],
          labels:{
            x:-5,
            // align: 'left',
          },
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              }
            },
            marker: {
              enabled: false,
            },
            lineWidth: 1,
          }
        },
        legend: {
          margin: 5,
          itemDistance: 30,
          itemStyle: {
            fontSize: 13,
            fontWeight: 'normal',
            color: '#000',
          }
        },
        exporting: {
          enabled: false
        },
        series: [
          {
            name: '注水总量',
            data: (function () {
                    // generate an array of initial data
                    let data = [],i;

                    for (i = 0; i <= 120; i++) {
                        data.push({
                            x: i,
                            y: 0,
                        });
                    }
                    return data;
                }()),
            color: '#53B2F0',
            fillColor: {
              stops: [
                [0.3, 'rgba(131, 192, 232, .9)'],
                [1, 'rgba(185, 225, 245, 0)']
              ]
            },
          } , {
            name: '咖啡萃取量',
            data: (function () {
                    // generate an array of initial data
                    let data = [],i;

                    for (i = 0; i <= 120; i++) {
                        data.push({
                            x: i,
                            y: 0,
                        });
                    }
                    return data;
                }()),
            color: '#DFB86F',
            fillColor: {
              stops: [
                [0.3, 'rgba(224, 184, 112, .9)'],
                [1, 'rgba(231, 220, 200, 0)']
              ]
            },
          }
        ]
      };
      const options = {
        global: {
            useUTC: false
        },
        lang: {
            decimalPoint: ',',
            thousandsSep: '.'
        }
      };

      return (
        <View style={styles.chartContainer}>
          <ChartView
            style={{height:220,width:360}}
            config={conf}
            options={options}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          >
          </ChartView>
        </View>
      );
  }
}*/}

const colors = [processColor('#53B2F0'), processColor('#DFB86F'), processColor('yellow'), processColor('purple'), processColor('pink')];


class WeightChart extends React.Component {

  state = {
    legend: {
      enabled: true,
      textColor: processColor('#000'),
      textSize: 13,
      // position: 'BELOW_CHART_CENTER',
      form: 'CIRCLE',
      formSize: 12,
      wordWrapEnabled: true,
    },
    xAxis: {
      position: 'BOTTOM',
      drawGridLines: false,
      drawAxisLine: false,
      drawZeroLine: false,
      labelCount: 6,
    },
    yAxis: {
      axisMaximum: this.props.coffeeSettings.waterWeight*1.3,
      axisMinimum: 0,
      drawAxisLine: false,
      labelCount: 6,
    },
  };

  _next = () => {
    return {
      data: {
        dataSets: [{
          values: this.props.coffeeBuilder.chartTotal,
          label: '注水总量',
          config: {
            drawValues: false,
            color: processColor('#53B2F0'),
            mode: "CUBIC_BEZIER",
            drawCircles: false,
            lineWidth: 1.5,
            drawFilled: true,
            fillGradient: {
              colors: [processColor('rgba(131, 192, 232, .9)'), processColor('rgba(185, 225, 245, 0)')],
              positions: [0, 1],
              orientation: "BOTTOM_TOP",
            },
            fillAlpha: 150,
          }
        },{
          values: this.props.coffeeBuilder.chartExtract,
          label: '咖啡萃取量',
          config: {
            drawValues: false,
            color: processColor('#DFB86F'),
            mode: "CUBIC_BEZIER",
            drawCircles: false,
            lineWidth: 1.5,
            drawFilled: true,
            fillGradient: {
              colors: [processColor('rgba(224, 184, 112, .9)'), processColor('rgba(231, 220, 200, 0)')],
              positions: [0.3, 1],
              orientation: "BOTTOM_TOP",
            },
            fillAlpha: 150,
          }
        }],

      }
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps) {

  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return true;
  // }

  render() {
    return (
        <LineChart
          data={this._next().data}
          xAxis={this.state.xAxis}
          yAxis={this.state.yAxis}
          style={styles.chart}
          legend={this.state.legend}
          chartDescription={{text: ''}}
          ref="chart"
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

const WeightChartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WeightChart)

export default WeightChartContainer
