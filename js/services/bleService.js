/*
 * ble service
 */

import { BleManager, BleErrorCode } from 'react-native-ble-plx';
import { Buffer } from 'buffer';
import * as bleActions from '../actions/ble.js'
import util from '../utils/util.js'

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
let appStore = null
let dispatch = null
/*
 * structure of connectedDevice
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
 */
let connectedDevice = null
let bleStateSubscription = null
let reconnectTimer = null
let weightNotifyInterval = null
let weightControlNotify = null
let weightMeasureMonitor = null
let weightMeasurement = {
  extract: 0,
  total: 0
}

function init(store) {
  bleManager = new BleManager()
  appStore = store
  dispatch = store.dispatch
  bleStateSubscription = bleManager.onStateChange((state) => {
    console.log('ble state: ' + state)
    dispatch(bleActions.bleOnBtStateChange(state))
    if (state == 'PoweredOn') {
      let savedDevice = appStore.getState().bleDevice.deviceId;
      if (savedDevice ) {
        //wait for reducer get ble state change first
        setTimeout( ()=>{
          deviceConnect(savedDevice);
        }, 500)
      }
    }
  }, true)
}

function deInit() {
  //turn reconnect timeout
  if (reconnectTimer) {
    clearTimeout(reconnectTimer)
    reconnectTimer = null
  }

  //turn off scale notify
  if (weightMeasureMonitor) {
    weightMeasureMonitor.remove()
    weightMeasureMonitor = null
  }

  if (weightControlNotify) {
    weightControlNotify.remove()
    weightControlNotify = null
  }

  bleStateSubscription.remove()
  bleManager.destroy()
  bleManager = null
}

function deviceScanStart() {
  if (appStore.getState().bleStatus.btState != 'PoweredOn' || !bleManager)
    return;
  console.log('start scan')

  dispatch(bleActions.bleStartScan())
  bleManager.startDeviceScan([UUIDS.SERVICE_WEIGHT], {allowDuplicates: false}, (error, device) => {
    if (error) {
      // Handle error (scanning will be stopped automatically)
      console.log('error scan')
      console.log(error);
      dispatch(bleActions.bleStopScan())
      return
    }

    console.log('find device: ' + device.localName)
    dispatch(bleActions.bleFindDevice(device))
  })
}

function deviceScanStop() {
  console.log('stop scan')
  bleManager.stopDeviceScan()
  dispatch(bleActions.bleStopScan())
}

function deviceReConnect() {
  //reconnect device after 20 seconds
  console.log('try reconnect device after 20 seconds')
  let savedDevice = appStore.getState().bleDevice.deviceId;
  let autoConnection = appStore.getState().bleStatus.autoConnection;
  if (savedDevice && autoConnection) {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
    }
    reconnectTimer = setTimeout( ()=>{
      deviceConnect(savedDevice);
    }, 20000)
  } else {
    console.log('cannot reconnect')
  }
}

