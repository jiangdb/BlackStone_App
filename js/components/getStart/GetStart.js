import React from 'react'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import TabNavigator from '../TabNavigator'
import {GetStartStack} from '../StackNavigators'

class GetStart extends React.Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    if(this.props.getStart.show) {
      return <GetStartStack/>
    } else {
      return <TabNavigator />
    }
  }
}

const mapStateToProps = state => {
  return {
    getStart: state.getStart
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const GetStartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GetStart)

export default GetStartContainer

