import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './js/reducers/index'
import Index from './js/components/Index'
 
let store = createStore(reducer)
 
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}
