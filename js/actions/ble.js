const bleDeviceReady = () => ({ type: "BLE_DEVICE_READY" })
const bleDeviceForget = () => ({ type: "BLE_DEVICE_FORGET" })
const bleDeviceSave = device => ({
  type: "BLE_DEVICE_SAVE",
  device
})
const bleFindDevice = device => ({
  type: "BLE_FIND_DEVICE",
  device
})
const bleOnBtStateChange = state => ({
  type: "BLE_ON_BT_STATE_CHANGE",
  state
})
const bleOnConnectionStateChange = (state, device) => ({
  type: "BLE_ON_CONNECTION_STATE_CHANGE",
  state,
  device
})
const bleOnDeviceInfoChange = info => ({
  type: "BLE_ON_DEVICE_INFO_CHANGE",
  info
})
const bleOnWeightChange = weight => ({
  type: "BLE_ON_WEIGHT_CHANGE",
  weight
})
const bleOnSaveDeviceSetting = settings => ({
  type: "BLE_ON_SAVE_DEVICE_SETTING",
  settings
})
const bleStartScan = () => ({ type: "BLE_START_SCAN" })
const bleStopScan = () => ({ type: "BLE_STOP_SCAN" })

module.exports = {
  bleDeviceReady,
  bleDeviceForget, 
  bleDeviceSave, 
  bleFindDevice,
  bleOnBtStateChange,
  bleOnConnectionStateChange,
  bleOnDeviceInfoChange,
  bleOnWeightChange,
  bleStartScan,
  bleStopScan,
  bleOnSaveDeviceSetting,
};
