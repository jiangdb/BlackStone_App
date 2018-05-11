import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './js/reducers/index'
import TabNavigator from './js/components/TabNavigator'
import bleService from './js/services/bleServiceFaker.js'
import ShowStepContainer from './js/components/ShowStep.js'
 
let store = createStore(reducer)
console.log('init store', store.getState())
 
export default class App extends React.Component {

  state = {
    initialState: true
  }

  componentDidMount() {
    bleService.init(store);
  };

  _getComponent = () => {
    if(this.state.initialState) return <ShowStepContainer/>
      return <TabNavigator/>
  }

  render() {
    return (
      <Provider store={store}>
        {this._getComponent()}
      </Provider>
    );
  }

  componentWillUnmount() {
    bleService.deInit();
  }

}
