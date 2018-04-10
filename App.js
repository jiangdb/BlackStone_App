import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './js/reducers/index'
import TabNavigator from './js/components/TabNavigator'
 
let store = createStore(reducer)
console.log('init store', store.getState())
 
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <TabNavigator />
      </Provider>
    );
  }
}
