/*
 * ble service
 */

import { BleManager } from 'react-native-ble-plx';
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
  bleManager = new BleManager()
  dispatch = store.dispatch
  const subscription = bleManager.onStateChange((state) => {
    console.log('ble state: ' + state)
    dispatch(bleActions.bleOnBtStateChange(state))
  }, true)
}

function deInit() {
  bleManager.destroy()
}

function deviceScanStart() {
  console.log('start scan')
  dispatch(bleActions.bleStartScan())
  bleManager.startDeviceScan([UUIDS.SERVICE_WEIGHT], null, (error, device) => {
    if (error) {
      // Handle error (scanning will be stopped automatically)
      console.log('error scan')
      console.log(error);
      dispatch(bleActions.bleStopScan())
      return
    }

    console.log('find device: '+device.localName)
    dispatch(bleActions.bleFindDevice(device))
  })
}

function deviceScanStop() {
  console.log('stop scan')
  bleManager.stopDeviceScan()
  dispatch(bleActions.bleStopScan())
}

function deviceAfterConnect() {

}

function deviceConnect(device) {
  console.log('start connect: ' + device.id)
  dispatch(bleActions.bleOnConnectionStateChange('connecting', device))
  let deviceInfo = {}
  device.connect()
    .then((device) => {
      console.log('connected')
      //we get connected
      connectedDevice.id = device.id
      dispatch(bleActions.bleOnConnectionStateChange('connected', device))
      dispatch(bleActions.bleOnDeviceInfoChange({ name: device.localName?device.localName:device.name }))
      //register onDisconnected
      let onDisconnected = device.onDisconnected((error,device) => {
        console.log(device.id + ' disconnected')
        dispatch(bleActions.bleOnConnectionStateChange('disconnected', null))
        onDisconnected.remove()
      })
      console.log('discover services and characteristics')
      //discover services and characteristics
      device.discoverAllServicesAndCharacteristics()
        .then((device) => {
          return device.services()
        })
        .then((services) => {
          services.forEach(function(service) {
            console.log(service.uuid);
            if (service.uuid.toUpperCase().indexOf(UUIDS.SERVICE_WEIGHT) != -1) {
              connectedDevice.weightService.id = service.uuid
            }else if (service.uuid.toUpperCase().indexOf(UUIDS.SERVICE_DEVICE_INFORMATION) != -1) {
              connectedDevice.deviceInfoService.id = service.uuid
            }
          });
          return bleManager.characteristicsForDevice(connectedDevice.id, connectedDevice.deviceInfoService.id)
        })
        .then((characteristics) => {
          characteristics.forEach(function(characteristic) {
            console.log(characteristic.uuid);
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
            console.log(characteristic.uuid);
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
          dispatch(bleActions.bleOnDeviceInfoChange(deviceInfo))

          //enable notify
          let weightControlNotify = characteristic.monitor((error,characteristic) => {
            console.log('weight control notify:')
            if (error && (error.errorCode == 201)) {
              weightControlNotify.remove();
              return;
            }
            let val = new Buffer(characteristic.value, 'base64')
            console.log(val[0])
            if (val[0] != 2) return
            console.log(val[1])
            console.log(val[2])
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
          return deviceControl(SCALE_CONTROL.ALARM_WEIGHT, 10000)
        }).then((characteristic)=>{
          return deviceControl(SCALE_CONTROL.ALARM_TIME, 150)
        }).then((characteristic)=>{
          return deviceControl(SCALE_CONTROL.ALARM_ENABLE, true)
        }).then((characteristic)=>{
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
      console.log('error')
      console.log(error);
      dispatch(bleActions.bleOnConnectionStateChange('disconnected', null))
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

function deviceControl(opt) {
  console.log("deviceControl: " + opt +' '+arguments[1]);
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

module.exports = {
  init: init,
  deInit: deInit,
  deviceConnect: deviceConnect,
  deviceDisconnect: deviceDisconnect,
  deviceScanStart: deviceScanStart,
  deviceScanStop: deviceScanStop,
  deviceControl: deviceControl
}