function deviceConnect(deviceId) {
  if (appStore.getState().bleStatus.btState != 'PoweredOn' || !bleManager)
    return;

  console.log('start connect: ' + deviceId)
  dispatch(bleActions.bleOnConnectionStateChange('connecting', deviceId))
  let deviceInfo = {}
  connectedDevice = {}

  //device.connect()
  bleManager.connectToDevice(deviceId)
    .then((device) => {
      console.log('connected')
      //we get connected
      connectedDevice.id = device.id
      dispatch(bleActions.bleOnConnectionStateChange('connected', device))
      deviceInfo.displayName = device.localName?device.localName:device.name
      console.log('displayName:' + deviceInfo.displayName)
      //register onDisconnected
      let onDisconnected = device.onDisconnected((error,device) => {
        console.log(device.id + ' disconnected')
        dispatch(bleActions.bleOnConnectionStateChange('disconnected', null))
        connectedDevice = null
        onDisconnected.remove()

        //reconnect device after 20 seconds
        deviceReConnect()
      })
      //console.log('discover services and characteristics')
      //discover services and characteristics
      device.discoverAllServicesAndCharacteristics()
        .then((device) => {
          return device.services()
        })
        .then((services) => {
          services.forEach(function(service) {
            //console.log('service: ' + service.uuid);
            if (service.uuid.toUpperCase().indexOf(UUIDS.SERVICE_WEIGHT) != -1) {
              connectedDevice.weightService = { id: service.uuid }
            }else if (service.uuid.toUpperCase().indexOf(UUIDS.SERVICE_DEVICE_INFORMATION) != -1) {
              connectedDevice.deviceInfoService = { id: service.uuid }
            }
          });
          return bleManager.characteristicsForDevice(connectedDevice.id, connectedDevice.deviceInfoService.id)
        })
        .then((characteristics) => {
          characteristics.forEach(function(characteristic) {
            //console.log('char: ' + characteristic.uuid);
            if (characteristic.uuid.toUpperCase().indexOf(UUIDS.CHAR_MANUFACTURER_NAME_UUID) != -1) {
              connectedDevice.deviceInfoService.charManuNameId = characteristic.uuid
            } else if (characteristic.uuid.toUpperCase().indexOf(UUIDS.CHAR_MODEL_NUMBER_UUID) != -1) {
              connectedDevice.deviceInfoService.charModelNumberId = characteristic.uuid
            } else if (characteristic.uuid.toUpperCase().indexOf(UUIDS.CHAR_SERIAL_NUMBER_UUID) != -1) {
              connectedDevice.deviceInfoService.charSerialNumberId = characteristic.uuid
            } else if (characteristic.uuid.toUpperCase().indexOf(UUIDS.CHAR_FIRMWARE_VERSION_UUID) != -1) {
              connectedDevice.deviceInfoService.charFWVersionId = characteristic.uuid
            }
          });
          return bleManager.characteristicsForDevice(connectedDevice.id, connectedDevice.weightService.id)
        })
        .then((characteristics) => {
          characteristics.forEach(function(characteristic) {
            //console.log('char:' + characteristic.uuid);
            if (characteristic.uuid.toUpperCase().indexOf(UUIDS.CHAR_WEIGHT_MEASUREMENT) != -1) {
              connectedDevice.weightService.charWeightMeasurementId = characteristic.uuid;
            } else if (characteristic.uuid.toUpperCase().indexOf(UUIDS.CHAR_WEIGHT_CONTROL_POINT_V2) != -1) {
              connectedDevice.weightService.charWeightScaleControlPointId = characteristic.uuid
            }
          });
          return bleManager.readCharacteristicForDevice(connectedDevice.id, connectedDevice.deviceInfoService.id, connectedDevice.deviceInfoService.charManuNameId)
        })
        .then((characteristic) => {
          let val = new Buffer(characteristic.value, 'base64')
          console.log('manufacturer: ' + val)
          deviceInfo.manufacturerName = val.toString()
          return bleManager.readCharacteristicForDevice(connectedDevice.id, connectedDevice.deviceInfoService.id, connectedDevice.deviceInfoService.charModelNumberId)
        })
        .then((characteristic) => {
          let val = new Buffer(characteristic.value, 'base64')
          console.log('model num: ' + val)
          deviceInfo.modelNum= val.toString()
          return bleManager.readCharacteristicForDevice(connectedDevice.id, connectedDevice.deviceInfoService.id, connectedDevice.deviceInfoService.charSerialNumberId)
        })
        .then((characteristic) => {
          let val = new Buffer(characteristic.value, 'base64')
          console.log('serial num: ' + val)
          deviceInfo.serialNum= val.toString()
          return bleManager.readCharacteristicForDevice(connectedDevice.id, connectedDevice.deviceInfoService.id, connectedDevice.deviceInfoService.charFWVersionId)
        })
        .then((characteristic) => {
          let val = new Buffer(characteristic.value, 'base64')
          console.log('fw version: ' + val)
          deviceInfo.fwVersion= val.toString()
          return bleManager.readCharacteristicForDevice(connectedDevice.id, connectedDevice.weightService.id, connectedDevice.weightService.charWeightScaleControlPointId)
        })
        .then((characteristic) => {
          //read weight control
          console.log('weight control: ')
          let val = new Buffer(characteristic.value, 'base64')
          console.log("zero track: " + val[2]);
          console.log("alarm enable: " + val[3]);
          console.log("weight unit: " + val[4]);
          console.log("alarm time: " + val.readUInt16BE(5));
          console.log("alarm weight: " + val.readUInt16BE(7));
          console.log("battery level: " + val[9]);
          console.log("wifi status: " + val[10]);
          deviceInfo.batteryLevel = val[9]
          deviceInfo.wifiStatus = WIFI_STATUS[val[10]]
          deviceInfo.wifiSSID = val.toString('utf8',11)

          //enable notify
          weightControlNotify = characteristic.monitor((error,characteristic) => {
            if (error && (error.errorCode == BleErrorCode.DeviceDisconnected)) {
              weightControlNotify.remove();
              return;
            }
            if (!characteristic) return;
            let val = new Buffer(characteristic.value, 'base64')
            if (val[0] != 2) return
            if (val[1] == SCALE_CONTROL_NOTIFY.WIFI_STATUS) {
              dispatch(bleActions.bleOnDeviceInfoChange({
                wifiStatus: WIFI_STATUS[val[2]],
              }))
            } else if (val[1] == SCALE_CONTROL_NOTIFY.BATTERY_LEVEL) {
              dispatch(bleActions.bleOnDeviceInfoChange({
                batteryLevel: val[2],
              }))
            }
          })
          return deviceControl(SCALE_CONTROL.ALARM_WEIGHT, appStore.getState().coffeeSettings.waterWeight * 10)
        }).then((characteristic)=>{
          let alarmTime = Number(appStore.getState().coffeeSettings.timeMintue) * 60 + Number(appStore.getState().coffeeSettings.timeSecond)
          return deviceControl(SCALE_CONTROL.ALARM_TIME, alarmTime)
        }).then((characteristic)=>{
          //TODO use device setting
          return deviceControl(SCALE_CONTROL.ALARM_ENABLE, false)
        }).then((characteristic)=>{
          dispatch(bleActions.bleOnDeviceInfoChange(deviceInfo))
          dispatch(bleActions.bleDeviceSave(connectedDevice.id))
          dispatch(bleActions.bleDeviceReady())
        })
        .catch((error) => {
           // Handle errors
          console.log('error')
          console.log(error);
        })
    })
    .catch((error) => {
       // Handle errors
      console.log('connect device error')
      console.log(error);
      if (error.errorCode == BleErrorCode.DeviceDisconnected) {
        deviceReConnect()
      }
      dispatch(bleActions.bleOnConnectionStateChange('disconnected', null))
      connectedDevice = null
    });
}

