import React from 'react'
import { connect } from 'react-redux'
import TabNavigator from './TabNavigator'
import {Step} from './StackNavigators'

class ShowStep extends React.Component {

  render() {
    if(this.props.showStep.show) {
      return <Step/>
    } else {
      return <TabNavigator />
    }
  }
}

const mapStateToProps = state => {
  return {
    showStep: state.showStep
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const ShowStepContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowStep)

export default ShowStepContainer

