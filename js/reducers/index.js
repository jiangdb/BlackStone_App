import { combineReducers } from 'redux'
 
export default combineReducers({
    ble: require('./ble.js'),
    coffeeSettings: require('./coffeeSettings.js'),
})