function deviceDisconnect(device) {
  console.log('device cancelConnection')
  device.cancelConnection()
}

function strToBuffer(opt, str) {
  let utf8Str = util.toUTF8Array(str)
  let str_len = utf8Str.length;
  let buffer = Buffer.alloc(2 + 1 + str_len); //2 for opt, 1 for len
  var offset = 0;
  buffer.writeInt8(opt,offset++)
  buffer.writeInt8(str_len,offset++)
  for (var i = 0; i < str_len; i++) {
    buffer.writeUInt8(utf8Str[i], offset++)
  }
  return buffer;
}

/**
 * Send command to device, always suppose device is connected
 * @param {number} opt operation code
 */
function deviceControl(opt) {
  console.log("deviceControl: " + opt +' '+arguments[1]);

  if (appStore.getState().bleStatus.connectionState != 'connected') return

  let buffer = null
  let offset = 0;
  switch (opt) {
    case SCALE_CONTROL.SET_ZERO:
    case SCALE_CONTROL.START_TIMER:
    case SCALE_CONTROL.PAUSE_TIMER:
    case SCALE_CONTROL.RESET_TIMER:
    case SCALE_CONTROL.WIFI_CONNECT:
      buffer = Buffer.alloc(1)
      buffer.writeInt8(opt,0)
      break;
    case SCALE_CONTROL.ZERO_TRACE:
    case SCALE_CONTROL.KEY_SOUND:
    case SCALE_CONTROL.KEY_VIBRATE:
    case SCALE_CONTROL.ALARM_ENABLE:
    case SCALE_CONTROL.WEIGHT_UNIT:
      buffer = Buffer.alloc(2)
      buffer.writeInt8(opt,0)
      buffer.writeInt8(arguments[1],1)
      break;
    case SCALE_CONTROL.ALARM_TIME:
    case SCALE_CONTROL.ALARM_WEIGHT:
      buffer = Buffer.alloc(3)
      buffer.writeInt8(opt,0)
      buffer.writeUInt16BE(arguments[1],1)
      break;
    case SCALE_CONTROL.WIFI:
      let utf8Name = util.toUTF8Array(arguments[1])
      let utf8Pass = util.toUTF8Array(arguments[2])
      let name_len = utf8Name.length;
      let pass_len = utf8Pass.length;
      buffer = Buffer.alloc(2 + 2 + name_len + pass_len) //2 for opt, 2 for len
      buffer.writeInt8(opt,offset++)
      buffer.writeInt8(name_len,offset++)
      for (var i = 0; i < name_len; i++) {
        buffer.writeUInt8(utf8Name[i], offset++)
      }
      buffer.writeInt8(pass_len,offset++)
      for (var i = 0; i < pass_len; i++) {
        buffer.writeUInt8(utf8Pass[i], offset++)
      }
      break;
    case SCALE_CONTROL.FW_UPGRADE:
      // var downloadLink = "https://bm.timemore.com/api/v1/ota/1/download";
      var host = util.toUTF8Array(urlParser('hostname', arguments[1]));
      var port = 80;
      var path = util.toUTF8Array(urlParser('path', arguments[1]));
      var host_len = host.length;
      var path_len = path.length;
      buffer = Buffer.alloc(2 + 2 + 1 + host_len + path_len); //2 for opt, 2 for len,1 for port
      buffer.writeInt8(opt,offset++)
      buffer.writeInt8(host_len,offset++)
      for (var i = 0; i < host_len; i++) {
        buffer.writeUInt8(host[i], offset++)
      }
      buffer.writeInt8(path_len,offset++)
      for (var i = 0; i < path_len; i++) {
        buffer.writeUInt8(path[i], offset++)
      }
      break;
    case SCALE_CONTROL.FW_UPGRADE_V2:
      buffer = Buffer.alloc(3)
      buffer.writeInt8(opt,0)
      buffer.writeInt8(0,1)               //env: 0 for production, 1 for staging
      buffer.writeInt8(arguments[1],2)    //firmware id
      break;
    case SCALE_CONTROL.WIFI_SSID:
      buffer = strToBuffer(opt,arguments[1])
      break;
    case SCALE_CONTROL.WIFI_PASS:
      buffer = strToBuffer(opt,arguments[1])
      break;
    case SCALE_CONTROL.DEVICE_NAME:
      buffer = strToBuffer(opt,arguments[1])
      break;
    default:
      console.error("unknow opt " + opt);
      return;
  }
  let value = new Buffer.from(buffer.buffer)
  return bleManager.writeCharacteristicWithResponseForDevice(
    connectedDevice.id,
    connectedDevice.weightService.id,
    connectedDevice.weightService.charWeightScaleControlPointId,
    value.toString('base64')
  )
}

