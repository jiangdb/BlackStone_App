const initialState = {
  btState: 'unknown',
  connectionState: 'disconnected',
  device: null,
  deviceInfo: {},
  deviceReady: false,
  scan: false,
  deviceScanned: [],
  weight: {
    extract: 0,
    total: 0
  }
}
 
import type { Action } from "../actions/types";

function ble(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "BLE_FIND_DEVICE":
      return {
        ...state,
        deviceScanned: [ action.device, ...state.deviceScanned],
      }

    case "BLE_ON_BT_STATE_CHANGE":
      return {
        ...state,
        btState: action.state
      }

    case "BLE_ON_CONNECTION_STATE_CHANGE":
      if (action.state == 'connected') {
        let deviceScanned = state.deviceScanned.filter( device => device.id !== action.device.id )
        return {
          ...state,
          connectionState: action.state,
          device: action.device,
          deviceReady: false,
          deviceScanned: deviceScanned
        }
      }
      return {
        ...state,
        connectionState: action.state,
        device: action.device,
        deviceReady: false
      }

    case "BLE_ON_DEVICE_INFO_CHANGE":
      return {
        ...state,
        deviceInfo: {
            ...state.deviceInfo,
            ...action.info
          }
      }

    case "BLE_ON_WEIGHT_CHANGE":
      return {
        ...state,
        weight: action.weight
      }

    case "BLE_DEVICE_READY":
      return {
        ...state,
        deviceReady: true
      }

    case "BLE_START_SCAN":
      return {
        ...state,
        scan: true,
        deviceScanned: []
      }

    case "BLE_STOP_SCAN":
      return {
        ...state,
        scan: false
      }

    default:
      return state;
  }
}

module.exports = ble;
