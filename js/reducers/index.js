import { combineReducers } from 'redux'
 
export default combineReducers({
    bleScan: require('./bleScan.js'),
    bleStatus: require('./bleStatus.js'),
    bleWeightNotify: require('./bleWeightNotify.js'),
    coffeeSettings: require('./coffeeSettings.js'),
})
