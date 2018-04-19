/*
 * ble service
 */

import * as bleActions from '../actions/ble.js'

let dispatch = null

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
  }, 2000)
}

function deviceDisconnect(device) {
  console.log('device cancelConnection')
  setTimeout(()=>{
    dispatch(bleActions.bleOnConnectionStateChange('disconnected', device))
  }, 1000)
}

function deviceControl(opt) {
}

module.exports = {
  init: init,
  deInit: deInit,
  deviceConnect: deviceConnect,
  deviceDisconnect: deviceDisconnect,
  deviceScanStart: deviceScanStart,
  deviceScanStop: deviceScanStop,
  deviceControl: deviceControl
}
