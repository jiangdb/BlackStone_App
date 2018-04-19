/*
 * ble service
 */

import * as bleActions from '../actions/ble.js'

let UUIDS = {
  SERVICE_WEIGHT: '181D',
  CHAR_WEIGHT_MEASUREMENT: '2A9D',
  CHAR_WEIGHT_SCALE_FEATURE: '2A9E',
  CHAR_WEIGHT_CONTROL_POINT: '1234',
  CHAR_WEIGHT_CONTROL_POINT_V2: '553F4E49',

  SERVICE_DEVICE_INFORMATION: '180A',
  CHAR_MANUFACTURER_NAME_UUID: '2A29',
  CHAR_MODEL_NUMBER_UUID: '2A24',
  CHAR_SERIAL_NUMBER_UUID: '2A25',
  CHAR_FIRMWARE_VERSION_UUID: '2A26',
}

let WIFI_STATUS = [
  'unstart',
  'starting',
  'connecting',
  'connected',
  'disconnecting',
  'disconnected'
]

let SCALE_CONTROL = {
  SET_ZERO: 0,
  ZERO_TRACE: 1,
  ALARM_ENABLE: 2,
  WEIGHT_UNIT: 3,
  ALARM_TIME: 4,
  ALARM_WEIGHT: 5,
  WIFI: 6,
  FW_UPGRADE: 7,
  START_TIMER: 8,
  PAUSE_TIMER: 9,
  RESET_TIMER: 10,
  DEVICE_NAME: 11,
  FW_UPGRADE_V2: 12,
  WIFI_SSID: 13,
  WIFI_PASS: 14,
  WIFI_CONNECT: 15,
  KEY_SOUND: 16,
  KEY_VIBRATE: 17,
};

let SCALE_CONTROL_NOTIFY = {
  WIFI_STATUS: 0,
  BATTERY_LEVEL: 1,
};

let bleManager = null
let dispatch = null
let connectedDevice = {
  id: null,
  weightService: {
    id: null,
    charWeightMeasurementId: null,
    charWeightScaleFeatureId: null,
    charWeightScaleControlPointId: null,
  },
  deviceInfoService: {
    id: null,
    charManuNameId: null,
    charModelNumberId: null,
    charSerialNumberId: null,
    charFWVersionId: null,
  },
};

function init(store) {
  dispatch = store.dispatch
  dispatch(bleActions.bleOnBtStateChange("PoweredOn"))
}

function deInit() {
}

function deviceScanStart() {
  console.log('start scan')
  dispatch(bleActions.bleStartScan())
  setTimeout(()=>{
    let device = {
      id: 1,
      localName: 'localtest1',
      name: 'test1'
    }
    dispatch(bleActions.bleFindDevice(device))
    setTimeout(()=>{
      let device = {
        id: 2,
        localName: 'localtest2',
        name: 'test2'
      }
      dispatch(bleActions.bleFindDevice(device))
      setTimeout(()=>{
        let device = {
          id: 3,
          localName: 'localtest3',
          name: 'test3'
        }
        dispatch(bleActions.bleFindDevice(device))
      },1000)
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
    dispatch(bleActions.bleOnConnectionStateChange('disconnected', null))
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

