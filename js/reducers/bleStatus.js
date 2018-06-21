/**
 *  btState: Unknown, Resetting, Unsupported, Unauthorized, PoweredOff, PoweredOn
 *  connectionState: disconnected, connected, connecting, disconnecting
 */

const initialState = {
  btState: 'Unknown',
  connectionState: 'disconnected',
  device: null,
  deviceReady: false,
  autoConnection: true
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
        deviceReady: false,
      }

    case "BLE_DEVICE_READY":
      return {
        ...state,
        deviceReady: true
      }

    case "BLE_ENABLE_AUTO_CONNECTION":
      return {
        ...state,
        autoConnection: true
      }

    case "BLE_DISABLE_AUTO_CONNECTION":
      return {
        ...state,
        autoConnection: false
      }

    default:
      return state;
  }
}

module.exports = bleStatus;
