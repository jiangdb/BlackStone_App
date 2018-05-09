const initialState = {
  displayName: 'name',
  manufacturerName: null,
  modelNum: 'TES04PL',
  serialNum: '0A3245ER12DQ',
  fwVersion: '0.80.01',
  batteryLevel: null,
  wifiStatus: '',
  wifiSSID: ''
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
