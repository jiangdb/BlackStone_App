const initialState = {
  deviceId: null,
}
 
import type { Action } from "../actions/types";

function bleDevice(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "BLE_DEVICE_FORGET":
      return {
        device: null
      }

    case "BLE_DEVICE_SAVE":
      return {
        deviceId: action.deviceId
      }

    default:
      return state;
  }
}

module.exports = bleDevice;
