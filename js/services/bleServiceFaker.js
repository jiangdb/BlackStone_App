/*
 * ble service
 */

import * as bleActions from '../actions/ble.js'

let dispatch = null
let weightNotifyInterval = null
let deviceConnected = true;
let normalBuildData = null
let weight = {
  extract: 0,
  total: 0,
}

function init(store) {
  dispatch = store.dispatch
  dispatch(bleActions.bleOnBtStateChange("PoweredOn"))
  dispatch(bleActions.bleOnConnectionStateChange('connected', {id: 1, localName:'test', name:'test'}))
  normalBuildData = generateBuildData()
}

function deInit() {
}

function deviceScanStart() {
  console.log('start scan')
  dispatch(bleActions.bleStartScan())
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
}

function deviceScanStop() {
  console.log('stop scan')
  dispatch(bleActions.bleStopScan())
}

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

function deviceDisconnect(device) {
  console.log('device cancelConnection')
  dispatch(bleActions.bleOnConnectionStateChange('disconnecting', device))
  setTimeout(()=>{
    deviceConnected = false;
    dispatch(bleActions.bleOnConnectionStateChange('disconnected', device))
  }, 1000)
}

function deviceControl(opt) {
}

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

function enableWeightNotify(enable, build = false) {
  if (!deviceConnected) return

  if (enable) {
    if (weightNotifyInterval == null ) {
      let dataIndex = 0
      weightNotifyInterval = setInterval( ()=> {
        if (build) {
          weight.extract = normalBuildData[0][dataIndex++]
          weight.total = normalBuildData[1][dataIndex++]
          if (dataIndex >= normalBuildData[1].length) dataIndex = 0
        } else {
          weight.extract += 0.1
          weight.total += 0.1
        }
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

function scaleSetZero() {
  if (!deviceConnected) return

  weight.extract = 0
  weight.total = 0
  dispatch(bleActions.bleOnWeightChange(weight))
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
  scaleSetZero: scaleSetZero
}
