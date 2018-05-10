import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './js/reducers/index'
import TabNavigator from './js/components/TabNavigator'
import Step0 from './js/components/Step0'
import Step1Container from './js/components/Step1'
import bleService from './js/services/bleServiceFaker.js'
 
let store = createStore(reducer)
console.log('init store', store.getState())
 
export default class App extends React.Component {
  componentDidMount() {
    bleService.init(store);
  }

  render() {
    return (
      <Provider store={store}>
        {/*<Step1Container/>*/}
        <TabNavigator />
      </Provider>
    );
  }

  componentWillUnmount() {
    bleService.deInit();
  }

}
