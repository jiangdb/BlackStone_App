/*
 * ble service
 */

import * as bleActions from '../actions/ble.js'

let dataIndex = 0
let deviceConnected = true;
let dispatch = null
let normalBuildData = null
let weightNotifyInterval = null
let weight = {
  extract: 0,
  total: 0,
}

/**
 * Initiate function
 * @param {Object} redux store object
 */
function init(store) {
  dispatch = store.dispatch
  dispatch(bleActions.bleOnBtStateChange("PoweredOn"))
  normalBuildData = generateBuildData()
  dispatch(bleActions.bleOnConnectionStateChange('connected', {
      id: 1,
      localName: 'test1',
      name: 'test1'
  }))
  deviceConnected = true;
  dispatch(bleActions.bleOnDeviceInfoChange({
    displayName: 'Timemore',
    manufacturerName: 'Timemore',
    modelNum: 'TES04PL',
    serialNum: '30AEA41A2200',
    fwVersion: '0.80.20',
    description: 'line-one\r\nline-two',
    batteryLevel: 3,
    wifiStatus: 'connected',
    wifiSSID: 'test'
  }))
  dispatch(bleActions.bleDeviceReady())
  enableWeightNotify(true)
}

/**
 * Deinitiate function
 */
function deInit() {
}

/**
 * Start ble scan
 */
function deviceScanStart() {
  console.log('start scan')
  dispatch(bleActions.bleStartScan())
  setTimeout(()=>{
    let device = {
      id: 1,
      localName: 'test1',
      name: 'test1'
    }
    dispatch(bleActions.bleFindDevice(device))
    setTimeout(()=>{
      let device = {
        id: 2,
        localName: 'test2',
        name: 'test2'
      }
      dispatch(bleActions.bleFindDevice(device))
      setTimeout(()=>{
        let device = {
          id: 3,
          localName: 'test3',
          name: 'test3'
        }
        dispatch(bleActions.bleFindDevice(device))
      },1000)
    },1000)
  },1000)
}

/**
 * Stop ble scan
 */
function deviceScanStop() {
  console.log('stop scan')
  dispatch(bleActions.bleStopScan())
}

/**
 * Connect ble device
 * @param {Object} ble-plx device object
 */
function deviceConnect(device) {
  console.log('start connect: ' + device.id)
  dispatch(bleActions.bleOnConnectionStateChange('connecting', device))
  setTimeout(()=>{
    dispatch(bleActions.bleOnConnectionStateChange('connected', device))
    deviceConnected = true;
    dispatch(bleActions.bleOnDeviceInfoChange({
      displayName: 'Timemore',
      manufacturerName: 'Timemore',
      modelNum: 'TES04PL',
      serialNum: '30AEA41A2200',
      fwVersion: '0.80.20',
      batteryLevel: 3,
      wifiStatus: 'connected',
      wifiSSID: 'test'
    }))
    dispatch(bleActions.bleDeviceReady())
    enableWeightNotify(true)
  }, 2000)
}

/**
 * Disconnect from device
 * @param {Object} ble-plx device object
 */
function deviceDisconnect(device) {
  console.log('device cancelConnection')
  dispatch(bleActions.bleOnConnectionStateChange('disconnecting', device))
  setTimeout(()=>{
    enableWeightNotify(false)
    deviceConnected = false;
    dispatch(bleActions.bleOnConnectionStateChange('disconnected', device))
  }, 1000)
}

/**
 * Write command to scale
 * @param {number} opt commander
 */
function deviceControl(opt) {
}

/**
 * Generate a normal build data
 */
function generateBuildData() {
  //two channel, 0 for extract, 1 for total, 29 seconds data.
  var rtn = [
    [],
    []
  ];

  // first 2 seconds reamin 0
  for (var i=0; i<20; i++) {
    rtn[0][i] = 0;
    rtn[1][i] = 0
  }

  // next 16 seconds keep inscrease
  for (var i = 20; i < 180; i++) {
    rtn[0][i] = Math.random() * 1 + 0.1 + rtn[0][i-1]; // add random 1～3g to previous weight
    rtn[1][i] = Math.random() * 20 + 30 + rtn[0][i];   // add random 30～50g to extract weight
  }

  // last 11 seconds set 0
  for (var i = 180; i < 290; i++) {
    rtn[0][i] = 0;
    rtn[1][i] = 0;
  }
  return rtn;
}

