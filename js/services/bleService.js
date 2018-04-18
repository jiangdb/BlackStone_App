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
      /*
      var utf8Name = util.toUTF8Array(arguments[1])
      var utf8Pass = util.toUTF8Array(arguments[2])
      var name_len = utf8Name.length;
      var pass_len = utf8Pass.length;
      var buffer = new ArrayBuffer(2 + 2 + name_len + pass_len); //2 for opt, 2 for len
      var u8TypeArr = new Uint8Array(buffer);
      var index = 0;
      u8TypeArr[index++] = opt;
      u8TypeArr[index++] = name_len;
      for (var i = 0; i < name_len; i++) {
        u8TypeArr[index++] = utf8Name[i];
      }
      u8TypeArr[index++] = pass_len;
      for (var i = 0; i < pass_len; i++) {
        u8TypeArr[index++] = utf8Pass[i];
      }
      device.wifi.ssid = arguments[1];
      */
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
      /*
      var buffer = new ArrayBuffer(2 + 2 + 1 + host_len + path_len); //2 for opt, 2 for len,1 for port
      var u8TypeArr = new Uint8Array(buffer);
      var index = 0;
      u8TypeArr[index++] = opt;
      u8TypeArr[index++] = host_len;
      for (var i = 0; i < host_len; i++) {
        u8TypeArr[index++] = host[i];
      }
      u8TypeArr[index++] = port;
      u8TypeArr[index++] = path_len;
      for (var i = 0; i < path_len; i++) {
        u8TypeArr[index++] = path[i];
      }
      */
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