function weightNotify( error, characteristic ) {
  if (error && (error.errorCode == BleErrorCode.DeviceDisconnected)) {
    if (weightMeasureMonitor) {
      weightMeasureMonitor.remove()
      weightMeasureMonitor = null
    }
    return;
  }
  if (!characteristic) return;
  let val = new Buffer(characteristic.value, 'base64')
  //console.log('flag: ' + val[0])
  //console.log("total: " + val.readInt32LE(1));
  //console.log("extract: " + val.readInt32LE(5));
  let flag = val[0]
  let total = val.readInt32LE(1)/10
  if (total > 3000) total = 3000
  let extract = null
  if (flag & 0x10) {
    extract = val.readInt32LE(5)/10
    if (extract > 2000) extract = 2000
  }
  weightMeasurement = {
    extract: extract,
    total: total
  }
}

/**
 * Enable scale's weight notify
 * @param {boolean} enable enable or disable notify
 */
function enableWeightNotify(enable) {
  if (enable) {

    if (!appStore.getState().bleStatus.deviceReady) return

    //turn on scale notify
    if (!weightMeasureMonitor) {
      weightMeasureMonitor = bleManager.monitorCharacteristicForDevice(
        connectedDevice.id,
        connectedDevice.weightService.id,
        connectedDevice.weightService.charWeightMeasurementId,
        weightNotify
      )
    }

    //turn on notify interval
    if (!weightNotifyInterval) {
      weightNotifyInterval = setInterval( ()=> {
        dispatch(bleActions.bleOnWeightChange(weightMeasurement))
      }, 100)
    }
  } else {
    //turn off scale notify
    if (weightMeasureMonitor) {
      weightMeasureMonitor.remove()
      weightMeasureMonitor = null
    }

    //turn off notify interval
    if (weightNotifyInterval) {
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
  return weightMeasurement
}

/**
 * Set scale alarm enble or disable
 * @param {boolean} enable enable or disable alarm
 * @returns {object} return nothing or Promise<Characteristic>
 */
function setAlarmEnable(enable) {
  if (!appStore.getState().bleStatus.deviceReady) return

  return deviceControl(SCALE_CONTROL.ALARM_ENABLE, enable)
}

/**
 * Set scale alarm weight, exceed this weight, scale will alarm
 * @param {number} weight weight in coffeesetting
 * @returns {object} return nothing or Promise<Characteristic>
 */
function setAlarmWeight(weight) {
  if (!appStore.getState().bleStatus.deviceReady) return

  return deviceControl(SCALE_CONTROL.ALARM_WEIGHT, weight * 10)
}

/**
 * Set scale alarm time, exceed this time, scale will alarm
 * @param {number} time time in coffeesetting
 * @returns {object} return nothing or Promise<Characteristic>
 */
function setAlarmTime(time) {
  if (!appStore.getState().bleStatus.deviceReady) return

  return deviceControl(SCALE_CONTROL.ALARM_TIME, time)
}

/**
 * Set scale key sound enble or disable
 * @param {boolean} enable enable or disable key sound
 * @returns {object} return nothing or Promise<Characteristic>
 */
function setKeySound(enable) {
  if (!appStore.getState().bleStatus.deviceReady) return

  return deviceControl(SCALE_CONTROL.KEY_SOUND, enable)
}

/**
 * Set scale key vibrate enble or disable
 * @param {boolean} enable enable or disable key vibrate
 * @returns {object} return nothing or Promise<Characteristic>
 */
function setKeyVibrate(enable) {
  if (!appStore.getState().bleStatus.deviceReady) return

  return deviceControl(SCALE_CONTROL.KEY_VIBRATE, enable)
}

/**
 * Set scale device name, max length to 20 characters, state will update
 * @param {string} name
 * @returns {object} return nothing or Promise<Characteristic>
 */
function setName(name) {
  if (!appStore.getState().bleStatus.deviceReady) return
  if (!name.length || name.length > 20) return

  dispatch(bleActions.bleOnDeviceInfoChange({
    displayName: name,
  }))

  return deviceControl(SCALE_CONTROL.DEVICE_NAME, name)
}

/**
 * Set scale wifi ssid, pass, max length to 20 characters, state will update
 * @param {string} ssid Wifi SSID
 * @param {string} pass Wifi Pass
 * @returns {object} return nothing or Promise<Characteristic>
 */
function setWifi(ssid, pass) {
  if (!appStore.getState().bleStatus.deviceReady) return
  if (!ssid.length || ssid.length > 20 || !pass.length || pass.length > 20) return

  return deviceControl(SCALE_CONTROL.WIFI_SSID, ssid)
          .then((characteristics) => {
            return deviceControl(SCALE_CONTROL.WIFI_PASS, pass)
          })
          .then((characteristics) => {
            return deviceControl(SCALE_CONTROL.WIFI_CONNECT)
          })
}

/**
 * Set zero on scale
 * @returns {object} return nothing or Promise<Characteristic>
 */
function setZero() {
  if (!appStore.getState().bleStatus.deviceReady) return

  return deviceControl(SCALE_CONTROL.SET_ZERO)
}

/**
 * Start timer on scale
 * @returns {object} return nothing or Promise<Characteristic>
 */
function timerStart() {
  if (!appStore.getState().bleStatus.deviceReady) return

  return deviceControl(SCALE_CONTROL.START_TIMER)
}

/**
 * Pause timer on scale
 * @returns {object} return nothing or Promise<Characteristic>
 */
function timerPause() {
  if (!appStore.getState().bleStatus.deviceReady) return

  return deviceControl(SCALE_CONTROL.PAUSE_TIMER)
}

/**
 * Reset timer on scale
 * @returns {object} return nothing or Promise<Characteristic>
 */
function timerReset() {
  if (!appStore.getState().bleStatus.deviceReady) return

  return deviceControl(SCALE_CONTROL.RESET_TIMER)
}

module.exports = {
  init: init,
  deInit: deInit,
  deviceReConnect:deviceReConnect,
  deviceConnect: deviceConnect,
  deviceDisconnect: deviceDisconnect,
  deviceScanStart: deviceScanStart,
  deviceScanStop: deviceScanStop,
  enableWeightNotify: enableWeightNotify,
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

