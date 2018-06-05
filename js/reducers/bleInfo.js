const initialState = {
  displayName: null,
  manufacturerName: null,
  modelNum: null,
  serialNum: null,
  fwVersion: null,
  description: null,
  batteryLevel: null,
  wifiStatus: null,
  wifiSSID: null,
  downloadUrl: null,
  newVersion: null
}
 
import type { Action } from "../actions/types";

function bleInfo(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "BLE_ON_DEVICE_INFO_CHANGE":
      return {
        ...state,
        ...action.info
      }

    default:
      return state;
  }
}

module.exports = bleInfo;