/*
 * var urlParser = require('url-parser.js')
var util = require('util.js')
var webService = require('web-service.js')
var app = null

var STATUS = {
  NOTAVAILABLE: 0,
  AVAILABLE: 1,
  DISCOVERING: 2,
  CONNECTING: 3,
  CONNECTED: 4,
  READY: 5,
};

var WIFI_STATUS = {
  UNSTART: 0,
  STARTING: 1,
  CONNECTING: 2,
  CONNECTED: 3,
  DISCONNCTING: 4,
  DISCONNCTED: 5,
};

var UUIDS = {
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
};

var SCALE_CONTROL = {
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

var SCALE_CONTROL_NOTIFY = {
  WIFI_STATUS: 0,
  BATTERY_LEVEL: 1,
};

var adapterOpened = false;
var status = STATUS.NOTAVAILABLE;
var device = {
  id: null,
  name: null,
  twoChannel: true,
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
  manufacturerName: '',
  modelNum: '',
  serialNum: '',
  fwVersion: '',
  wifi:{
    ssid:'',
    status:'',
  }
};
var optQueue = [];
var optQueueStarted = false;

function getCurrentPage()
{
  var pages = getCurrentPages();
  if (pages.length > 0) {
    return pages[pages.length - 1];
  }
  return null;
}

function resetDeviceInfo() {
  var deviceId = device.id;
  device = {
    id: deviceId,
    name: null,
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
    manufacturerName: '',
    modelNum: '',
    serialNum: '',
    fwVersion: '',
    wifi: {
      ssid: '',
      status: '',
    }
  };
}

function onBluetoothAdapterStateChange(res) {
  // console.log("onBluetoothAdapterStateChange", res)
  if (!adapterOpened) return;   //some time we get this callback even we have called close adapter
  if (res.available) {
    if (status == STATUS.NOTAVAILABLE) {
      status = STATUS.AVAILABLE;
    }
  } else {
    status = STATUS.NOTAVAILABLE;
  }
  var currPage = getCurrentPage();
  if (currPage && currPage.hasOwnProperty('onBtAdpaterStateChanged')) {
    currPage.onBtAdpaterStateChanged(res);
  }
};

function onBluetoothDeviceFound(res) {
  var currPage = getCurrentPage();
  if (currPage && currPage.hasOwnProperty('onBluetoothDeviceFound')) {
    currPage.onBluetoothDeviceFound(res);
  }
};

function onBLEConnectionStateChange(res) {
  // console.log('onBLEConnectionStateChange ', res)
  if (res.connected) {
    status = STATUS.CONNECTED;
  } else {
    resetDeviceInfo();
    if (status == STATUS.NOTAVAILABLE) return;
    status = STATUS.AVAILABLE;
    if (device.id != null) {
      setTimeout(function () {
        if (status == STATUS.AVAILABLE) {
          createBLEConnection(device.id);
        }
      }, 10000);
    }
  }
  var currPage = getCurrentPage();
  if (currPage && currPage.hasOwnProperty('onDeviceStateChanged')) {
    currPage.onDeviceStateChanged(res);
  }
};

function deviceOnline() {
  if (device.modelNum.length > 0 && device.serialNum.length>0 && device.fwVersion.length>0) {
    webService.deviceOnline({
      model: device.modelNum,
      serial: device.serialNum,
      version: device.fwVersion,
    });
  }
}

function onBLECharacteristicValueChange(res) {
  // console.log(`characteristic ${res.characteristicId} has changed`)
  var val = new Uint8Array(res.value);
  if (res.characteristicId.indexOf(UUIDS.CHAR_WEIGHT_MEASUREMENT) != -1) {
    var val = new DataView(res.value);
    var flag = val.getUint8(0);
    // console.log('flag: ' + flag);
    var upper = '';
    var total = val.getInt32(1, true);
    total = (Math.round(total)/10).toFixed(1);
    if (total > 3000) total = 'FFFF';
    else if (total > 1000) total = Math.floor(total);
    var twoChannel = false;
    if (flag & 0x10) {
      twoChannel = true;
      upper = val.getInt32(5, true);
      upper = (Math.round(upper)/10).toFixed(1);
      if (upper > 2000) upper = 'FFFF';
      else if (upper > 1000) upper = Math.floor(upper);
    }
    if (twoChannel != device.twoChannel) {
      device.twoChannel = twoChannel;
      var currPage = getCurrentPage();
      if (currPage && currPage.hasOwnProperty('onChannelChanged')) {
        currPage.onChannelChanged(twoChannel);
      }
    }  
    app.globalData.weight.extract = upper.toString();
    app.globalData.weight.water = total.toString();
  } else if (res.characteristicId.indexOf(UUIDS.CHAR_MANUFACTURER_NAME_UUID) != -1) {
    // console.log("name: " + String.fromCharCode.apply(String, val));
    device.manufacturerName = String.fromCharCode.apply(String, val);
    flushOpt();
  } else if (res.characteristicId.indexOf(UUIDS.CHAR_MODEL_NUMBER_UUID) != -1) {
    // console.log("model: " + String.fromCharCode.apply(String, val));
    device.modelNum = String.fromCharCode.apply(String, val);
    deviceOnline();
    flushOpt();
  } else if (res.characteristicId.indexOf(UUIDS.CHAR_SERIAL_NUMBER_UUID) != -1) {
    // console.log("serial: " + String.fromCharCode.apply(String, val));
    device.serialNum = String.fromCharCode.apply(String, val);
    deviceOnline();
    flushOpt();
  } else if (res.characteristicId.indexOf(UUIDS.CHAR_FIRMWARE_VERSION_UUID) != -1) {
    // console.log("firmware: " + String.fromCharCode.apply(String, val));
    device.fwVersion = String.fromCharCode.apply(String, val);
    deviceOnline();
    flushOpt();
  } else if (res.characteristicId.indexOf(UUIDS.CHAR_WEIGHT_SCALE_FEATURE) != -1) {
    // console.log("Weight Scale Feature: " + val[0].toString(16));
    flushOpt();
  } else if ((res.characteristicId.indexOf(UUIDS.CHAR_WEIGHT_CONTROL_POINT_V2) != -1)
    ||(res.characteristicId.indexOf(UUIDS.CHAR_WEIGHT_CONTROL_POINT) != -1)) {
    if (val[0] == 0) {
      //read operation
      var dv = new DataView(res.value, 2);
      // console.log("zero track: " + dv.getUint8(0));
      // console.log("alarm enable: " + dv.getUint8(1));
      // console.log("weight unit: " + dv.getUint8(2));
      // console.log("alarm time: " + dv.getUint16(3, false));
      // console.log("alarm weight: " + dv.getUint16(5, false));
      // console.log("battery level: " + dv.getUint8(7));
      // console.log("wifi status: " + dv.getUint8(8));
      device.wifi.status = dv.getUint8(8);
      if (dv.getUint8(9) > 0) {
        var nameBuf = [];
        for (var i = 0; i < dv.getUint8(9); i++) {
          nameBuf[i] = dv.getUint8(10 + i);
        }
        device.wifi.ssid = util.fromUTF8Array(nameBuf);
        // console.log("wifi ssid: " + device.wifi.ssid);
      }
      flushOpt();
    } else if (val[0] == 1) {
      //write operation
      if (val.length>2) {
        // console.log("write scale " + val[2] + ': ' + (val[1] == 0 ? 'success' : 'fail'));
      }else{
        // console.log("write scale: " + (val[1] == 0 ? 'success' : 'fail'));
      }
      // flushOpt();
    } else if (val[0] == 2) {
      //notify operation
      if (val[1] == SCALE_CONTROL_NOTIFY.WIFI_STATUS) {
        // console.log("wifi status change to " + val[2]);
        device.wifi.status = val[2];
        var currPage = getCurrentPage();
        if (currPage && currPage.hasOwnProperty('onDeviceWifiStateChanged')) {
          currPage.onDeviceWifiStateChanged(val[2]);
        }
      } else if (val[1] == SCALE_CONTROL_NOTIFY.BATTERY_LEVEL) {
        // console.log("battery level" + val[2]);
      }
    }
  } else {
    console.error("unknow char: " + res.characteristicId);
  }
};

function openBluetoothAdapter () {
  if (adapterOpened) return;
  // console.log('openBluetoothAdapter')
  adapterOpened = true;   //no matter fail or success, adapter is opened
  wx.openBluetoothAdapter({
    success: function (res) {
      // success
      // console.log("-----openBluetoothAdapter success----------");
      if (status == STATUS.NOTAVAILABLE) {
        status = STATUS.AVAILABLE;
      }
      if (device.id && status == STATUS.AVAILABLE) {
        createBLEConnection(device.id);
      }

      var currPage = getCurrentPage();
      if (currPage && currPage.hasOwnProperty('onBtAdpaterStateChanged')) {
        currPage.onBtAdpaterStateChanged({ available: true, discovering: false});
      }
    },
    fail: function (res) {
      // fail
      // console.log("-----openBluetoothAdapter fail----------");
      // console.log(res);
      status = STATUS.NOTAVAILABLE;
    }
  })
}

function closeBluetoothAdapter(obj) {
  if (!adapterOpened) {
    if (obj !== null && typeof obj === 'object' && obj.hasOwnProperty('success')) {
      obj.success();
    }
    return;
  }

  // console.log('closeBluetoothAdapter')
  wx.closeBluetoothAdapter({
    success: function (res) {
      // success
      // console.log("-----closeBluetoothAdapter success----------");
      adapterOpened = false;
      status = STATUS.NOTAVAILABLE;
      if (obj !== null && typeof obj === 'object' && obj.hasOwnProperty('success')) {
        obj.success();
      }
    },
    fail: function (res) {
      // fail
      // console.log("-----closeBluetoothAdapter fail----------");
    }
  })
}

function saveDeviceId(deviceId) {
  if (deviceId != device.id) {
    device.id = deviceId;
    wx.setStorageSync('BtService_deviceId', deviceId);
  }
};

function createBLEConnection(deviceId) {
  if (status == STATUS.CONNECTING) return;
  if(deviceId == 0) {
    deviceId = device.id;
  }
  if (deviceId == null) return;
  status = STATUS.CONNECTING;
  wx.createBLEConnection({
    deviceId: deviceId,
    success: function (res) {
      status = STATUS.CONNECTED;
      saveDeviceId(deviceId);
      // console.log("---------> getBLEDeviceServices" + deviceId);
      wx.getBLEDeviceServices({
        deviceId: deviceId,
        success: function (res) {
          for (var i = 0; i < res.services.length; i++) {
            if (res.services[i].uuid.indexOf(UUIDS.SERVICE_WEIGHT) != -1) {
              device.weightService.id = res.services[i].uuid;
            }else if (res.services[i].uuid.indexOf(UUIDS.SERVICE_DEVICE_INFORMATION) != -1) {
              device.deviceInfoService.id = res.services[i].uuid;
            }
          }
          //try to get device name first
          wx.getConnectedBluetoothDevices({
            services: [device.weightService.id],
            success: function (res) {
              device.name = res.devices[0].name;
            }
          })
          readDeviceInfoService();
          readWeightService();
        }
      });
    },
    fail: function (res) {
      // fail
      // console.log("---------> fail");
      // console.log(res);
      status = STATUS.AVAILABLE;
      var currPage = getCurrentPage();
      if (currPage && currPage.hasOwnProperty('onCreateBLEConnectionFail')) {
        currPage.onCreateBLEConnectionFail(res);
      }
    }
  });
};

function closeBLEConnection() {
  if (device.id == null) return 
  wx.closeBLEConnection({
    deviceId: device.id,
    success: function (res) {
      // console.log("---------> success", res);
    }
  })
};

function readWeightService() {
  if(device.weightService.id == null) return;
  // console.log("---------> readWeightScaleService");
  wx.getBLEDeviceCharacteristics({
    deviceId: device.id,
    serviceId: device.weightService.id,
    success: function (res) {
      for (var i = 0; i < res.characteristics.length; i++) {
        if (res.characteristics[i].uuid.indexOf(UUIDS.CHAR_WEIGHT_MEASUREMENT) != -1) {
          device.weightService.charWeightMeasurementId = res.characteristics[i].uuid;
        } else if (res.characteristics[i].uuid.indexOf(UUIDS.CHAR_WEIGHT_SCALE_FEATURE) != -1) {
          device.weightService.charWeightScaleFeatureId = res.characteristics[i].uuid;
          queueOpt({ opt: 'read', serviceId: device.weightService.id, charId: res.characteristics[i].uuid });
        } else if ((res.characteristics[i].uuid.indexOf(UUIDS.CHAR_WEIGHT_CONTROL_POINT_V2) != -1) 
          || (res.characteristics[i].uuid.indexOf(UUIDS.CHAR_WEIGHT_CONTROL_POINT) != -1)) {
          device.weightService.charWeightScaleControlPointId = res.characteristics[i].uuid;
          queueOpt({ opt: 'notify', serviceId: device.weightService.id, charId: res.characteristics[i].uuid });
          writeDeviceSetting();
          queueOpt({ opt: 'read', serviceId: device.weightService.id, charId: res.characteristics[i].uuid });
        }
      }
      status = STATUS.READY;
      var currPage = getCurrentPage();
      if (currPage && currPage.hasOwnProperty('onDeviceReady')) {
        currPage.onDeviceReady();
      }
    },
    fail: function (res) {
      // console.log("---------> fail");
      // console.log(res);
    }
  });
}

function readDeviceInfoService() {
  if (device.deviceInfoService.id == null) return;
  // console.log("---------> readDeviceInfoService");
  wx.getBLEDeviceCharacteristics({
    deviceId: device.id,
    serviceId: device.deviceInfoService.id,
    success: function (res) {
      // console.log("---------> success");
      // console.log(res);
      for (var i = 0; i < res.characteristics.length; i++) {
        if (res.characteristics[i].uuid.indexOf(UUIDS.CHAR_MANUFACTURER_NAME_UUID) != -1) {
          device.deviceInfoService.charManuNameId = res.characteristics[i].uuid;
          queueOpt({ opt: 'read', serviceId: device.deviceInfoService.id, charId: res.characteristics[i].uuid });
        } else if (res.characteristics[i].uuid.indexOf(UUIDS.CHAR_MODEL_NUMBER_UUID) != -1) {
          device.deviceInfoService.charModelNumberId = res.characteristics[i].uuid;
          queueOpt({ opt: 'read', serviceId: device.deviceInfoService.id, charId: res.characteristics[i].uuid });
        } else if (res.characteristics[i].uuid.indexOf(UUIDS.CHAR_SERIAL_NUMBER_UUID) != -1) {
          device.deviceInfoService.charSerialNumberId = res.characteristics[i].uuid;
          queueOpt({ opt: 'read', serviceId: device.deviceInfoService.id, charId: res.characteristics[i].uuid });
        } else if (res.characteristics[i].uuid.indexOf(UUIDS.CHAR_FIRMWARE_VERSION_UUID) != -1) {
          device.deviceInfoService.charFWVersionId = res.characteristics[i].uuid;
          queueOpt({ opt: 'read', serviceId: device.deviceInfoService.id, charId: res.characteristics[i].uuid });
        }
      }
    },
    fail: function (res) {
      // console.log("---------> fail");
      // console.log(res);
    }
  });
}


 * Why we use read/write queue, becaue android can't read/write them at same time.
 * obj:{
 *  opt: 'read'/'write'/'notify'
 *  serviceId: service id (read only)
 *  charId: characteristic id (read only)
 *  controlId: control id (write only)
 *  value: write value(write only)
 *  notify: ture/false (enable/disable weight notify)
 * }
function optExec(obj) {
  if (obj.opt == 'read') {
    readBLECharacteristicValue(obj.serviceId, obj.charId);
  } else if (obj.opt == 'write') {
    writeScaleControl(obj.controlId, obj.value);
  } else if (obj.opt == 'notify') {
    if (obj.hasOwnProperty('serviceId')) {
      notifyBLECharacteristicValueChanged(obj.serviceId, obj.charId);
    } else {
      enableWeightNotify(obj.notify);
    }
  }
}

function queueOpt(obj) {
  if (app.globalData.systemInfo.platform == 'ios') {
    optExec(obj)
  } else {
    optQueue.push(obj);
    if (!optQueueStarted) {
      flushOpt();
    }
  }
}

function flushOpt() {
  if (app.globalData.systemInfo.platform != 'ios') {
    if (optQueue.length > 0) {
      optQueueStarted = true;
      var obj = optQueue.shift();
      optExec(obj);
    } else {
      optQueueStarted = false;
    }
  }
}

function readBLECharacteristicValue(serviceId, charId) {
  // console.log("---------> readBLECharacteristicValue: for " + charId);
  wx.readBLECharacteristicValue({
    deviceId: device.id,
    serviceId: serviceId,
    characteristicId: charId,
    success: function (res) {
      // success
      // console.log("--------->success");
      // console.log(res);
    },
    fail:function(res) {
      // console.log("--------->fail");
      // console.log(res);
      flushOpt();
    }
  })
}

function strToBuffer(opt, str) {
  var utf8Str = util.toUTF8Array(str)
  var str_len = utf8Str.length;
  var buffer = new ArrayBuffer(2 + 1 + str_len); //2 for opt, 1 for len
  var u8TypeArr = new Uint8Array(buffer);
  var index = 0;
  u8TypeArr[index++] = opt;
  u8TypeArr[index++] = str_len;
  for (var i = 0; i < str_len; i++) {
    u8TypeArr[index++] = utf8Str[i];
  }
  return buffer;
}

function writeScaleControl(opt) {
  if (status < STATUS.CONNECTED) {
    flushOpt();
    return;
  }

  // console.log("---------> writeScaleControl: " + opt +' '+arguments[1]);
  switch (opt) {
    case SCALE_CONTROL.SET_ZERO:
    case SCALE_CONTROL.START_TIMER:
    case SCALE_CONTROL.PAUSE_TIMER:
    case SCALE_CONTROL.RESET_TIMER:
    case SCALE_CONTROL.WIFI_CONNECT:
      var buffer = new ArrayBuffer(1)
      var val = new Uint8Array(buffer);
      val[0] = opt;
      break;
    case SCALE_CONTROL.ZERO_TRACE:
    case SCALE_CONTROL.KEY_SOUND:
    case SCALE_CONTROL.KEY_VIBRATE:
    case SCALE_CONTROL.ALARM_ENABLE:
    case SCALE_CONTROL.WEIGHT_UNIT:
      var buffer = new ArrayBuffer(2)
      var val = new Uint8Array(buffer);
      val[0] = opt;
      val[1] = arguments[1]
      break;
    case SCALE_CONTROL.ALARM_TIME:
    case SCALE_CONTROL.ALARM_WEIGHT:
      var buffer = new ArrayBuffer(3)
      var dv = new DataView(buffer);
      dv.setUint8(0, opt);
      dv.setUint16(1, arguments[1]);
      break;
    case SCALE_CONTROL.WIFI:
      var utf8Name = util.toUTF8Array(arguments[1])
      var utf8Pass = util.toUTF8Array(arguments[2])
      var name_len = utf8Name.length;
      var pass_len = utf8Pass.length;
      var buffer = new ArrayBuffer(2 + 2 + name_len + pass_len); //2 for opt, 2 for len
      var u8TypeArr = new Uint8Array(buffer);
      var index = 0;
      u8TypeArr[index++] = opt;
      u8TypeArr[index++] = name_len;
      for (var i = 0; i < name_len; i++) {
        u8TypeArr[index++] = utf8Name[i];
      }
      u8TypeArr[index++] = pass_len;
      for (var i = 0; i < pass_len; i++) {
        u8TypeArr[index++] = utf8Pass[i];
      }
      device.wifi.ssid = arguments[1];
      break;
    case SCALE_CONTROL.FW_UPGRADE:
      // var downloadLink = "https://bm.timemore.com/api/v1/ota/1/download";
      var host = util.toUTF8Array(urlParser('hostname', arguments[1]));
      var port = 80;
      var path = util.toUTF8Array(urlParser('path', arguments[1]));
      var host_len = host.length;
      var path_len = path.length;
      var buffer = new ArrayBuffer(2 + 2 + 1 + host_len + path_len); //2 for opt, 2 for len,1 for port
      var u8TypeArr = new Uint8Array(buffer);
      var index = 0;
      u8TypeArr[index++] = opt;
      u8TypeArr[index++] = host_len;
      for (var i = 0; i < host_len; i++) {
        u8TypeArr[index++] = host[i];
      }
      u8TypeArr[index++] = port;
      u8TypeArr[index++] = path_len;
      for (var i = 0; i < path_len; i++) {
        u8TypeArr[index++] = path[i];
      }
      break;
    case SCALE_CONTROL.FW_UPGRADE_V2:
      var buffer = new ArrayBuffer(3)
      var val = new Uint8Array(buffer);
      val[0] = opt;
      val[1] = 0;   //env: 0 for production, 1 for staging
      val[2] = arguments[1];    //firmware id
      break;
    case SCALE_CONTROL.WIFI_SSID:
      var buffer = strToBuffer(opt,arguments[1]);
      device.wifi.ssid = arguments[1];
      break;
    case SCALE_CONTROL.WIFI_PASS:
      var buffer = strToBuffer(opt,arguments[1]);
      break;
    case SCALE_CONTROL.DEVICE_NAME:
      var buffer = strToBuffer(opt,arguments[1]);
      device.name = arguments[1];
      break;
    default:
      console.error("unknow opt " + opt);
      flushOpt();
      return;
  }

  wx.writeBLECharacteristicValue({
    deviceId: device.id,
    serviceId: device.weightService.id,
    characteristicId: device.weightService.charWeightScaleControlPointId,
    value: buffer,
    success: function (res) {
      // console.log('writeBLECharacteristicValue success')
    },
    fail: function (res) {
      // console.log(res)
    },
    complete: function (res) {
      flushOpt();
    }
  })
}

function notifyBLECharacteristicValueChanged (serviceId, charId) {
  // console.log("---------> notifyBLECharacteristicValueChanged: " + charId);
  wx.notifyBLECharacteristicValueChanged({
    deviceId: device.id,
    serviceId: serviceId,
    characteristicId: charId,
    state: true,
    success: function (res) {
      // success
      // console.log("---------> success");
    },fail: function(res) {
      // console.log("---------> fail", res);
    },complete: function (res) {
      //安卓平台上，在调用notify成功后立即调用write接口，在部分机型上会发生 10008 系统错误
      //So we wait for 500ms
      setTimeout(flushOpt, 500);
    }
  });
}

function startBluetoothDevicesDiscovery () {
  // console.log("startBluetoothDevicesDiscovery");
  if (!adapterOpened) return;
  //开始搜索
  wx.startBluetoothDevicesDiscovery({
    services: [UUIDS.SERVICE_WEIGHT],
    // services: [],
    allowDuplicatesKey: false,
    success: function (res) {
      // success
      // console.log("-----startBluetoothDevicesDiscovery--success----------");
    }
  });
}

function stopBluetoothDevicesDiscovery () {
  // console.log("---------> stopBluetoothDevicesDiscovery");
  if (!adapterOpened) return;
  wx.stopBluetoothDevicesDiscovery({
    success: function (res) {
      // console.log("---------> success");
      // console.log(res);
    }
  })
}

function enableWeightNotify(enable) {
  // console.log("---------> enableWeightNotify");
  if (status == STATUS.READY) {
    wx.notifyBLECharacteristicValueChanged({
      deviceId: device.id,
      serviceId: device.weightService.id,
      characteristicId: device.weightService.charWeightMeasurementId,
      state: enable,
      success: function (res) {
        // console.log("---------> success");
        // success
      },fail:function (res) {
        // console.log("---------> fail");
        // console.log(res);
      },complete: function (res) {
        //安卓平台上，在调用notify成功后立即调用write接口，在部分机型上会发生 10008 系统错误
        //So we wait for 500ms
        setTimeout(flushOpt, 500);
      }
    });
  }
}

function writeDeviceSetting() {
  if (app != null) {
    queueOpt({ opt: 'write', controlId: SCALE_CONTROL.ZERO_TRACE, value: app.globalData.deviceSetting.zeroTrace });
    queueOpt({ opt: 'write', controlId: SCALE_CONTROL.ALARM_ENABLE, value: app.globalData.deviceSetting.alarmEnable });
    queueOpt({ opt: 'write', controlId: SCALE_CONTROL.WEIGHT_UNIT, value: app.globalData.deviceSetting.weightUnit });
    queueOpt({ opt: 'write', controlId: SCALE_CONTROL.ALARM_WEIGHT, value: parseFloat(app.globalData.coffeeSetting.waterWeight) * 10 });
    queueOpt({ opt: 'write', controlId: SCALE_CONTROL.ALARM_TIME, value: app.globalData.coffeeSetting.time });
  }
}

function init(appInstance) {
  console.log('bt service init')
  app = appInstance;
  var deviceId = wx.getStorageSync('BtService_deviceId');
  if (deviceId) {
    device.id = deviceId;
    app.setStarted();
  }
  wx.onBluetoothAdapterStateChange(onBluetoothAdapterStateChange);
  wx.onBLEConnectionStateChange(onBLEConnectionStateChange);
  wx.onBluetoothDeviceFound(onBluetoothDeviceFound);
  wx.onBLECharacteristicValueChange(onBLECharacteristicValueChange);
  openBluetoothAdapter();
}

function isConfigured() {
  return device.id != null;
}

function isAvailable() {
  return status != STATUS.NOTAVAILABLE;
}

function isConnected() {
  return status >= STATUS.CONNECTED;
}

function isReady() {
  return status == STATUS.READY;
}

function isWifiConnected() {
  return device.wifi.status == WIFI_STATUS.CONNECTED;
}

function getStatus() {
  return status;
}

function getDeviceInfo() {
  return {
    name: device.name,
    manufacturerName: device.manufacturerName,
    modelNum: device.modelNum,
    serialNum: device.serialNum,
    fwVersion: device.fwVersion,
    wifi: device.wifi,
    twoChannel: device.twoChannel
  };
}

function forgetDevice() {
  wx.removeStorage({
    key: 'BtService_deviceId',
    success: function (res) {
      device.id = null;
    },
  })
}

function getDevices(callback) {
  wx.getBluetoothDevices({
    success: function (res) {
      if (typeof callback == 'function') {
        callback(res.devices);
      }
    }
  })
}

module.exports = {
  STATUS: STATUS,
  MAX_WRITE_BYTES: 18,
  SCALE_CONTROL: SCALE_CONTROL,
  WIFI_STATUS: WIFI_STATUS,
  init: init,
  isConfigured: isConfigured,
  isAvailable: isAvailable,
  isConnected: isConnected,
  isReady: isReady,
  isWifiConnected: isWifiConnected,
  getStatus: getStatus,
  getDeviceInfo: getDeviceInfo,
  getDevices: getDevices,
  writeScaleControl: writeScaleControl,
  createBLEConnection: createBLEConnection,
  closeBLEConnection: closeBLEConnection,
  forgetDevice: forgetDevice,
  startBluetoothDevicesDiscovery: startBluetoothDevicesDiscovery,
  stopBluetoothDevicesDiscovery: stopBluetoothDevicesDiscovery,
  enableWeightNotify: enableWeightNotify,
  writeDeviceSetting: writeDeviceSetting,
  openBluetoothAdapter: openBluetoothAdapter,
  closeBluetoothAdapter: closeBluetoothAdapter,
  queueOpt: queueOpt,
}
*/
