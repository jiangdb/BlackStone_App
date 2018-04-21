const initialState = {
  btState: 'unknown',
  connectionState: 'disconnected',
  device: null,
  deviceInfo: {},
  deviceReady: false,
}
 
import type { Action } from "../actions/types";

function bleStatus(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "BLE_ON_BT_STATE_CHANGE":
      return {
        ...state,
        btState: action.state
      }

    case "BLE_ON_CONNECTION_STATE_CHANGE":
      return {
        ...state,
        connectionState: action.state,
        device: action.device,
        deviceInfo: {},
        deviceReady: false,
      }

    case "BLE_ON_DEVICE_INFO_CHANGE":
      return {
        ...state,
        deviceInfo: {
          ...state.deviceInfo,
          ...action.info
        }
      }

    case "BLE_DEVICE_READY":
      return {
        ...state,
        deviceInfo: {
          ...state.deviceInfo,
          ...action.info
        },
        deviceReady: true
      }

    default:
      return state;
  }
}

module.exports = bleStatus;
