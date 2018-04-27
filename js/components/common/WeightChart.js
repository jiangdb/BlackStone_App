import React, {Component}  from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import ChartView from 'react-native-highcharts';

class WeightChart extends Component {

  state = {
    chartExtract:[],
    chartTotal:[],
  };

  render() {
    let y_max = Math.floor(this.props.coffeeSettings.waterWeight*1.3);

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

                let x_total = 0;
                let x_extract = 0;

                setInterval(function () {
                    // let y_total = Math.random()*10;
                    let y_total = this.props.bleWeightNotify.total.toFixed(1);

                    if(x_total<=120) {
                      seriesTotal.removePoint(x_total);
                      seriesTotal.addPoint([x_total, y_total], true,false);
                    } else {
                      seriesTotal.addPoint([x_total, y_total], true, true);
                    }
                    x_total += 1;
                }, 100);

                setInterval(function () {
                    // let y_extract = Math.random()*10;
                    let y_extract = this.props.bleWeightNotify.extract.toFixed(1);

                    if(x_extract<=120) {
                      seriesExtract.removePoint(x_extract);
                      seriesExtract.addPoint([x_extract, y_extract], true, false);
                    } else {
                      seriesExtract.addPoint([x_extract, y_extract], true, true);
                    }
                    x_extract += 1;
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
          // max: y_max,
          tickAmount: 5,
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
    coffeeSettings: state.coffeeSettings
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
