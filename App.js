import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './js/reducers/index'
import TabNavigator from './js/components/TabNavigator'
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
        <TabNavigator />
      </Provider>
    );
  }

  componentWillUnmount() {
    bleService.deInit();
  }

}
