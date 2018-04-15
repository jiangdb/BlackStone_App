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

function deviceConnect(device) {
  console.log('start connect: ' + device.id)
  dispatch(bleActions.bleOnConnectionStateChange('connecting', device))
  device.connect()
    .then((device) => {
      console.log('connected')
      connectedDevice.id = device.id
      dispatch(bleActions.bleOnConnectionStateChange('connected', device))
      dispatch(bleActions.bleOnDeviceInfoChange({ name: device.localName?device.localName:device.name }))
      let onDisconnected = device.onDisconnected((error,device) => {
        console.log(device.id + ' disconnected')
        dispatch(bleActions.bleOnConnectionStateChange('disconnected', null))
        onDisconnected.remove()
      })
      console.log('discover services and characteristics')
      device.discoverAllServicesAndCharacteristics()
        .then((device) => {
          // Do work on device with services and characteristics
          console.log('get services')
          device.services()
            .then((services) => {
              console.log('services')
              services.map((service, i)=>{
                console.log(service.uuid)
                if (service.uuid.toUpperCase().indexOf(UUIDS.SERVICE_WEIGHT) != -1) {
                  connectedDevice.weightService.id = service.uuid
                  service.characteristics().then((characteristics) => {
                    console.log('weight service characteristics:')
                    characteristics.map((characteristic, i)=>{
                      console.log(characteristic.uuid)
                      if (characteristic.uuid.toUpperCase().indexOf(UUIDS.CHAR_WEIGHT_CONTROL_POINT_V2) != -1) {
                        connectedDevice.deviceInfoService.charManuNameId = characteristic.uuid
                        characteristic.read().then((characteristic) => {
                          console.log('weight control: ')
                          let val = new Buffer(characteristic.value, 'base64')
                          var dv = new DataView(val.buffer, 2);
                          console.log("zero track: " + dv.getUint8(0));
                          console.log("alarm enable: " + dv.getUint8(1));
                          console.log("weight unit: " + dv.getUint8(2));
                          console.log("alarm time: " + dv.getUint16(3, false));
                          console.log("alarm weight: " + dv.getUint16(5, false));
                          console.log("battery level: " + dv.getUint8(7));
                          console.log("wifi status: " + dv.getUint8(8));
                          let nameBuf = [];
                          if (dv.getUint8(9) > 0) {
                            for (var i = 0; i < dv.getUint8(9); i++) {
                              nameBuf[i] = dv.getUint8(10 + i);
                            }
                            console.log("wifi ssid: " + util.fromUTF8Array(nameBuf));
                          }
                          dispatch(bleActions.bleOnDeviceInfoChange({
                            batteryLevel: dv.getUint8(7),
                            wifiStatus: WIFI_STATUS[dv.getUint8(8)],
                            wifiSSID: util.fromUTF8Array(nameBuf),
                          }))
                        })
                      }
                    })
                  })
                }else if (service.uuid.toUpperCase().indexOf(UUIDS.SERVICE_DEVICE_INFORMATION) != -1) {
                  connectedDevice.deviceInfoService.id = service.uuid
                  service.characteristics().then((characteristics) => {
                    console.log('device info service characteristics:')
                    characteristics.map((characteristic, i)=>{
                      console.log(characteristic.uuid)
                      if (characteristic.uuid.toUpperCase().indexOf(UUIDS.CHAR_MANUFACTURER_NAME_UUID) != -1) {
                        connectedDevice.deviceInfoService.charManuNameId = characteristic.uuid
                        characteristic.read().then((characteristic) => {
                          let val = new Buffer(characteristic.value, 'base64')
                          console.log('manufacturer: ' + val)
                          dispatch(bleActions.bleOnDeviceInfoChange({
                            manufacturerName: val.toString(),
                          }))
                        })
                      } else if (characteristic.uuid.toUpperCase().indexOf(UUIDS.CHAR_MODEL_NUMBER_UUID) != -1) {
                        connectedDevice.deviceInfoService.charModelNumberId = characteristic.uuid
                        characteristic.read().then((characteristic) => {
                          let val = new Buffer(characteristic.value, 'base64')
                          console.log('model num: ' + val)
                          dispatch(bleActions.bleOnDeviceInfoChange({
                            modelNum: val.toString(),
                          }))
                        })
                      } else if (characteristic.uuid.toUpperCase().indexOf(UUIDS.CHAR_SERIAL_NUMBER_UUID) != -1) {
                        connectedDevice.deviceInfoService.charSerialNumberId = characteristic.uuid
                        characteristic.read().then((characteristic) => {
                          let val = new Buffer(characteristic.value, 'base64')
                          console.log('serial num: ' + val)
                          dispatch(bleActions.bleOnDeviceInfoChange({
                            serialNum: val.toString(),
                          }))
                        })
                      } else if (characteristic.uuid.toUpperCase().indexOf(UUIDS.CHAR_FIRMWARE_VERSION_UUID) != -1) {
                        connectedDevice.deviceInfoService.charFWVersionId = characteristic.uuid
                        characteristic.read().then((characteristic) => {
                          let val = new Buffer(characteristic.value, 'base64')
                          console.log('firmware version: ' + val)
                          dispatch(bleActions.bleOnDeviceInfoChange({
                            fwVersion: val.toString(),
                          }))
                        })
                      }
                    })
                  })
                }
              })
            })
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

module.exports = {
  init: init,
  deInit: deInit,
  deviceConnect: deviceConnect,
  deviceDisconnect: deviceDisconnect,
  deviceScanStart: deviceScanStart,
  deviceScanStop: deviceScanStop,
}
