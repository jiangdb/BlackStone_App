import { combineReducers } from 'redux'
 
export default combineReducers({
    bleDevice: require('./bleDevice.js'),
    bleInfo: require('./bleInfo.js'),
    bleScan: require('./bleScan.js'),
    bleStatus: require('./bleStatus.js'),
    bleWeightNotify: require('./bleWeightNotify.js'),
    coffeeBuilder: require('./coffeeBuilder.js'),
    coffeeSettings: require('./coffeeSettings.js'),
    beanCategory: require('./beanCategory.js'),
    flavorSelect: require('./flavorSelect.js'),
    accessoriesSelect: require('./accessoriesSelect.js'),
    saveRecord: require('./saveRecord.js'),
    weightChart: require('./weightChart.js'),
    history: require('./history.js'),
    getStart: require('./getStart.js'),
    deviceSetting: require('./deviceSetting.js'),
})
