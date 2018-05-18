const bleDeviceReady = info => ({ type: "BLE_DEVICE_READY" })
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
const bleStartScan = () => ({ type: "BLE_START_SCAN"})
const bleStopScan = () => ({ type: "BLE_STOP_SCAN"})
const bleOnSaveDeviceSetting = settings => ({
  type: "BLE_ON_SAVE_DEVICE_SETTING",
  settings
})

module.exports = {
  bleDeviceReady,
  bleFindDevice,
  bleOnBtStateChange,
  bleOnConnectionStateChange,
  bleOnDeviceInfoChange,
  bleOnWeightChange,
  bleStartScan,
  bleStopScan,
  bleOnSaveDeviceSetting,
};
