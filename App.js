import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './js/store/configureStore'
import reducer from './js/reducers/index'
import bleService from './js/services/bleService.js'
import TabNavigator from './js/components/TabNavigator'
import GetStartContainer from './js/components/getStart/GetStart.js'
import * as webAction from './js/actions/webAction.js'
import * as weChat from './js/actions/weChat.js'

export default class App extends React.Component {

  state = {
    storeRehydrated: false,
    storeCreated: false,
    store: null,
    persistor:null
  };

  componentDidMount() {
    configureStore(
      // rehydration callback (after async compatibility and persistStore)
      () => {
        this.setState({ storeRehydrated: true })
        console.log('init state', this.state.store.getState())
        bleService.init(this.state.store);
        webAction.init(this.state.store)
      }
    ).then(
      // creation callback (after async compatibility)
      configureStore => {
        this.setState({
          storeCreated: true,
          store: configureStore.store,
          persistor: configureStore.persistor,
        })
      }
    );
  };

  _getComponent = () => {
    if(this.state.store.getState().getStart.show)
      return <GetStartContainer/>
    return <TabNavigator/>
  }

  render() {
    if(!this.state.storeCreated || !this.state.storeRehydrated) return null

    return (
      <Provider store={this.state.store}>
        <PersistGate loading={null} persistor={this.state.persistor}>
          {this._getComponent()}
        </PersistGate>
      </Provider>
    );
  }

  componentWillUnmount() {
    bleService.deInit();
  }
}
