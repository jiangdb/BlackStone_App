const initialState = {
  btState: 'unknown',
  connectionState: 'disconnected',
  device: null,
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
        deviceReady: false,
      }

    case "BLE_DEVICE_READY":
      return {
        ...state,
        deviceReady: true
      }

    default:
      return state;
  }
}

module.exports = bleStatus;
