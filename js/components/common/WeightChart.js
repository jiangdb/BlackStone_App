import React, {Component}  from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import ChartView from 'react-native-highcharts';

class WeightChart extends Component {

  state = {
    extractData: this.props.bleWeightNotify.extract.toFixed(1),
    totalData : this.props.bleWeightNotify.total.toFixed(1),
    chartExtract:[],
    chartTotal:[],
  };

  render() {
    let y_max = Math.floor(this.state.totalData*1.3);

      let Highcharts='Highcharts';
      let conf={
        chart: {
          type: 'area',
          marginTop: 30.5,
          events: {
            load: function () {
              // set up the updating of the chart each second
              let seriesTotal = this.series[0];
              let seriesExtract = this.series[1];

              setInterval(function () {
                  let x = (new Date()).getTime(), // current time
                      y = this.state.totalData;
                      // y = Math.random();
                      // console.log(this.state.totalData);

                  seriesTotal.addPoint([x, y], true, true);
              }, 100);
              setInterval(function () {
                  let x = (new Date()).getTime(), // current time
                      y = this.state.extractData;
                      // y = Math.random();

                  seriesExtract.addPoint([x, y], true, true);
              }, 100);

            }
          }
        },
        title: null,
        tooltip: false,
        credits: {
            enabled: false
        },
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
        },
        yAxis: {
          // min: 0,
          // max: y_max,
          title: null,
          plotLines: [{
            value: 0,
            width: 1,
            color: '#333'
          }]
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
            threshold: null
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
            // data: this.state.chartTotal,
            data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
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
            // data: this.state.chartExtract,
            data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
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
}

const styles = StyleSheet.create({
  chartContainer: {
    paddingRight: 7.5,
    paddingLeft: 7.5,
  },
});

const mapStateToProps = state => {
  return {
    bleWeightNotify: state.bleWeightNotify,
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
