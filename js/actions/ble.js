const bleDeviceReady = () => ({ type: "BLE_DEVICE_READY"})
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

const bleStartScan = () => ({ type: "BLE_START_SCAN"})
const bleStopScan = () => ({ type: "BLE_STOP_SCAN"})

module.exports = {
  bleDeviceReady,
  bleFindDevice,
  bleOnBtStateChange,
  bleOnConnectionStateChange,
  bleOnDeviceInfoChange,
  bleStartScan,
  bleStopScan,
};
