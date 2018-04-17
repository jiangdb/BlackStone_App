import { combineReducers } from 'redux'
 
export default combineReducers({
    coffeeSettings: require('./coffeeSettings.js'),
    deviceScan: require('./device.js'),
})
