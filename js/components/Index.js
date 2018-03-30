import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Button, Text, View } from 'react-native';
import { saveCoffeeSettings } from '../actions/coffeeSettings.js'

class Index extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>category: {this.props.coffeeSettings.category}</Text>
        <Text>ratioWater: {this.props.coffeeSettings.ratioWater}</Text>
        <Text>beanWeight: {this.props.coffeeSettings.beanWeight}</Text>
        <Text>waterWeight: {this.props.coffeeSettings.waterWeight}</Text>
        <Text>temperature: {this.props.coffeeSettings.temperature}</Text>
        <Text>grandSize: {this.props.coffeeSettings.grandSize}</Text>
        <Button
            title='saveCoffeeSettings'
            onPress={this.props.onSaveCoffeeSetting}
        >save settings
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    coffeeSettings: state.coffeeSettings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSaveCoffeeSetting: settings => {
      dispatch(saveCoffeeSettings({
        category: 'new one',
        beanWeight: 100
      }))
    }
  }
}

const IndexContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)

export default IndexContainer
