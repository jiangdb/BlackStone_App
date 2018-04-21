import React, {Component}  from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import bleService from '../../services/bleService.js'

class WeightReading extends Component {
  render() {
    if (this.props.type == 'extract' && this.props.bleWeightNotify.extract!== null )
      return (
        <View style={styles.flexColumn}>
          <Text style={styles.readerTitle}>咖啡萃取量(g)</Text>
          <Text style={styles.reader}>{this.props.bleWeightNotify.extract >= 2000 ? 'FFFF': this.props.bleWeightNotify.extract.toFixed(1)}</Text>
        </View>
      );
    else if(this.props.type == 'total')
      return (
        <View style={styles.flexColumn}>
          <Text style={styles.readerTitle}>注水总量(g)</Text>
          <Text style={styles.reader}>{this.props.bleWeightNotify.total >= 3000 ? 'FFFF': this.props.bleWeightNotify.total.toFixed(1)}</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection:'row',
    alignItems: 'center',
  },
  flexColumn: {
    flexDirection:'column',
  },
  readerTitle: {
    color: '#5B5B5B',
    fontSize: 13,
    marginTop: 17,
  },
  reader: {
    fontWeight: 'bold',
    color: '#232323',
    fontSize: 45,
    height: 52,
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

const WeightReadingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WeightReading)

export default WeightReadingContainer
