import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from '../reducers'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'accessories',
    'beanCategory',
    'bleDevice',
    'coffeeSettings',
    'deviceSetting',
    'flavor',
    'getStart',
    'history',
  ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

async function configureStore(onComplete: ?() => void) {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store, null, _ => onComplete());

  return { store, persistor }
}
module.exports = configureStore;
