/*
 * ble service
 */

import * as bleActions from '../actions/ble.js'

let dispatch = null
let weightNotifyInterval = null
let deviceConnected = true;
let weight = {
  extract: 0,
  total: 0,
}

function init(store) {
  dispatch = store.dispatch
  dispatch(bleActions.bleOnBtStateChange("PoweredOn"))
  dispatch(bleActions.bleOnConnectionStateChange('connected', {id: 1, localName:'test', name:'test'}))
  dispatch(bleActions.bleDeviceReady())
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
    deviceInfo.localName = 'test'
    deviceInfo.name = 'test'
    dispatch(bleActions.bleOnDeviceInfoChange(deviceInfo))
    deviceConnected = true;
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

function enableWeightNotify(enable) {
  if (!deviceConnected) return

  if (enable) {
    if (weightNotifyInterval == null ) {
      weightNotifyInterval = setInterval( ()=> {
        weight.extract += 0.1
        weight.total += 0.1
        dispatch(bleActions.bleOnWeightChange(weight))
      }, 1000)
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
