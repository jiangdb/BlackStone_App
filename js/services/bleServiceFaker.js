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
  let deviceInfo = {}
  setTimeout(()=>{
    dispatch(bleActions.bleOnConnectionStateChange('connected', device))
    deviceConnected = true;
    dispatch(bleActions.bleDeviceReady(
      {
        displayName: 'Timemore',
        manufacturerName: 'Timemore',
        modelNum: 'TES04PL',
        serialNum: '30AEA41A2200',
        fwVersion: '0.80.20',
        batteryLevel: 10000,
        wifiStatus: 'connected',
        wifiSSID: 'test'
      }
    ))
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
        weight.extract = normalBuildData[0][dataIndex++]
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
 * Set zero on scale
 */
function scaleSetZero() {
  if (!deviceConnected) return

  dataIndex = 0
}

module.exports = {
  init: init,
  deInit: deInit,
  deviceConnect: deviceConnect,
  deviceDisconnect: deviceDisconnect,
  deviceScanStart: deviceScanStart,
  deviceScanStop: deviceScanStop,
  deviceControl: deviceControl,
  enableWeightNotify: enableWeightNotify,
  readWeight: readWeight,
  scaleSetZero: scaleSetZero
}