/**
 * Enable scale's weight notify
 * @param {boolean} enable enable or disable notify
 */
function enableWeightNotify(enable) {
  if (!deviceConnected) return

  if (enable) {
    if (weightNotifyInterval == null ) {
      weightNotifyInterval = setInterval( ()=> {
        weight.extract = normalBuildData[0][dataIndex]
        weight.total = normalBuildData[1][dataIndex++]
        if (dataIndex >= normalBuildData[1].length) dataIndex = 0
        dispatch(bleActions.bleOnWeightChange(weight))
      }, 100)
    }
  } else {
    if (weightNotifyInterval != null ) {
      clearInterval(weightNotifyInterval)
      weightNotifyInterval = null
    }
  }
}

/**
 * Read current weight on scale
 * @returns {object} object with extrat and total,
 * if extract is null, means scale is in single scale mode
 */
function readWeight() {
  return weight
}

/**
 * Set scale alarm enble or disable
 * @param {boolean} enable enable or disable alarm
 * @returns {boolean} boolean for success or fail
 */
function setAlarmEnable(enable) {
  if (!deviceConnected) return false

  return true
}

/**
 * Set scale alarm weight, exceed this weight, scale will alarm
 * @param {number} weight weight in coffeesetting
 * @returns {boolean} boolean for success or fail
 */
function setAlarmWeight(weight) {
  if (!deviceConnected) return false

  return true
}

/**
 * Set scale alarm time, exceed this time, scale will alarm
 * @param {number} time time in coffeesetting
 * @returns {boolean} boolean for success or fail
 */
function setAlarmTime(time) {
  if (!deviceConnected) return false

  return true
}

/**
 * Set scale key sound enble or disable
 * @param {boolean} enable enable or disable key sound
 * @returns {boolean} boolean for success or fail
 */
function setKeySound(enable) {
  if (!deviceConnected) return false

  return true
}

/**
 * Set scale key vibrate enble or disable
 * @param {boolean} enable enable or disable key vibrate
 * @returns {boolean} boolean for success or fail
 */
function setKeyVibrate(enable) {
  if (!deviceConnected) return false

  return true
}

/**
 * Set scale device name, max length to 20 characters, state will update
 * @param {string} name
 */
function setName(name) {
  if (!deviceConnected || !name.length || name.length > 20) return

  dispatch(bleActions.bleOnDeviceInfoChange({
    displayName: name,
  }))
}

/**
 * Set scale wifi ssid, pass, max length to 20 characters, state will update
 * @param {string} ssid Wifi SSID
 * @param {string} pass Wifi Pass
 */
function setWifi(ssid, pass) {
  if (!deviceConnected || !ssid.length || ssid.length > 20 || !pass.length || pass.length > 20) return

  dispatch(bleActions.bleOnDeviceInfoChange({
    wifiSSID: ssid,
    wifiStatus: 'connecting'
  }))

  setTimeout( ()=>{
    dispatch(bleActions.bleOnDeviceInfoChange({
      wifiStatus: 'connected'
    }))
  }, 2000)
}

/**
 * Set zero on scale
 * @returns {boolean} boolean for success or fail
 */
function setZero() {
  if (!deviceConnected) return false

  dataIndex = 0
  return true
}

/**
 * Start timer on scale
 * @returns {boolean} boolean for success or fail
 */
function timerStart() {
  if (!deviceConnected) return false

  return true
}

/**
 * Pause timer on scale
 * @returns {boolean} boolean for success or fail
 */
function timerPause() {
  if (!deviceConnected) return false

  return true
}

/**
 * Reset timer on scale
 * @returns {boolean} boolean for success or fail
 */
function timerReset() {
  if (!deviceConnected) return false

  return true
}

module.exports = {
  init: init,
  deInit: deInit,
  deviceConnect: deviceConnect,
  deviceDisconnect: deviceDisconnect,
  deviceScanStart: deviceScanStart,
  deviceScanStop: deviceScanStop,
  deviceControl: deviceControl,
  readWeight: readWeight,
  setAlarmEnable: setAlarmEnable,
  setAlarmWeight: setAlarmWeight,
  setAlarmTime: setAlarmTime,
  setKeySound: setKeySound,
  setKeyVibrate: setKeyVibrate,
  setName: setName,
  setWifi: setWifi,
  setZero: setZero,
  timerStart: timerStart,
  timerPause: timerPause,
  timerReset: timerReset,
}
